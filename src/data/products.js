export const productsHero = {
  label: "Products",
  brand: "CLMS",
  poweredBy: "Powered by Nuam",
  headline: "Clinic care, calmly managed.",
  support:
    "A complete Clinic Management System for appointments, patient records, billing, and day-end clarity — purpose-built for dental, psychological, and cosmetic clinics.",
  primaryCta: { label: "Request a demo", to: "/contact" },
  secondaryCta: { label: "Talk to us", href: "mailto:nuamtechnologies@gmail.com" },
  image:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2400&q=85",
  imageAlt: "Modern clinic corridor with calm architectural light",
};

export const productsOverview = {
  label: "Overview",
  title: ["One system for the", "whole clinic day."],
  lead: "CLMS (Clinic Management System) is Nuam’s product for clinics that want clarity at the front desk, calm for clinicians, and clean books for accounts.",
  body: [
    "Instead of juggling WhatsApp bookings, paper registers, and scattered spreadsheets, CLMS keeps scheduling, patients, and billing in one operating surface — designed for how real clinics actually move.",
    "Built for multi-specialty environments: dental chairs, psychology sessions, and cosmetic consult-to-procedure journeys can share the same system without forcing one workflow on everyone.",
  ],
  highlights: [
    {
      title: "Front desk calm",
      body: "Check-ins, waiting lists, and room readiness without verbal chaos.",
    },
    {
      title: "Clinician ready",
      body: "Patient context, notes, and alerts before the door opens.",
    },
    {
      title: "Accounts clear",
      body: "Invoices, payments, and day collections you can trust at close.",
    },
    {
      title: "Nuam-backed",
      body: "Engineered, hosted, and supported by the same team that builds corporate products.",
    },
  ],
};

export const productsShowcase = {
  label: "Product",
  title: ["The clinic desk,", "reimagined."],
  support:
    "A clear operating surface for front desk, clinicians, and accounts — without the clutter of tabs, chats, and paper trails.",
  appName: "CLMS",
  clinicName: "Nuam Demo Clinic",
  dateLabel: "Today · Tue 12 Aug",
  stats: [
    { value: "24", label: "Appointments" },
    { value: "08", label: "Checked in" },
    { value: "03", label: "Waiting" },
    { value: "₹42k", label: "Collected" },
  ],
  nav: ["Overview", "Schedule", "Patients", "Billing", "Reports"],
  appointments: [
    {
      time: "09:30",
      patient: "Aisha Rahman",
      type: "Dental · Prophylaxis",
      clinician: "Dr. Meera",
      room: "Chair 2",
      status: "Checked in",
      tone: "live",
    },
    {
      time: "10:15",
      patient: "Marcus Chen",
      type: "Cosmetic · First consult",
      clinician: "Dr. Hale",
      room: "Suite A",
      status: "Confirmed",
      tone: "ok",
    },
    {
      time: "11:00",
      patient: "Priya Nair",
      type: "Psychology · Follow-up",
      clinician: "Dr. Iyer",
      room: "Room 3",
      status: "Waiting",
      tone: "wait",
    },
    {
      time: "11:45",
      patient: "James Okonkwo",
      type: "Dental · Endodontics",
      clinician: "Dr. Meera",
      room: "Chair 1",
      status: "Confirmed",
      tone: "ok",
    },
    {
      time: "14:00",
      patient: "Sofia Alvarez",
      type: "Cosmetic · Treatment plan",
      clinician: "Dr. Hale",
      room: "Suite A",
      status: "Confirmed",
      tone: "ok",
    },
  ],
  patients: [
    {
      name: "Aisha Rahman",
      id: "PT-2041",
      note: "Penicillin allergy",
      lastVisit: "12 days ago",
    },
    {
      name: "Marcus Chen",
      id: "PT-1988",
      note: "New patient intake",
      lastVisit: "First visit",
    },
    {
      name: "Priya Nair",
      id: "PT-2110",
      note: "Session notes locked",
      lastVisit: "7 days ago",
    },
    {
      name: "James Okonkwo",
      id: "PT-1762",
      note: "Radiograph on file",
      lastVisit: "3 weeks ago",
    },
  ],
  billing: [
    {
      label: "Invoice #1842",
      patient: "Aisha Rahman",
      amount: "₹2,400",
      state: "Paid",
      method: "UPI",
    },
    {
      label: "Invoice #1843",
      patient: "Marcus Chen",
      amount: "₹8,750",
      state: "Due",
      method: "Card pending",
    },
    {
      label: "Invoice #1844",
      patient: "Priya Nair",
      amount: "₹1,200",
      state: "Paid",
      method: "Cash",
    },
    {
      label: "Invoice #1845",
      patient: "Sofia Alvarez",
      amount: "₹15,000",
      state: "Partial",
      method: "Advance 40%",
    },
  ],
};

