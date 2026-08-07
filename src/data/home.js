import heroVideo from "../assets/hero.mp4";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

export const hero = {
  brand: "NUAM",
  cta: { label: "View our works", to: "/portfolio" },
  slides: [
    {
      id: "film",
      type: "video",
      video: heroVideo,
      image: hero1,
      imageAlt: "Nuam Technologies Pvt Ltd — product film",
      headline: "Corporate technology, built with clarity.",
      support:
        "Nuam Technologies Pvt Ltd — founded 2025, scaled as a corporate partner in 2026. Strategy, design, and engineering for serious teams.",
      label: "01 — Nuam",
    },
    {
      id: "craft",
      type: "image",
      image: hero1,
      imageAlt: "Nuam Technologies workspace — product UI on desktop and mobile",
      headline: "Software that earns enterprise trust.",
      support:
        "From first brief to production release — products refined for real users, real ops, and real growth.",
      label: "02 — Product",
    },
    {
      id: "scale",
      type: "image",
      image: hero2,
      imageAlt: "Nuam technology ecosystem — digital platforms",
      headline: "Platforms ready for corporate scale.",
      support:
        "Clean architecture, measurable delivery, and systems that stay sharp as your organization expands.",
      label: "03 — Platforms",
    },
    {
      id: "brand",
      type: "image",
      image: hero3,
      imageAlt: "Nuam enterprise atrium — analytics and experience craft",
      headline: "Experience systems for modern brands.",
      support:
        "Interfaces, identity, and motion language that travel every touchpoint with corporate precision.",
      label: "04 — Experience",
    },
  ],
};

export const worksSection = {
  label: "Case studies",
  title: ["Selected", "works"],
  support:
    "Engagements with growing brands and corporate teams — shipped since we opened in 2025.",
  cta: { label: "View all works", to: "/portfolio" },
};

export const works = [
  {
    id: "northline",
    client: "Northline Commerce",
    industry: "Retail",
    title: "A retail platform rebuilt for speed, discovery, and peak-season load.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "orbit",
    client: "Orbit Finance",
    industry: "Fintech",
    title: "Mobile-first banking flows designed for clarity and compliance.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "atelier",
    client: "Atelier Forma",
    industry: "Brand",
    title: "A design-led brand system across web, product, and campaign.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "pulse",
    client: "Pulse Health",
    industry: "Healthcare",
    title: "Care journeys digitized with calm interfaces and reliable systems.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "lumen",
    client: "Lumen University",
    industry: "Education",
    title: "A digital campus rebuilt for students, faculty, and operations.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "harbor",
    client: "Harbor Foods",
    industry: "E-commerce",
    title: "A branded commerce channel launched with precision and appetite.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80",
  },
];

export const impactSection = {
  label: "Impact",
  support: "Honest numbers from a company built in 2025 — corporate by 2026.",
};

export const stats = [
  { value: "10+", label: "Clients served" },
  { value: "25+", label: "Projects delivered" },
  { value: "2025", label: "Founded" },
  { value: "2026", label: "Corporate year" },
];

export const story = {
  label: "Our story",
  aside: "Nuam Technologies Pvt Ltd — corporate technology partners since 2026.",
  body: "Nuam Technologies Pvt Ltd started in 2025 with a simple brief: build digital products corporations can trust. In 2026 we operate as a full corporate technology company — design, engineering, and delivery under one roof. We sprouted in a world full of noise — and chose clarity.",
  footer: "Est. 2025 · Corporate partner in 2026.",
  cta: { label: "About us", to: "/about" },
};

export const servicesSection = {
  label: "Capabilities",
  title: "What we do",
  cta: { label: "Explore services", to: "/services" },
};

export const services = [
  {
    id: "product",
    title: "Product Engineering",
    description:
      "Corporate-grade platforms engineered for scale, security, and longevity.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "experience",
    title: "Experience Design",
    description:
      "Interfaces researched, refined, and ready for real enterprise users.",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mobile",
    title: "Mobile Platforms",
    description:
      "iOS and Android apps built for retention, performance, and brand trust.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "Reliable infrastructure and pipelines that keep releases calm under pressure.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "brand",
    title: "Brand Systems",
    description:
      "Visual identity and digital language that travel every corporate touchpoint.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "growth",
    title: "Digital Transformation",
    description:
      "Strategy and execution for organizations ready to modernize with confidence.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
];

export const clientsSection = {
  label: "Clients",
  title: ["Partners who", "trust Nuam."],
  support:
    "10+ clients since 2025 — emerging products and established corporate brands alike.",
  cta: { label: "Our story", to: "/about" },
};

export const clients = [
  "Northline",
  "Orbit",
  "Atelier",
  "Pulse",
  "Lumen",
  "Harbor",
  "Vertex",
  "Cascade",
  "Meridian",
  "Solace",
];

export const cta = {
  title: "Build with a corporate technology partner.",
  support:
    "Nuam Technologies Pvt Ltd — tell us what you’re shipping next. We’ll reply within one business day.",
  button: { label: "Request a quote", to: "/contact" },
  email: "hello@nuam.tech",
};
