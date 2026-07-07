export const SITE = {
  name: "SKC Construction",
  tagline: "Building Tomorrow With Strength & Precision",
  phones: [
    { display: "98888 82882", tel: "+919888882882", whatsapp: "919888882882" },
    { display: "91000 99990", tel: "+919100099990", whatsapp: "919100099990" },
  ],
  email: "skcconstruction0605@gmail.com",
  whatsappMessage:
    "Hello SKC Construction, I visited your website and would like to know more about your services.",
  address: {
    line1: "9-6-76, Anjaiah Nagar, Hasmathpet",
    line2: "New Bowenpally, Hyderabad, Telangana 500009, India",
    full: "SKC Construction, 9-6-76, Anjaiah Nagar, Hasmathpet, New Bowenpally, Hyderabad, Telangana 500009, India",
  },
};

export const whatsappLink = (whatsapp) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export const mapsEmbedSrc = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export const mapsDirectionsLink = (query) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    title: "Residential Construction",
    description:
      "Premium villas, independent homes, gated communities and apartment construction with superior quality and modern engineering.",
    icon: "home",
  },
  {
    title: "Commercial Construction",
    description:
      "Office buildings, shopping complexes, hotels, hospitals and commercial spaces built for long-term performance.",
    icon: "building",
  },
  {
    title: "Industrial Construction",
    description:
      "Factories, warehouses, industrial sheds, manufacturing plants and heavy-duty industrial infrastructure.",
    icon: "factory",
  },
  {
    title: "Road Construction",
    description:
      "Concrete roads, internal roads, highways, access roads, drainage systems and complete road infrastructure projects.",
    icon: "road",
  },
  {
    title: "Boundary Walls & Compound Walls",
    description:
      "RCC boundary walls, security walls, industrial compound walls, retaining walls and large-scale perimeter construction.",
    icon: "wall",
  },
  {
    title: "Water Tanks & RCC Structures",
    description:
      "Overhead water tanks, underground reservoirs, RCC tanks, cement storage structures and heavy reinforced concrete works.",
    icon: "tank",
  },
  {
    title: "Bridge Construction",
    description:
      "Road bridges, culverts, flyovers, pedestrian bridges and reinforced concrete bridge structures built to engineering standards.",
    icon: "bridge",
  },
  {
    title: "Turnkey EPC Projects",
    description:
      "Complete planning, engineering, project management, construction, finishing and handover under one roof.",
    icon: "key",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Government Registered",
    description: "A fully compliant, government registered construction company.",
    icon: "shield",
  },
  {
    title: "Experienced Engineers",
    description: "A seasoned team of engineers and project managers on every site.",
    icon: "users",
  },
  {
    title: "Quality Materials",
    description: "Only certified, high-grade materials sourced for durability.",
    icon: "gem",
  },
  {
    title: "On-Time Delivery",
    description: "Disciplined project timelines with milestone-driven execution.",
    icon: "clock",
  },
  {
    title: "Transparent Pricing",
    description: "Clear, itemised estimates with zero hidden costs.",
    icon: "receipt",
  },
];

export const PROJECTS = [
  {
    title: "Institutional Building Complex",
    category: "Commercial",
    image: "/images/skc1.webp",
    thumb: "/images/skc1-thumb.webp",
  },
  {
    title: "Twin Block Campus Development",
    category: "Commercial",
    image: "/images/skc2.webp",
    thumb: "/images/skc2-thumb.webp",
  },
  {
    title: "Elevated Water Tank Construction",
    category: "Infrastructure",
    image: "/images/skc3.webp",
    thumb: "/images/skc3-thumb.webp",
  },
  {
    title: "Overhead Tank Structural Works",
    category: "Infrastructure",
    image: "/images/skc4.webp",
    thumb: "/images/skc4-thumb.webp",
  },
  {
    title: "Overhead Water Tank Project",
    category: "Infrastructure",
    image: "/images/skc5.webp",
    thumb: "/images/skc5-thumb.webp",
  },
  {
    title: "Commercial Tower Facade Works",
    category: "Commercial",
    image: "/images/skc6.webp",
    thumb: "/images/skc6-thumb.webp",
  },
  {
    title: "Residential Complex Development",
    category: "Residential",
    image: "/images/skc7.webp",
    thumb: "/images/skc7-thumb.webp",
  },
  {
    title: "Multi-Storey RCC Structure",
    category: "Residential",
    image: "/images/skc8.webp",
    thumb: "/images/skc8-thumb.webp",
  },
  {
    title: "High-Rise Facade Finishing",
    category: "Residential",
    image: "/images/skc9.webp",
    thumb: "/images/skc9-thumb.webp",
  },
  {
    title: "RCC Framed Building Construction",
    category: "Residential",
    image: "/images/skc10.webp",
    thumb: "/images/skc10-thumb.webp",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Planning",
    description: "Site analysis, design consultation and regulatory approvals.",
  },
  {
    title: "Foundation",
    description: "Precision excavation and structural foundation engineering.",
  },
  {
    title: "Construction",
    description: "Disciplined execution across structure, MEP and civil works.",
  },
  {
    title: "Finishing",
    description: "Premium interiors, facades and final quality inspections.",
  },
  {
    title: "Delivery",
    description: "Handover with complete documentation and after-care support.",
  },
];

