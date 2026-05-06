export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray font-light text-gray-600">
          <p>
            At Cozmo Station, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>
          <h2 className="text-2xl font-serif text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, shipping address, and payment details when you make a purchase or sign up for our newsletter.
          </p>
          <h2 className="text-2xl font-serif text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p>
            Your information is used to process orders, provide customer support, and send promotional updates (if you've opted in). We do not share your personal information with third parties except as necessary to fulfill your order or comply with legal requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
