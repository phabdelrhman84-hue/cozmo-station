import Link from 'next/link';

const concerns = [
  {
    slug: 'acne',
    label: 'Acne & Blemishes',
    emoji: '🎯',
    color: 'bg-rose-50 hover:bg-rose-100',
    textColor: 'text-rose-900',
  },
  {
    slug: 'anti-aging',
    label: 'Anti-Aging',
    emoji: '✨',
    color: 'bg-amber-50 hover:bg-amber-100',
    textColor: 'text-amber-900',
  },
  {
    slug: 'hydration',
    label: 'Deep Hydration',
    emoji: '💧',
    color: 'bg-sky-50 hover:bg-sky-100',
    textColor: 'text-sky-900',
  },
  {
    slug: 'brightening',
    label: 'Brightening',
    emoji: '🌟',
    color: 'bg-yellow-50 hover:bg-yellow-100',
    textColor: 'text-yellow-900',
  },
  {
    slug: 'sensitive',
    label: 'Sensitive Skin',
    emoji: '🌿',
    color: 'bg-green-50 hover:bg-green-100',
    textColor: 'text-green-900',
  },
  {
    slug: 'haircare',
    label: 'Hair Growth',
    emoji: '🌱',
    color: 'bg-emerald-50 hover:bg-emerald-100',
    textColor: 'text-emerald-900',
  },
];

export default function ShopByConcern() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">Personalised Routines</p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">Shop by Concern</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {concerns.map((concern) => (
            <Link
              key={concern.slug}
              href={`/category/${concern.slug}`}
              className={`group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 transition-all duration-300 ${concern.color} cursor-pointer`}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {concern.emoji}
              </span>
              <span className={`text-sm font-medium text-center leading-tight ${concern.textColor}`}>
                {concern.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
