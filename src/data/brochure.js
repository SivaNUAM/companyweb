export const brochureMeta = {
  brand: "NUAM",
  subBrand: "TECHNOLOGIES",
  tagline: "THE INNOVATORS",
  support:
    "A tech-powered creative firm delivering digital solutions that shape the future.",
  email: "info@nuamtechnologies.com",
  phone: "+91 8089623759",
  phoneHref: "tel:+918089623759",
  web: "www.nuamtechnologies.com",
  webHref: "https://www.nuamtechnologies.com",
  pdfHref: "/Nuam-Brochure.pdf",
  pdfName: "Nuam-Brochure.pdf",
  company: "Nuam Technologies Pvt Ltd",
  legalStatus: "Active",
  headquarters: "India",
};

/**
 * Editorial chapters for the interactive brochure deck.
 * type: cover | editorial | contact | close
 */
export const brochureChapters = [
  {
    id: "cover",
    type: "cover",
    index: "00",
    label: "Cover",
    tone: "azure",
  },
  {
    id: "welcome",
    type: "editorial",
    index: "01",
    label: "Welcome",
    tone: "coral",
    kicker: "01 — Welcome",
    title: "Welcome to Our Company",
    lead: "Shaping Tomorrow: From Skyscrapers to Software, Storytelling to Digital Worlds.",
    body: [
      "NUAM is a multi-disciplinary powerhouse that shapes futures across industries — from building skyscrapers to crafting code, from telling cinematic stories to developing digital worlds.",
    ],
    aside: {
      kicker: "Who we are",
      title: "Who We Are",
      body: [
        "Nuam is a leading IT solutions provider specializing in tailored software products and digital services across diverse industries.",
        "Our work includes Clinic Management Systems for dental, psychological, and cosmetic clinics, plus software and mobile apps for study abroad consultancies, restaurants, and cafés.",
        "We focus on innovation, reliability, and performance — empowering businesses through technology-driven solutions.",
      ],
    },
  },
  {
    id: "capabilities",
    type: "editorial",
    index: "02",
    label: "Capabilities",
    tone: "teal",
    kicker: "02 — Capabilities",
    title: "What We Do",
    body: [
      "Nuam specializes in developing custom software, web applications, mobile applications, and AI-powered solutions for businesses across diverse industries.",
    ],
    bullets: [
      "Clinic Management Systems (CLMS) — appointments, patients, and billing for dental, psychological, and cosmetic clinics.",
      "Recruitment Management System (RAIMS) — AI-powered overseas recruitment, from registration to deployment.",
    ],
    note: "At Nuam, our goal is to make technology simple, helpful, and effective for every business we work with.",
    aside: {
      kicker: "Markets",
      title: "Clients and Markets",
      body: ["Nuam serves a wide international base of clients spanning:"],
      bullets: [
        "Healthcare & Clinics",
        "Overseas Recruitment",
        "Education & Consultancy",
        "Hospitality & Retail",
        "Architecture & Infrastructure",
      ],
      sections: [
        {
          title: "Digital Branding and Creative Media",
          body: "Digital storytelling, brand identity, and UI/UX that make businesses stand out.",
        },
        {
          title: "Software Development",
          body: "Custom software, mobile apps, and digital solutions across industries.",
        },
      ],
    },
  },
  {
    id: "approach",
    type: "editorial",
    index: "03",
    label: "Method",
    tone: "violet",
    kicker: "03 — Method",
    title: "Industry Approach",
    body: [
      "Nuam’s project model combines cutting-edge innovation with client-centered customization.",
    ],
    bullets: [
      "Needs analysis and rapid prototyping",
      "Agile software development",
      "Data-driven quality assurance",
      "Continuous performance improvement",
    ],
    aside: {
      kicker: "Promise",
      title: "Simple. Helpful. Effective.",
      body: [
        "At Nuam, our goal is to make technology simple, helpful, and effective for every business we work with.",
        "We merge creativity with strategy to power real-world impact — across technology, digital branding, and architecture.",
      ],
    },
  },
  {
    id: "direction",
    type: "editorial",
    index: "04",
    label: "Direction",
    tone: "amber",
    kicker: "04 — Direction",
    title: "Vision",
    body: [
      "To drive global growth through innovative, high-quality digital solutions that empower clients, teams, and communities while shaping a more connected, efficient, and sustainable future.",
    ],
    aside: {
      kicker: "Mission",
      title: "Mission",
      body: [
        "To be a global catalyst for change where technology, design, and storytelling converge to create solutions that redefine user experience, operational excellence, and creative impact.",
      ],
    },
  },
  {
    id: "values",
    type: "editorial",
    index: "05",
    label: "Values",
    tone: "mint",
    kicker: "05 — Review",
    title: "Company Review",
    body: [
      "Nuam Technologies is committed to evolving as a global technology partner through:",
    ],
    bullets: [
      "Expanding SaaS products for clinical and education systems.",
      "Leveraging AI and automation for process optimization.",
      "Partnering with overseas recruitment agencies on intelligent hiring platforms.",
      "Nurturing a culture of continuous learning and innovation.",
    ],
    note: "Goal: make technology simple, helpful, and effective for every business we work with.",
    aside: {
      kicker: "Our values",
      title: "Core Values",
      values: [
        {
          name: "Integrity",
          text: "Doing what’s right, even when no one is watching.",
        },
        {
          name: "Innovation",
          text: "Challenging conventions to achieve disruptive results.",
        },
        {
          name: "Excellence",
          text: "Delivering pixel-perfect, forward-thinking solutions.",
        },
        {
          name: "Respect",
          text: "Empowering teams and communities from all walks of life.",
        },
      ],
    },
  },
  {
    id: "contact",
    type: "contact",
    index: "06",
    label: "Contact",
    tone: "rose",
    kicker: "06 — Contact",
    title: "Get in Touch",
    body: [
      "We appreciate your interest in our innovative IT solutions. Reach out — we reply with care.",
    ],
    thankYou: {
      title: "Thank You",
      body: [
        "Thank you for visiting Nuam Technologies. We value your trust and look forward to building successful partnerships that drive growth and efficiency.",
        "By aligning creativity with functionality, Nuam continues to help organizations transform operations, enhance client engagement, and build a better digital future.",
      ],
    },
  },
  {
    id: "close",
    type: "close",
    index: "07",
    label: "Fin",
    tone: "azure",
  },
];
