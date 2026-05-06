import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description: 'Track your Cozmo Station order status in real-time. Enter your order ID and email address to get instant updates.',
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-24 pb-16 bg-[#faf9f7] border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-4">Order Status</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-lg text-gray-500 font-light">
            Enter your order details below to get real-time status updates.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-12">
            <form className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                  Order ID
                </label>
                <input
                  id="orderId"
                  type="text"
                  placeholder="e.g. CS-00123"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="trackEmail" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                  Email Address
                </label>
                <input
                  id="trackEmail"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors bg-gray-50"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors rounded-lg"
              >
                Track Order
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Can't find your order?{' '}
                <a href="/contact" className="text-gray-900 font-semibold hover:underline">
                  Contact us
                </a>
              </p>
            </div>
          </div>

          {/* Info card */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { label: 'Processing', time: '1–2 business days' },
              { label: 'Shipping', time: '2–5 business days' },
              { label: 'Delivery', time: 'Cairo & Giza: Next day' },
            ].map((step) => (
              <div key={step.label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{step.label}</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{step.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
