import { ENGINEERING_ORIGIN, LAGREE_ORIGIN } from "./sites";

/* One graph per site. The root layout is shared by both, so neither of these
   belongs there — each is rendered by the site that owns it. */

const SAME_AS = [
  "https://www.linkedin.com/in/bnance1/",
  "https://github.com/Al3xand3r11",
];

const LOS_ANGELES = {
  "@type": "PostalAddress",
  addressLocality: "Los Angeles",
  addressRegion: "CA",
  addressCountry: "US",
};

export const engineeringSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Brandon Nance",
      url: ENGINEERING_ORIGIN,
      description:
        "Portfolio of Brandon Nance, a software engineer in Los Angeles.",
    },
    {
      "@type": "Person",
      name: "Brandon Nance",
      url: ENGINEERING_ORIGIN,
      jobTitle: "Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Paramount",
      },
      knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "Software Engineering",
        "Lagree Fitness",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Towson University",
      },
      address: LOS_ANGELES,
      sameAs: [...SAME_AS, LAGREE_ORIGIN],
    },
  ],
};

export const lagreeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Brandon Nance | Lagree",
      url: LAGREE_ORIGIN,
      description:
        "Lagree classes taught by Brandon Nance in downtown Los Angeles.",
    },
    {
      "@type": "Person",
      name: "Brandon Nance",
      url: LAGREE_ORIGIN,
      jobTitle: "Lagree Instructor",
      worksFor: {
        "@type": "ExerciseGym",
        name: "Lagree213",
        url: "https://www.lagree213.com",
        address: LOS_ANGELES,
      },
      knowsAbout: ["Lagree", "Megaformer", "Strength Training", "Pilates"],
      address: LOS_ANGELES,
      sameAs: [...SAME_AS, ENGINEERING_ORIGIN],
    },
  ],
};
