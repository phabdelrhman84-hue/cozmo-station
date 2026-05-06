import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Cozmo Station. We are here to help with product recommendations, orders, and skincare advice.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Cozmo Station',
            description: 'Get in touch with Cozmo Station for product recommendations and order support.',
            url: 'https://cozmostation.com/contact',
          }),
        }}
      />

      {/* Header */}
      <section className="pt-24 pb-16 bg-[#faf9f7] border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-4">We're Here to Help</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500 font-light">
            From product recommendations to order support — our team is ready.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-serif text-gray-900 mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                    <input id="firstName" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-gray-50" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                    <input id="lastName" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                  <input id="contactEmail" type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-gray-50" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                  <select id="subject" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-gray-50">
                    <option>Order Enquiry</option>
                    <option>Product Recommendation</option>
                    <option>Returns & Exchanges</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-gray-50 resize-none" />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors rounded-lg">
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-serif text-gray-900 mb-6">Other Ways to Reach Us</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                      <a href="https://wa.me/20XXXXXXXXXX" className="text-sm text-gray-900 hover:underline font-medium">+20 XXX XXX XXXX</a>
                      <p className="text-xs text-gray-400 mt-1">Sun – Thu, 9am – 6pm EGY</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Email</p>
                      <a href="mailto:hello@cozmostation.com" className="text-sm text-gray-900 hover:underline font-medium">hello@cozmostation.com</a>
                      <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Location</p>
                      <p className="text-sm text-gray-900 font-medium">Cairo, Egypt</p>
                      <p className="text-xs text-gray-400 mt-1">Nationwide delivery available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                <p className="text-sm font-medium text-gray-900 mb-1">Skincare Consultation</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Not sure which routine is right for your skin type? Our experts offer free personalised consultations via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