export const productsWorkflow = {
  label: "How it works",
  title: ["From booking to", "day-end close."],
  support:
    "CLMS follows the real clinic rhythm — not a generic CRM dressed as healthcare.",
  steps: [
    {
      step: "01",
      title: "Book & confirm",
      body: "Patients book by phone, walk-in, or link. Staff assign clinician, room, and duration with conflict checks before the slot locks.",
      points: [
        "Specialty-aware slot lengths",
        "SMS / WhatsApp confirmations",
        "Buffer time between procedures",
      ],
    },
    {
      step: "02",
      title: "Arrive & check in",
      body: "Front desk marks arrival, updates waiting status, and surfaces allergies or balance due before the patient is called.",
      points: [
        "Live waiting queue",
        "Flagged medical alerts",
        "Outstanding balance prompts",
      ],
    },
    {
      step: "03",
      title: "Treat & document",
      body: "Clinicians open the visit with history, prior notes, and today’s plan — then capture session notes without leaving the flow.",
      points: [
        "Visit timeline",
        "Specialty note templates",
        "Role-based privacy for psych notes",
      ],
    },
    {
      step: "04",
      title: "Bill & close",
      body: "Generate invoices from services rendered, record payments, and run a day-end summary for attendance and collections.",
      points: [
        "Itemized invoices",
        "Partial / advance payments",
        "Day-end collection report",
      ],
    },
  ],
};

export const productsFeatures = {
  label: "Capabilities",
  title: ["Everything a modern", "clinic needs."],
  support:
    "Modules that cover the full operating loop — scheduling, records, money, and insight — without bloating the interface.",
  items: [
    {
      id: "schedule",
      title: "Smart scheduling",
      body: "Rooms, clinicians, and buffers that prevent double-booking and keep the day flowing across specialties.",
      points: [
        "Multi-chair / multi-room calendars",
        "Clinician availability rules",
        "Recurring sessions for therapy",
        "No-show and late tracking",
      ],
    },
    {
      id: "patients",
      title: "Patient records",
      body: "A single patient profile with history, documents, and alerts — ready the moment care begins.",
      points: [
        "Demographics & contacts",
        "Allergy and medical flags",
        "Visit history timeline",
        "Document attachments",
      ],
    },
    {
      id: "billing",
      title: "Billing & invoices",
      body: "Transparent charges and receipts without spreadsheet chaos or forgotten balances.",
      points: [
        "Service catalogs by specialty",
        "GST-ready invoice formats",
        "UPI, card, cash, and advance",
        "Outstanding balance views",
      ],
    },
    {
      id: "roles",
      title: "Roles & access",
      body: "Front desk, clinicians, and admin each see what they need — nothing more.",
      points: [
        "Reception, clinician, accounts roles",
        "Locked psychology notes",
        "Audit-friendly activity logs",
        "Multi-branch ready structure",
      ],
    },
    {
      id: "multi",
      title: "Multi-specialty",
      body: "Tuned for dental, psychological, and cosmetic workflows under one roof.",
      points: [
        "Specialty visit templates",
        "Procedure vs session modes",
        "Consult-to-treatment pipelines",
        "Shared patient master file",
      ],
    },
    {
      id: "insights",
      title: "Day-end clarity",
      body: "Simple reports on attendance, collections, and capacity so you can plan tomorrow with confidence.",
      points: [
        "Daily collection summary",
        "Utilization by clinician",
        "No-show trends",
        "Exportable CSV / PDF",
      ],
    },
  ],
};

