import productImg from "../assets/images/product.webp";
import designImg from "../assets/images/deisgn.webp";
import mobileImg from "../assets/images/mobile.webp";
import devopsImg from "../assets/images/deveopspng.webp";
import brandImg from "../assets/images/brand.webp";
import growthImg from "../assets/images/growth.webp";

export const servicesHero = {
  label: "Services",
  headline: "Corporate capabilities, engineered to deliver.",
  support:
    "Nuam Technologies Pvt Ltd — from first sketch to production scale. Strategy, design, and engineering under one corporate roof since 2025.",
  image: productImg,
  imageAlt: "Nuam product engineering team collaborating in studio",
};

export const serviceOfferings = [
  {
    id: "product",
    title: "Product Engineering",
    tagline: "Platforms built for scale, speed, and longevity.",
    body: "We design and ship robust web platforms, APIs, and product systems — clean architecture, modern stacks, and performance treated as a feature.",
    outcomes: ["Web applications", "API platforms", "Design systems in code", "Technical audits"],
    image: productImg,
  },
  {
    id: "experience",
    title: "Experience Design",
    tagline: "Interfaces that feel inevitable.",
    body: "Research-led UX and refined UI — prototypes that de-risk decisions, and visual systems that stay coherent as you grow.",
    outcomes: ["UX research", "Product UI", "Prototyping", "Design ops"],
    image: designImg,
  },
  {
    id: "mobile",
    title: "Mobile Platforms",
    tagline: "Native-quality apps people return to.",
    body: "iOS and Android experiences with the polish of native and the velocity of modern cross-platform where it fits.",
    outcomes: ["iOS & Android", "Cross-platform apps", "App redesigns", "Store launches"],
    image: mobileImg,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    tagline: "Infrastructure that stays invisible — until you need it.",
    body: "Secure, observable cloud foundations and delivery pipelines so your product ships confidently and scales without drama.",
    outcomes: ["Cloud architecture", "CI/CD", "Observability", "Cost & security"],
    image: devopsImg,
  },
  {
    id: "brand",
    title: "Brand Systems",
    tagline: "Identity that travels every touchpoint.",
    body: "Visual language, digital brand systems, and campaign-ready assets that keep your story consistent from site to product to social.",
    outcomes: ["Brand identity", "Digital guidelines", "Campaign systems", "Motion language"],
    image: brandImg,
  },
  {
    id: "growth",
    title: "Growth & Transformation",
    tagline: "Strategy for the digital leap.",
    body: "Roadmaps, experimentation, and transformation programs that connect business goals to product bets — and prove them in market.",
    outcomes: ["Digital strategy", "Roadmapping", "Conversion programs", "Transformation"],
    image: growthImg,
  },
];

export const servicesEngagement = [
  {
    step: "01",
    title: "Scope",
    body: "We align on outcomes, constraints, and success metrics before a single sprint starts.",
  },
  {
    step: "02",
    title: "Squad",
    body: "A focused team of strategists, designers, and engineers embedded with yours.",
  },
  {
    step: "03",
    title: "Ship",
    body: "Iterative delivery with demos, feedback loops, and production-ready quality bars.",
  },
  {
    step: "04",
    title: "Scale",
    body: "Handover, training, and ongoing partnership so the product keeps getting sharper.",
  },
];

export const servicesCta = {
  title: "Ready to put capability to work?",
  support: "Tell us where you are — we’ll map the right mix of services.",
  button: { label: "Request a quote", to: "/contact" },
  email: "nuamtechnologies@gmail.com",
};
