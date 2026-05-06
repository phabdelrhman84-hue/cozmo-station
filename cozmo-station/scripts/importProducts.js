const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Initialize Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-05-01',
});

const CSV_FILE_PATH = './scripts/products.csv';

async function uploadImage(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Extract filename from URL
    const filename = imageUrl.split('/').pop().split('?')[0] || 'image.jpg';

    const asset = await client.assets.upload('image', buffer, { filename });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imageUrl}:`, error.message);
    return null;
  }
}

async function migrateProducts() {
  const productsMap = new Map();

  console.log('Reading CSV file...');
  
  // Read and group the CSV rows by Handle
  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (row) => {
        const handle = row['Handle'];
        if (!handle) return;

        if (!productsMap.has(handle)) {
          productsMap.set(handle, {
            title: row['Title'],
            handle: handle,
            bodyHtml: row['Body (HTML)'],
            price: parseFloat(row['Variant Price']) || 0,
            vendor: row['Vendor'],
            imageUrls: [],
          });
        }
        
        const imgSrc = row['Image Src'];
        if (imgSrc) {
          productsMap.get(handle).imageUrls.push(imgSrc);
        }
      })
      .on('end', resolve)
      .on('error', reject);
  });

  const products = Array.from(productsMap.values());
  console.log(`Found ${products.length} unique products. Starting migration...`);

  for (const product of products) {
    // Only process products that have a title (skips weird empty handle rows)
    if (!product.title) continue;

    console.log(`\nMigrating: ${product.title}`);

    // 1. Upload Images
    const sanityImages = [];
    for (const url of product.imageUrls) {
      console.log(`  Uploading image: ${url}`);
      const assetId = await uploadImage(url);
      if (assetId) {
        sanityImages.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
        });
      }
    }

    // 2. Parse Description (strip HTML for portable text, and keep raw HTML)
    const rawHtml = product.bodyHtml || '';
    // Basic HTML strip for the portable text block
    const plainText = rawHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    const portableText = [
      {
        _type: 'block',
        children: [{ _type: 'span', text: plainText || product.title }],
      }
    ];

    // 3. Determine Origin based on Vendor or title (German brands: Eucerin, Balea, etc.)
    const vendorLower = (product.vendor || '').toLowerCase();
    const titleLower = product.title.toLowerCase();
    const isGerman = vendorLower.includes('eucerin') || vendorLower.includes('balea') || titleLower.includes('german');
    const origin = isGerman ? 'german' : 'korean';

    // 4. Create Sanity Document
    const sanitizedId = product.handle.toLowerCase().replace(/[^a-z0-9_.-]/g, '-');
    const sanityDoc = {
      _type: 'product',
      // We can use a custom ID or just let Sanity generate one
      _id: `product-${sanitizedId}`,
      title: product.title,
      slug: {
        _type: 'slug',
        current: product.handle,
      },
      price: product.price,
      origin: origin,
      images: sanityImages.length > 0 ? sanityImages : undefined,
      description: portableText,
      // We will also store the raw HTML in a new field just in case you need it
      // bodyHtml: rawHtml, // You can uncomment this if you add `bodyHtml` to your schema
    };

    try {
      // Use createOrReplace to update if it already exists
      const result = await client.createOrReplace(sanityDoc);
      console.log(`  ✅ Successfully migrated: ${result._id}`);
    } catch (err) {
      console.error(`  ❌ Failed to migrate ${product.title}:`, err.message);
    }
  }

  console.log('\nMigration completed!');
}

migrateProducts().catch(console.error);
