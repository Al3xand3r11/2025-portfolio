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

function placeholderBackend(blurb: string): CaseStudy["backend"] {
  return {
    blurb,
    stack: [
      { label: "Database", value: "PostgreSQL" },
      { label: "Hosting", value: "Vercel" },
    ],
    image: "",
  };
}

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
    heroImage: "/studyimages/shc1.webp",
    intro:
      "A creative showcase of the recent hikes and community collaborations across Los Angeles.",
    details: [
      "Creating and designing with the founder a front end to RSVP for upcoming hikes, recent hikes and collaborations and opportunities to sign up for the newsletter.",
      "Built attendance tracking to determine returning hikers and designed a pipeline for landing page newsletter capture to recurring email.",
      "Working dynamically with the Eventbrite API to pull live event data and upcoming hikes instantly.",
    ],
    video: "/videos/shcvid.mp4",
    bentoImages: [
      "/studyimages/shc2.png",
      "/studyimages/shc3.png",
      "/studyimages/shc4.webp",
    ],
    backend: {
      ...placeholderBackend(
        "Created a dashboard to cross reference Eventbrite attendees and newsletter members as well as editing abilities for upcoming events."
      ),
      image: "/studyimages/shc5.png",
    },
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
    heroImage: "/studyimages/mm1.webp",
    intro:
      "A digital gateway to connect Cleo + with fans and showcase recent releases.",
    details: [
      "A dual design landing page experience utilizing WebGL for desktop experiences with a looping music video on mobile.",
      "Desktop background anchored by the duotone image interacting with the particle shifting of the cursor\u2019s movements.",
      "A creative approach to web design that matches her passion for art and music through the vibrant colors, interactive elements and video inclusions.",
    ],
    video: "/videos/mmvid.mp4",
    bentoImages: [
      "/studyimages/mm2.webp",
      "/studyimages/mm3.png",
      "/studyimages/mm4.png",
    ],
    backend: {
      ...placeholderBackend(
        "A password protected dashboard to view recent messages from site visitors."
      ),
      image: "/studyimages/mm5.png",
    },
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
    heroImage: "/studyimages/ez1.webp",
    intro: "A showcase of her products and activations around Los Angeles.",
    details: [
      "A portfolio of past events produced with in depth project descriptions and image gallery.",
      "A collaborative design approach anchored by the strong visual images in Egle\u2019s portfolio from activations she produced.",
      "Accompanied with a password protected page for the client to redesign her homepage with new projects and stay up to date on work without code intervention.",
    ],
    video: "/videos/ezvid.mp4",
    bentoImages: [
      "/studyimages/ez2.png",
      "/studyimages/ez3.png",
      "/studyimages/ez4.webp",
    ],
    backend: {
      ...placeholderBackend(
        "Offering insight into projects and a central hub for image and content management."
      ),
      image: "/studyimages/ez5.png",
    },
    legacyBody: [
      "Egle tells stories through directing photoshoots, creating activations and presenting new products to the public. She wanted a hub to correctly depict her work and the impact from the work she has done. Searching for a quick and concise way to disperse her work for potential employers as well as her next clients.",
      "Her extensive experience and trove of quality photos made this an exciting project to iterate on. We conducted many creative conversations and decided between dozens of mocks before we decided on the current site today.",
      "Egle\u2019s focus is on the personal connection and tangible events she curates and organizes, therefore we decided to keep the site simple and focus on the imagery that was captured. Offering a conversation starter built on the efficiency of how the images are served, where the key points are positioned ultimately allowing her next client to visualize their project in the future even before working with Egle in mobile and desktop formats.",
    ],
  },
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);
