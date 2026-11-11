export type CaseStudy = {
  title: string;
  year: string;
  category: string;
  deliverables: string[];
  url: string;
  accent: "--cs-accent-sage" | "--cs-accent-lavender" | "--cs-accent-peach";
  /** Still under the title. Empty until a path is supplied. */
  heroImage: string;
  intro: string;
  details: [string, string, string];
  /** Silent homepage scroll-through. Plays in the bento, not the hero. */
  video: string;
  /** Stills beside the video. Empty until paths are supplied. */
  bentoImages: string[];
  backend: {
    blurb: string;
    stack: { label: string; value: string }[];
    /** Empty until a path is supplied. */
    image: string;
  };
  /** Previous on-page copy. Not rendered. */
  legacyBody: string[];
};

const INTRO =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.";

const DETAILS: [string, string, string] = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
];

function placeholderBackend(): CaseStudy["backend"] {
  return {
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stack: [
      { label: "Database", value: "Lorem ipsum dolor sit amet." },
      { label: "Auth", value: "Consectetur adipiscing elit." },
      { label: "Hosting", value: "Sed do eiusmod tempor." },
    ],
    image: "",
  };
}

/*
  Previous image paths, not assigned. Ask before using any of them.

  saturday-hike-crew
    poster: /images/shc-full.png
    gallery: /studyimages/shc2.webp, shc3.webp, shc4.webp, shc5.webp
  cleo-plus
    poster: /images/metanoia-full.png
    gallery: /studyimages/mm2.webp, mm3.webp
  egle-zalpys
    poster: /studyimages/ez1.webp
    gallery: /studyimages/ez1.webp, ez2.webp, ez3.webp, ez4.webp
*/

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "saturday-hike-crew": {
    title: "The Saturday Hike Crew",
    year: "2024",
    category: "Community Platform",
    deliverables: [
      "Web Development",
      "Dashboard Design",
      "Brand Identity",
      "Tailwind CSS",
      "TypeScript",
    ],
    url: "https://thesaturdayhikecrew.com",
    accent: "--cs-accent-sage",
    heroImage: "",
    intro: INTRO,
    details: DETAILS,
    video: "/videos/shcvid.mp4",
    bentoImages: [],
    backend: placeholderBackend(),
    legacyBody: [
      "The Saturday Hike started in late 2022 in Los Angeles as a group of friends, many new and black to the area looking for a way to get active through hiking and invite others as well. After about 6 months and a few more hikes, there were over 100 people regularly in attendance for a Saturday hike ranging from locations in Pasadena to Malibu and all in between.",
      "What became needed was a showcase for collaborations and community events that the Saturday Hike Crew has created but also system design and registration capabilities for upcoming hikes as well.",
      "Gathering insight, it was determined early that even with consistent attendance, most often they were first timers and hard to garner a returning audience to the hikes. The SHC site allowed us to gain more information on why that is, work in conjunction with Eventbrite, and build connections with other brands like Yeti looking to support the Saturday Hike Crew mission.",
    ],
  },
  "cleo-plus": {
    title: "Cleo +",
    year: "2025",
    category: "Artist Website",
    deliverables: [
      "Brand Strategy",
      "Visual Identity",
      "Web Development",
      "WebGL",
      "Entertainment",
    ],
    url: "https://itscleoplus.com",
    accent: "--cs-accent-lavender",
    heroImage: "",
    intro: INTRO,
    details: DETAILS,
    video: "/videos/mmvid.mp4",
    bentoImages: [],
    backend: placeholderBackend(),
    legacyBody: [
      "Cleo is a music artist that wanted an accompanying site that coincided with her recent releases. Offering an alternative way for her clients to interact with her content. An open creative design that lasted weeks driven by the feeling Cleo wanted her fans to feel when they landed on the page.",
      "We settled on 2 different approaches based on the where we were meeting her fans. Optimizing for mobile and desktop independently, the mobile site offered a vertical loop of a portion of the video that she released with easy access to social links and the pulsating logo at the bottom inviting the user into the next page. On desktop we prioritized the power of the mouse and used a static image, diverging the image into 2 distinct colors, pixelating the two and allow the mouse to interact with the background.",
      "The iteration of the desktop eventually brought us to a place of harmony within the colors offering distortion of the image as a fan used their mouse across the screen. Setting a foundation for tangible interaction with her fans, for now and in the future.",
    ],
  },
  "egle-zalpys": {
    title: "Egle Zalpys",
    year: "2026",
    category: "Portfolio Website",
    deliverables: [
      "Web Development",
      "Visual Identity",
      "Next.js",
      "TypeScript",
      "Motion",
    ],
    url: "https://portfolio.eglezalpys.com",
    accent: "--cs-accent-peach",
    heroImage: "",
    intro: INTRO,
    details: DETAILS,
    video: "/videos/ezvid.mp4",
    bentoImages: [],
    backend: placeholderBackend(),
    legacyBody: [
      "Egle tells stories through directing photoshoots, creating activations and presenting new products to the public. She wanted a hub to correctly depict her work and the impact from the work she has done. Searching for a quick and concise way to disperse her work for potential employers as well as her next clients.",
      "Her extensive experience and trove of quality photos made this an exciting project to iterate on. We conducted many creative conversations and decided between dozens of mocks before we decided on the current site today.",
      "Egle\u2019s focus is on the personal connection and tangible events she curates and organizes, therefore we decided to keep the site simple and focus on the imagery that was captured. Offering a conversation starter built on the efficiency of how the images are served, where the key points are positioned ultimately allowing her next client to visualize their project in the future even before working with Egle in mobile and desktop formats.",
    ],
  },
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);
