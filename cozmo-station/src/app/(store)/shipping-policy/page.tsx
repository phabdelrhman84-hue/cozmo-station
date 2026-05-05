export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Shipping Policy</h1>
        <div className="prose prose-gray font-light text-gray-600">
          <p>
            We aim to process and ship all orders as quickly as possible so you can start enjoying your premium skincare routine.
          </p>
          <h2 className="text-2xl font-serif text-gray-900 mt-8 mb-4">Processing Time</h2>
          <p>
            All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
          </p>
          <h2 className="text-2xl font-serif text-gray-900 mt-8 mb-4">Shipping Rates & Estimates</h2>
          <p>
            Shipping charges for your order will be calculated and displayed at checkout. We offer standard and expedited shipping options.
          </p>
        </div>
      </div>
    </div>
  );
}
