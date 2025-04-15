import React from 'react';
import { Scroll, FileText, Shield, AlertTriangle, RefreshCw, HelpCircle, Users } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-xl max-w-3xl mx-auto">Please read these terms carefully before using our services</p>
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
                <Scroll className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Introduction</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Travel AI Guide. These Terms of Use govern your use of our website, mobile applications, and services. By accessing or using Travel AI Guide, you agree to be bound by these terms and conditions.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                If you do not agree with any part of these terms, please refrain from using our services. We recommend reviewing these terms periodically as they may change.
              </p>
            </div>
          </section>

          {/* Acceptance of Terms Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <FileText className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Acceptance of Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Travel AI Guide, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any provision of these terms, you must not access or use our services.
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">These terms apply to:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>All visitors and users of our website</li>
                  <li>Registered account holders</li>
                  <li>API users and third-party integrations</li>
                  <li>Mobile application users</li>
                  <li>Anyone accessing our content in any form</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Users className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">User Responsibilities</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for ensuring that your use of Travel AI Guide complies with applicable laws and these Terms of Use. You agree to use our services only for lawful purposes and in a manner that does not infringe upon the rights of others.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Account Responsibilities:</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>Providing accurate and complete information</li>
                    <li>Promptly updating your information if it changes</li>
                    <li>Being responsible for all activities under your account</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Prohibited Activities:</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Using our services for illegal purposes</li>
                    <li>Attempting to gain unauthorized access</li>
                    <li>Interfering with or disrupting our services</li>
                    <li>Uploading malicious code or content</li>
                    <li>Impersonating another person or entity</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Intellectual Property</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                All content on Travel AI Guide, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Travel AI Guide or its content suppliers and is protected by international copyright and intellectual property laws.
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Our intellectual property includes:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Website and mobile application designs</li>
                  <li>Travel AI Guide logos and branding</li>
                  <li>AI algorithms and recommendation systems</li>
                  <li>Original content and itineraries</li>
                  <li>Custom maps and travel guides</li>
                  <li>Software code and user interfaces</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any materials from this website without our express written consent.
              </p>
            </div>
          </section>

          {/* Limitation of Liability Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Limitation of Liability</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Travel AI Guide and its affiliates will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our services, even if we have been advised of the possibility of such damages.
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium">Travel recommendations disclaimer:</span> While we strive to provide accurate and up-to-date travel information, we cannot guarantee the accuracy, completeness, or reliability of any recommendations or content. Travel plans and itineraries generated by our AI system should be verified with official sources before making bookings or travel arrangements.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you. In such cases, our liability will be limited to the fullest extent permitted by applicable law.
              </p>
            </div>
          </section>

          {/* Modifications Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <RefreshCw className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Modifications to Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms of Use at any time. All changes will be effective immediately upon posting to our website. Your continued use of Travel AI Guide after any changes to the Terms constitutes your acceptance of the new terms.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                For significant changes, we will make reasonable efforts to provide notification, such as posting a prominent notice on our website or sending an email to registered users. It is your responsibility to review these Terms periodically to stay informed of any updates.
              </p>
            </div>
          </section>

          {/* Termination Section */}
          <section className="border-b border-gray-200">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <HelpCircle className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Termination</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms of Use.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Upon termination, your right to use our services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>
          </section>

          {/* Governing Law Section */}
          <section>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <FileText className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-blue-800">Governing Law</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with the laws of the state of California, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within San Francisco County, California.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Any claim or cause of action arising out of or related to these Terms of Use or our services must be filed within one year after such claim or cause of action arose, or be forever barred.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-blue-50">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Questions About Our Terms?</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about our Terms of Use, please contact us at:
              </p>
              <p className="text-blue-600 font-medium">legal@travelaiguide.com</p>
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

export default TermsOfUse;