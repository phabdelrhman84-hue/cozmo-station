const badges = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    ),
    label: 'Free Delivery',
    sublabel: 'Orders over 500 EGP',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: 'Dermatologist Tested',
    sublabel: 'Clinically Verified',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    label: '100% Authentic',
    sublabel: 'Direct from brand',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: 'Easy Returns',
    sublabel: '30-day policy',
  },
];

export default function TrustBar() {
  return (
    <div className="w-full border-y border-gray-100 bg-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                {badge.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{badge.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{badge.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
