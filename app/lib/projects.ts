export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url: string;
  tags: string[];
  year: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "saturday-hike-crew",
    title: "The Saturday Hike Crew",
    description:
      "A digital platform for LA's premier hiking community. Streamlined hike organization, registration, and recaps with a founder dashboard for attendance tracking and newsletter management.",
    longDescription:
      "The Saturday Hike Crew website is built with Next.js, Tailwind CSS, and TypeScript. It has streamlined the process and removed the middle man of organizing, recapping and communicating hikes that the SHC hosts. With up-to-date recaps of hikes, the ability to register for new hikes, and a newsletter, the SHC is able to focus on what they do best—host hikes. The founder has access to a dashboard to track attendance, create new hikes, and see newsletter subscribers.",
    url: "https://thesaturdayhikecrew.com",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Dashboard"],
    year: "2024",
    images: [
      "/images/shc1.webp",
      "/images/shc2.webp",
      "/images/shc3.webp",
      "/images/shc4.webp",
      "/images/shc5.webp",
    ],
  },
  {
    slug: "seen-by-liz",
    title: "Seen By Liz",
    description:
      "Portfolio website for a professional photographer showcasing editorial and commercial work with a focus on visual storytelling.",
    url: "https://seenbyliz.com",
    tags: ["Next.js", "Photography", "Portfolio"],
    year: "2024",
    images: [
      "/images/sblhero.webp",
      "/images/sblabout.webp",
      "/images/sblworks.webp",
      "/images/sblcontact.webp",
    ],
  },
  {
    slug: "tminus-talent",
    title: "T-Minus Talent",
    description:
      "Talent management agency website featuring artist rosters, booking capabilities, and service offerings for the entertainment industry.",
    url: "https://tminustalent.com",
    tags: ["Next.js", "E-commerce", "Entertainment"],
    year: "2024",
    images: [
      "/images/tmthero.webp",
      "/images/tmtservices.webp",
      "/images/tmtquotes.webp",
      "/images/tmtcontact.webp",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

