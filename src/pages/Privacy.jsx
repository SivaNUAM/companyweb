import LegalDoc from "../components/legal/LegalDoc";

const Privacy = () => {
  return (
    <LegalDoc
      label="Legal"
      title="Privacy Policy"
      updated="9 August 2026"
    >
      <p>
        Nuam Technologies Pvt Ltd (“Nuam”, “we”, “us”, or “our”) respects your
        privacy. This Privacy Policy explains how we collect, use, store, and
        share information when you visit our website, contact us, or engage
        with our services.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Nuam Technologies Pvt Ltd is a corporate technology company based in
        Kochi, Kerala, India. We design and build digital products, platforms,
        and brand systems for clients.
      </p>
      <ul>
        <li>
          <strong>Address:</strong> 3rd floor, Al Bushara building, Pipeline
          Rd, Thrikkakara, Edappally, Kochi, Kerala 682021
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:nuamtechnologies@gmail.com">
            nuamtechnologies@gmail.com
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <a href="tel:+918089623759">+91 80896 23759</a>
        </li>
      </ul>

      <h2>2. Information we collect</h2>
      <p>We may collect the following information:</p>
      <ul>
        <li>
          <strong>Contact details</strong> you share — name, email, phone
          number, company, and project information via forms, email, or chat.
        </li>
        <li>
          <strong>Usage data</strong> — pages visited, device/browser type,
          approximate location, and referral source (via analytics or server
          logs, where enabled).
        </li>
        <li>
          <strong>Communications</strong> — messages you send through our
          website chatbot, email, or phone.
        </li>
      </ul>
      <p>
        We do not knowingly collect sensitive personal data unless you
        voluntarily provide it for a project engagement.
      </p>

      <h2>3. How we use your information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Respond to enquiries and provide proposals or support</li>
        <li>Deliver and improve our website and services</li>
        <li>Communicate about projects, updates, or opportunities you request</li>
        <li>Maintain security, prevent abuse, and meet legal obligations</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. Sharing of information</h2>
      <p>
        We may share information with trusted service providers who help us
        operate (for example hosting, email, or analytics), under appropriate
        confidentiality terms. We may also disclose information if required by
        law or to protect our rights, users, or the public.
      </p>

      <h2>5. Cookies and similar technologies</h2>
      <p>
        Our site may use essential cookies for core functionality and, where
        enabled, analytics cookies to understand traffic. You can control
        cookies through your browser settings. Disabling some cookies may
        affect site features.
      </p>

      <h2>6. Data retention</h2>
      <p>
        We keep personal information only as long as needed for the purposes
        described above, including project delivery, support, and legal or
        accounting requirements, then delete or anonymise it where practical.
      </p>

      <h2>7. Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect
        information. No method of transmission or storage is fully secure; we
        cannot guarantee absolute security.
      </p>

      <h2>8. Your choices</h2>
      <p>You may request to:</p>
      <ul>
        <li>Access or correct personal information we hold about you</li>
        <li>Ask us to delete information, where legally allowed</li>
        <li>Opt out of non-essential marketing communications</li>
      </ul>
      <p>
        Contact{" "}
        <a href="mailto:nuamtechnologies@gmail.com">
          nuamtechnologies@gmail.com
        </a>{" "}
        and we will respond within a reasonable time.
      </p>

      <h2>9. Third-party links</h2>
      <p>
        Our website may link to third-party sites (for example social
        profiles). Their privacy practices are their own; we are not
        responsible for those policies.
      </p>

      <h2>10. Children’s privacy</h2>
      <p>
        Our services are directed to businesses and professionals. We do not
        knowingly collect personal information from children under 16.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The “Last updated”
        date at the top will change when we do. Continued use of the site after
        updates means you accept the revised policy.
      </p>
    </LegalDoc>
  );
};

export default Privacy;