export const STATISTICS = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 250, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Expert Engineers" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Residential Client",
    quote:
      "SKC Construction delivered our dream home on time with exceptional quality. Their attention to detail is unmatched.",
  },
  {
    name: "Priya Sharma",
    role: "Commercial Developer",
    quote:
      "From planning to handover, the team was transparent, professional and precise. Highly recommended for large-scale projects.",
  },
  {
    name: "Arun Verma",
    role: "Industrial Client",
    quote:
      "Their engineering expertise and on-time delivery made our factory expansion completely stress-free.",
  },
  {
    name: "Meena Iyer",
    role: "Renovation Client",
    quote:
      "They transformed our ageing property into a modern masterpiece without a single delay or surprise cost.",
  },
];

export const TRUST_BADGES = [
  "Government Registered",
  "MSME Registered",
  "GST Registered",
  "Telangana Registered",
  "Legally Compliant",
  "Trusted Construction Company",
];

export const CERTIFICATES = [
  {
    id: "udyam",
    name: "Udyam / MSME Registration Certificate",
    authority: "Ministry of MSME, Government of India",
    number: "UDYAM-TS-02-0225945",
    date: "03 March 2025",
    description:
      "SKC Construction is recognised as a Micro Enterprise under the Udyam Registration scheme by the Ministry of Micro, Small and Medium Enterprises.",
    file: "/documents/udyam-msme-certificate.pdf",
    fileName: "SKC-Construction-Udyam-MSME-Certificate.pdf",
  },
  {
    id: "gst",
    name: "GST Registration Certificate",
    authority: "Goods and Services Tax Network, Government of India",
    number: "GSTIN 36RCQPS8013G1ZS",
    date: "19 March 2025",
    description:
      "Registered under the Goods and Services Tax Act as a Regular taxpayer, authorised to lawfully operate and invoice across India.",
    file: "/documents/gst-registration-certificate.pdf",
    fileName: "SKC-Construction-GST-Certificate.pdf",
  },
  {
    id: "telangana",
    name: "Telangana Shops & Establishment Certificate",
    authority: "Labour Department, Government of Telangana",
    number: "Reg. No. SEA/HYD/DCL/H1/1057546/2025",
    date: "01 March 2025",
    description:
      "Registered as a Shop/Establishment under the Telangana Shops & Establishments Act, 1988, permitting formal business operations in the state.",
    file: "/documents/telangana-shops-establishment-certificate.pdf",
    fileName: "SKC-Construction-Telangana-Registration-Certificate.pdf",
  },
];

export const COMPANY_INFO = [
  { label: "Registered Company Name", value: "SKC Construction" },
  { label: "Proprietor", value: "Mohammed Irfan Sheik" },
  { label: "Enterprise Type", value: "Micro Enterprise (Udyam Classification)" },
  { label: "Type of Organisation", value: "Proprietorship" },
  { label: "Nature of Business", value: "Construction of Buildings" },
  { label: "Date of Establishment", value: "1 March 2025" },
  { label: "Udyam / MSME Registration", value: "UDYAM-TS-02-0225945" },
  { label: "GST Registration (GSTIN)", value: "36RCQPS8013G1ZS" },
  {
    label: "Telangana Shops & Establishment Reg. No.",
    value: "SEA/HYD/DCL/H1/1057546/2025",
  },
  {
    label: "Registered Address",
    value: "9-6-76, Anjaiah Nagar, Hasmathpet, New Bowenpally, Hyderabad, Telangana 500009",
  },
  { label: "Contact Numbers", value: "+91 98888 82882 / +91 91000 99990" },
  { label: "Email", value: "skcconstruction0605@gmail.com" },
];

export const REGISTRATION_TIMELINE = [
  {
    year: "2025",
    title: "Company Started",
    date: "1 March 2025",
    description: "SKC Construction commenced official business operations in Hyderabad, Telangana.",
  },
  {
    title: "Government Registration",
    date: "1 March 2025",
    description: "Registered as a Shop/Establishment under the Telangana Shops & Establishments Act, 1988.",
  },
  {
    title: "MSME Registration",
    date: "3 March 2025",
    description: "Recognised as a Micro Enterprise under the Udyam Registration scheme, Ministry of MSME.",
  },
  {
    title: "GST Registration",
    date: "19 March 2025",
    description: "Granted GST registration (GSTIN 36RCQPS8013G1ZS) for lawful tax compliance across India.",
  },
  {
    title: "Official Business Operations",
    date: "Ongoing",
    description: "Fully compliant and operating as a government registered construction company.",
  },
];

export const FAQS = [
  {
    question: "Is SKC Construction a registered company?",
    answer:
      "Yes, SKC Construction is a government registered construction company operating in full regulatory compliance.",
  },
  {
    question: "What types of projects do you undertake?",
    answer:
      "We deliver residential, commercial, industrial and infrastructure construction, along with renovation and turnkey projects.",
  },
  {
    question: "Do you provide free quotes?",
    answer:
      "Yes, we offer a free, no-obligation quote for every project. Reach out via call, WhatsApp or our contact form.",
  },
  {
    question: "How do you ensure on-time delivery?",
    answer:
      "We follow milestone-driven project management with experienced engineers overseeing every phase of construction.",
  },
  {
    question: "Do you handle civil engineering and infrastructure works?",
    answer:
      "Yes, our civil engineering division handles infrastructure works grounded in rigorous engineering standards.",
  },
];