export const productsModules = {
  label: "Modules",
  title: ["What’s inside", "CLMS."],
  support: "Detailed product surface — what teams actually use every day.",
  items: [
    {
      id: "appointments",
      name: "Appointments",
      summary:
        "The spine of the clinic day — book, reschedule, and protect capacity.",
      details: [
        "Drag-friendly day / week views",
        "Color by specialty or clinician",
        "Walk-in slots without breaking the board",
        "Cancellation reasons for insight",
      ],
    },
    {
      id: "emr-lite",
      name: "Clinical notes",
      summary:
        "Lightweight EMR for clinics that need structure without hospital complexity.",
      details: [
        "SOAP-style and specialty templates",
        "Previous visit quick recall",
        "Private note fields for psychology",
        "Printable visit summaries",
      ],
    },
    {
      id: "inventory-lite",
      name: "Consumables (optional)",
      summary:
        "Track high-use clinic consumables tied to procedures when you need it.",
      details: [
        "Stock alerts for key items",
        "Usage logged against visits",
        "Simple reorder thresholds",
      ],
    },
    {
      id: "comms",
      name: "Patient messaging",
      summary:
        "Confirmations and reminders that reduce no-shows without extra staff load.",
      details: [
        "Appointment confirmations",
        "Day-before reminders",
        "Post-visit follow-up prompts",
      ],
    },
  ],
};

export const productsSpecialties = {
  label: "Built for",
  title: "Clinics that need calm ops.",
  support:
    "Same platform, specialty-aware defaults — so dental, psych, and cosmetic teams don’t fight the software.",
  items: [
    {
      name: "Dental",
      body: "Chair time, treatment plans, and recall visits without admin drag.",
      points: [
        "Chair-based scheduling",
        "Procedure catalogs & packages",
        "Radiograph / document hooks",
        "Recall and hygiene reminders",
      ],
    },
    {
      name: "Psychological",
      body: "Session privacy, recurring bookings, and notes that stay orderly.",
      points: [
        "Recurring weekly sessions",
        "Confidential note permissions",
        "Session duration presets",
        "No public waiting display of reason",
      ],
    },
    {
      name: "Cosmetic",
      body: "Consult-to-procedure journeys with clear estimates and follow-ups.",
      points: [
        "Consult → plan → procedure stages",
        "Estimate and advance billing",
        "Before/after media attachments",
        "Package and membership options",
      ],
    },
  ],
};

export const productsSecurity = {
  label: "Trust",
  title: ["Built with care for", "clinic data."],
  support:
    "CLMS is engineered by Nuam with practical safeguards for day-to-day clinic operations.",
  items: [
    {
      title: "Role-based access",
      body: "Reception, clinicians, and accounts see only their required surfaces.",
    },
    {
      title: "Encrypted in transit",
      body: "Modern TLS for every session between clinic devices and the cloud.",
    },
    {
      title: "Backup discipline",
      body: "Automated backups and restore paths so a bad day doesn’t become data loss.",
    },
    {
      title: "Activity awareness",
      body: "Important admin actions leave an audit trail for accountability.",
    },
  ],
};

export const productsFaq = {
  label: "FAQ",
  title: "Common questions.",
  items: [
    {
      q: "Who is CLMS for?",
      a: "Independent and multi-chair clinics in dental, psychological, and cosmetic care — especially teams outgrowing notebooks, WhatsApp, and generic booking tools.",
    },
    {
      q: "Can we run multiple specialties in one clinic?",
      a: "Yes. Shared patient master data with specialty-aware schedules, templates, and billing catalogs.",
    },
    {
      q: "Do you customize workflows?",
      a: "Yes. Nuam configures slot rules, note templates, invoice catalogs, and roles to match how your clinic already works.",
    },
    {
      q: "How do demos work?",
      a: "We walk through your front desk, clinician, and billing flows with sample data — then map a rollout plan for your team.",
    },
    {
      q: "Is training included?",
      a: "Yes. Front desk and clinician onboarding is part of go-live, with quick reference guides for each role.",
    },
  ],
};

export const productsCta = {
  title: "Bring CLMS to your clinic.",
  support:
    "Tell us about your specialties, daily volume, and current tools — we’ll show a tailored CLMS walkthrough and rollout path.",
  button: { label: "Request a demo", to: "/contact" },
  email: "nuamtechnologies@gmail.com",
};
