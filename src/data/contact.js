export const contactHero = {
  label: "Contact",
  headline: "Let's build what comes next.",
  support:
    "Tell Nuam Technologies Pvt Ltd about your product, platform, or transformation. We typically reply within one business day.",
  image:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2400&q=90",
  imageAlt: "Dark modern workspace with screens and deep ambient light",
};

export const COMPANY_EMAIL = "nuamtechnologies@gmail.com";
export const COMPANY_PHONE = "8089623759";
export const COMPANY_PHONE_TEL = "+918089623759";
export const COMPANY_ADDRESS =
  "3rd floor, Al Bushara building, Pipeline Rd, Thrikkakara, Edappally, Kochi, Kerala 682021";

export const contactChannels = [
  {
    id: "projects",
    label: "Email",
    value: COMPANY_EMAIL,
    href: `mailto:${COMPANY_EMAIL}`,
    note: "New briefs, RFPs, and partnerships",
  },
  {
    id: "phone",
    label: "Phone",
    value: COMPANY_PHONE,
    href: `tel:${COMPANY_PHONE_TEL}`,
    note: "Mon–Sat · business hours",
  },
];

export const contactDetails = [
  {
    id: "company",
    label: "Company",
    value: "Nuam Technologies Pvt Ltd",
  },
  {
    id: "address",
    label: "Address",
    value: COMPANY_ADDRESS,
  },
  {
    id: "phone",
    label: "Phone",
    value: COMPANY_PHONE,
  },
  {
    id: "reply",
    label: "Response",
    value: "Within one business day",
  },
];

export const contactForm = {
  title: "Send a brief",
  support: "Share a few lines — we’ll follow up by email.",
  fields: {
    name: "Your name",
    email: "Work email",
    company: "Company",
    message: "What are you building?",
  },
  submit: "Send message",
  to: COMPANY_EMAIL,
};
