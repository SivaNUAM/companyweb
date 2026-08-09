import { Link } from "react-router-dom";
import LegalDoc from "../components/legal/LegalDoc";

const Terms = () => {
  return (
    <LegalDoc
      label="Legal"
      title="Terms & Conditions"
      updated="9 August 2026"
    >
      <p>
        These Terms &amp; Conditions (“Terms”) govern your use of the website
        and related online services operated by Nuam Technologies Pvt Ltd
        (“Nuam”, “we”, “us”, or “our”). By accessing this site, you agree to
        these Terms.
      </p>

      <h2>1. About Nuam</h2>
      <p>
        Nuam Technologies Pvt Ltd provides strategy, design, and engineering
        services for digital products, platforms, and brands. Company details:
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

      <h2>2. Using this website</h2>
      <p>
        You may browse our website for lawful purposes. You agree not to:
      </p>
      <ul>
        <li>Misuse the site, attempt unauthorised access, or disrupt services</li>
        <li>Scrape, copy, or redistribute content without our written consent</li>
        <li>Submit false, harmful, or unlawful information via forms or chat</li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>
        All content on this website — including text, graphics, logos, images,
        video, and layout — is owned by Nuam or used with permission. You may
        not use our brand or materials for commercial purposes without prior
        written approval.
      </p>
      <p>
        Project work delivered to clients is governed by separate contracts and
        statements of work, not these website Terms alone.
      </p>

      <h2>4. Enquiries and proposals</h2>
      <p>
        Submitting a contact form, chat message, or email does not create a
        client relationship. Project scope, fees, timelines, and deliverables
        are confirmed only in a written agreement signed by both parties.
      </p>

      <h2>5. Services and engagement</h2>
      <p>
        When you engage Nuam for services, the governing documents will
        typically include a proposal, statement of work, and/or master services
        agreement. Those documents prevail over these website Terms if there is
        a conflict.
      </p>

      <h2>6. No warranty on website content</h2>
      <p>
        Website content is provided for general information. We aim for
        accuracy but do not warrant that content is complete, current, or
        error-free. Use of the site is at your own risk.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Nuam is not liable for any
        indirect, incidental, special, consequential, or punitive damages
        arising from your use of this website or inability to use it. Our total
        liability related to website use is limited to the maximum extent
        allowed under applicable Indian law.
      </p>

      <h2>8. Third-party links</h2>
      <p>
        Links to external sites are provided for convenience. We do not control
        and are not responsible for third-party content, products, or
        practices.
      </p>

      <h2>9. Privacy</h2>
      <p>
        How we handle personal information is described in our{" "}
        <Link to="/privacy">Privacy Policy</Link>. Please review it alongside
        these Terms.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these Terms occasionally. The “Last updated” date will
        change when we do. Continued use of the site after changes means you
        accept the updated Terms.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Courts in Kochi, Kerala
        shall have exclusive jurisdiction, subject to applicable law.
      </p>

      <h2>12. Contact</h2>
      <p>
        For questions about these Terms, contact{" "}
        <a href="mailto:nuamtechnologies@gmail.com">
          nuamtechnologies@gmail.com
        </a>{" "}
        or call{" "}
        <a href="tel:+918089623759">+91 80896 23759</a>.
      </p>
    </LegalDoc>
  );
};

export default Terms;
