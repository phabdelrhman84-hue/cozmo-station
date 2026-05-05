import Link from 'next/link';

const shopLinks = [
  { href: '/category/skincare', label: 'Skincare' },
  { href: '/category/haircare', label: 'Haircare' },
  { href: '/category/exclusive-bundles', label: 'Bundles & Sets' },
];

const companyLinks = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/about', label: 'Our Philosophy' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/faq', label: 'FAQs' },
  { href: '/track-order', label: 'Track Your Order' },
];

const legalLinks = [
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/return-policy', label: 'Return Policy' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

export default function Footer() {
  return (
    <footer className="bg-[#faf9f7] border-t border-gray-100">
      {/* Newsletter */}
      <div className="border-b border-gray-100 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-1">Stay Updated</p>
            <h3 className="text-lg font-serif text-gray-900">Join the Routine</h3>
          </div>
          <form className="flex w-full max-w-md gap-3">
            <input
              type="email"
              id="newsletterEmail"
              placeholder="your@email.com"
              className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2.5 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors rounded-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center rounded-sm font-serif italic text-lg">C</div>
                <span className="text-xl font-serif font-semibold text-gray-900">Cozmo Station.</span>
              </Link>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-light">
                Egypt&apos;s destination for premium Korean and German skincare. Curated for results, backed by science.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="TikTok" className="text-gray-400 hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 tracking-widest uppercase mb-5">Shop</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {shopLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-gray-900 transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 tracking-widest uppercase mb-5">Company</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {companyLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-gray-900 transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 tracking-widest uppercase mb-5">Legal</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {legalLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-gray-900 transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cozmo Station. All rights reserved.</p>
          <p>Premium Korean & German Skincare — Egypt</p>
        </div>
      </div>
    </footer>
  );
}
