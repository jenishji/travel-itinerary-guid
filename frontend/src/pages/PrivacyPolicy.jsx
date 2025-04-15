import React from 'react';
import { Shield, Lock, Eye, AlertCircle, RefreshCw } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">We value your privacy and are committed to protecting your personal information</p>
        </div>
      </header>

      {/* Last Updated Banner */}
      <div className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Last Updated: March 1, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Introduction Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Introduction</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                At Travel AI Guide, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                By using our services, you consent to the data practices described in this policy. We encourage you to read this document carefully to understand how we handle your information.
              </p>
            </div>
          </section>

          {/* Information We Collect Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Eye className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Information We Collect</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We may collect personal data such as your name, email address, and travel preferences when you interact with our services. This information is used to provide you with personalized trip plans and improve your overall experience.
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Types of information we collect:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Personal identifiers (name, email address, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Payment information (processed through secure third-party payment processors)</li>
                  <li>Travel preferences and history</li>
                  <li>Device information and usage data</li>
                  <li>Location data (with your permission)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Lock className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">How We Use Your Information</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Your information is used to generate tailored travel itineraries, send important updates, and enhance our services. We do not share your data with third parties without your consent.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Primary Uses:</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Creating personalized travel recommendations</li>
                    <li>Processing reservations and bookings</li>
                    <li>Sending trip confirmations and updates</li>
                    <li>Providing customer support</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Additional Uses:</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Improving our AI algorithms and services</li>
                    <li>Analyzing usage patterns to enhance user experience</li>
                    <li>Communicating about new features or offers</li>
                    <li>Preventing fraud and ensuring security</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Security</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We implement a variety of security measures to protect your personal data. However, please note that no method of transmission over the internet is 100% secure.
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Our security measures include:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Secure networks protected by firewalls</li>
                  <li>Regular security assessments and updates</li>
                  <li>Strict access controls for employee access to personal data</li>
                  <li>Compliance with industry security standards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Changes to This Policy Section */}
          <section>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <RefreshCw className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Changes to This Policy</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy periodically. Any changes will be posted on this page, and we encourage you to review our policy regularly.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                If we make significant changes to this policy that affect your rights, we will provide additional notice, such as an email notification or a prominent announcement on our website.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-blue-50">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Questions About Our Privacy Policy?</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about our privacy practices, please contact us at:
              </p>
              <p className="text-blue-600 font-medium">privacy@travelaiguide.com</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Travel AI Guide. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Use</a>
            <span>|</span>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;