const brands = [
  'COSRX', 'Dr. Jart+', 'ISDIN', 'La Roche-Posay',
  'Some By Mi', 'Eucerin', 'Innisfree', 'Bioderma',
  'COSRX', 'Dr. Jart+', 'ISDIN', 'La Roche-Posay',
  'Some By Mi', 'Eucerin', 'Innisfree', 'Bioderma',
];

export default function BrandLogoBar() {
  return (
    <section className="py-14 bg-[#faf9f7] border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">Brands We Carry</p>
      </div>

      {/* Marquee container */}
      <div
        className="relative flex overflow-x-hidden group"
        aria-label="Partner brands"
      >
        <div className="flex gap-12 animate-marquee whitespace-nowrap group-hover:pause-animation">
          {brands.map((brand, i) => (
            <span
              key={`a-${i}`}
              className="text-xl font-serif italic text-gray-300 select-none tracking-tight"
            >
              {brand}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-12 animate-marquee whitespace-nowrap group-hover:pause-animation absolute top-0 left-0" aria-hidden="true">
          {brands.map((brand, i) => (
            <span
              key={`b-${i}`}
              className="text-xl font-serif italic text-gray-300 select-none tracking-tight"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
