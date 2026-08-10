import heroVideo from "../assets/hero.mp4";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import productImg from "../assets/images/product.webp";
import designImg from "../assets/images/deisgn.webp";
import mobileImg from "../assets/images/mobile.webp";
import devopsImg from "../assets/images/deveopspng.webp";
import brandImg from "../assets/images/brand.webp";
import growthImg from "../assets/images/growth.webp";

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
  // {
  //   id: "lumen",
  //   client: "Lumen University",
  //   industry: "Education",
  //   title: "A digital campus rebuilt for students, faculty, and operations.",
  //   image:
  //     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
  // },
  // {
  //   id: "harbor",
  //   client: "Harbor Foods",
  //   industry: "E-commerce",
  //   title: "A branded commerce channel launched with precision and appetite.",
  //   image:
  //     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80",
  // },
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
    image: productImg,
  },
  {
    id: "experience",
    title: "Experience Design",
    description:
      "Interfaces researched, refined, and ready for real enterprise users.",
    image: designImg,
  },
  {
    id: "mobile",
    title: "Mobile Platforms",
    description:
      "iOS and Android apps built for retention, performance, and brand trust.",
    image: mobileImg,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "Reliable infrastructure and pipelines that keep releases calm under pressure.",
    image: devopsImg,
  },
  {
    id: "brand",
    title: "Brand Systems",
    description:
      "Visual identity and digital language that travel every corporate touchpoint.",
    image: brandImg,
  },
  {
    id: "growth",
    title: "Digital Transformation",
    description:
      "Strategy and execution for organizations ready to modernize with confidence.",
    image: growthImg,
  },
];

export const technologiesSection = {
  label: "Stack",
  title: ["Technologies", "we ship with."],
  support:
    "Modern frameworks, cloud, and AI tooling — chosen for reliability, not novelty.",
};

export const technologies = [
  { id: "react", name: "React", group: "Frontend" },
  { id: "typescript", name: "TypeScript", group: "Language" },
  { id: "nodejs", name: "Node.js", group: "Runtime" },
  { id: "python", name: "Python", group: "Language" },
  { id: "nextjs", name: "Next.js", group: "Framework" },
  { id: "flutter", name: "Flutter", group: "Mobile" },
  { id: "aws", name: "AWS", group: "Cloud" },
  { id: "docker", name: "Docker", group: "DevOps" },
  { id: "kubernetes", name: "Kubernetes", group: "DevOps" },
  { id: "postgres", name: "PostgreSQL", group: "Data" },
  { id: "mongodb", name: "MongoDB", group: "Data" },
  { id: "tailwind", name: "Tailwind", group: "UI" },
  { id: "figma", name: "Figma", group: "Design" },
  { id: "openai", name: "OpenAI", group: "AI" },
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

export const processSection = {
  label: "Process",
  title: ["How we", "ship."],
  support:
    "Four gates. Clear ownership. No mystery between brief and release.",
};

export const process = [
  {
    step: "01",
    title: "Discover",
    body: "Market, users, and constraints mapped before a single pixel or commit.",
  },
  {
    step: "02",
    title: "Design",
    body: "Prototypes and systems tested early — visual language locked with intent.",
  },
  {
    step: "03",
    title: "Build",
    body: "Clean architecture, modern stacks, and performance treated as a feature.",
  },
  {
    step: "04",
    title: "Evolve",
    body: "Launch is a milestone. We stay to measure, iterate, and raise the bar.",
  },
];

export const industriesSection = {
  label: "Industries",
  title: ["Where we", "operate."],
  support:
    "Corporate platforms across sectors that demand clarity, compliance, and craft.",
};

export const industries = [
  {
    id: "fintech",
    name: "Fintech",
    detail: "Banking flows, compliance-ready UX, and trust at every tap.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    detail: "Discovery, checkout, and peak-load platforms for modern brands.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "health",
    name: "Healthcare",
    detail: "Calm care journeys with reliable systems behind the interface.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "education",
    name: "Education",
    detail: "Digital campuses for students, faculty, and operations alike.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "enterprise",
    name: "Enterprise SaaS",
    detail: "Internal tools and customer platforms that scale with the org.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  },
];

export const voicesSection = {
  label: "Voices",
  title: ["What partners", "say."],
  support: "Feedback from teams we’ve shipped with since 2025.",
};

export const voices = [
  {
    id: "orbit",
    quote:
      "Nuam treated our banking product like it was their own — sharp UX, clean delivery, and zero drama at launch.",
    name: "Priya Menon",
    role: "Head of Product, Orbit Finance",
  },
  {
    id: "northline",
    quote:
      "They rebuilt our retail platform for peak season and it held. Clear process, honest timelines, corporate-grade craft.",
    name: "James Okonkwo",
    role: "CTO, Northline Commerce",
  },
  {
    id: "pulse",
    quote:
      "Calm interfaces for a high-stakes care product. Nuam understood both the users and the regulators.",
    name: "Dr. Anika Shah",
    role: "Founder, Pulse Health",
  },
];

export const cta = {
  title: "Build with a corporate technology partner.",
  support:
    "Nuam Technologies Pvt Ltd — tell us what you’re shipping next. We’ll reply within one business day.",
  button: { label: "Request a quote", to: "/contact" },
  email: "nuamtechnologies@gmail.com",
};
