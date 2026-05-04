import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-semibold tracking-tighter text-gray-900">
              Cozmo Station.
            </span>
            <p className="mt-4 text-sm text-gray-500 max-w-sm leading-relaxed">
              Elevate your skincare routine with our curated selection of premium Korean and German beauty products. Discover the perfect synergy of innovation and tradition.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-gray-900 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/shipping-policy" className="hover:text-gray-900 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-400">
            &copy; {new Date().getFullYear()} Cozmo Station. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
