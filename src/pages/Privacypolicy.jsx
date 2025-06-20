// src/pages/PrivacyPolicy.jsx or src/components/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> May 4, 2025</p>
      <p><strong>Spenta</strong> ("we", "our", or "us") operates the website <a href="https://dealsfromamerica.com">https://dealsfromamerica.com</a> and is committed to protecting your privacy...</p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, phone number, or email (if submitted via forms).</li>
        <li><strong>WhatsApp Number:</strong> Used to generate WhatsApp messages.</li>
        <li><strong>Usage Data:</strong> Info about pages visited, time spent, etc.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Send product details via WhatsApp</li>
        <li>Improve website and UX</li>
        <li>Respond to user inquiries</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>We do <strong>not</strong> sell or share your data, except:</p>
      <ul>
        <li>When required by law</li>
        <li>To enable WhatsApp redirection</li>
      </ul>

      <h2>4. WhatsApp Integration</h2>
      <p>We use WhatsApp's public API to pre-fill messages but do not store or transmit personal data through our servers.</p>

      <h2>5. Security</h2>
      <p>We use industry-standard security methods, but no method is 100% secure.</p>

      <h2>6. Changes to This Policy</h2>
      <p>This policy may be updated from time to time with an updated effective date.</p>

      <h2>7. Contact Us</h2>
      <p>
        📧 Email: <a href="mailto:sales@dealsfromamerica.com">sales@dealsfromamerica.com</a><br />
        🌐 Website: <a href="https://dealsfromamerica.com">https://dealsfromamerica.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
