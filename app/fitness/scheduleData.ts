export type ClassTime = {
  time: string;
  label?: string;
};

export type ClassDay = {
  day: string;
  locationName: string;
  address: string;
  mapUrl: string;
  times: ClassTime[];
};

const ARTS_DISTRICT = {
  locationName: "Arts District",
  address: "300 S Santa Fe Ave",
  mapUrl: "https://maps.google.com/?q=300+S+Santa+Fe+Ave,+Los+Angeles,+CA",
};

const HISTORIC_CORE = {
  locationName: "Historic Core",
  address: "835 S Hill St",
  mapUrl: "https://maps.google.com/?q=835+S+Hill+St,+Los+Angeles,+CA",
};

export const weeklySchedule: ClassDay[] = [
  {
    day: "Sunday",
    ...ARTS_DISTRICT,
    times: [{ time: "3:30 PM" }, { time: "4:30 PM" }, { time: "5:30 PM" }],
  },
  {
    day: "Monday",
    ...ARTS_DISTRICT,
    times: [{ time: "4:30 PM" }, { time: "5:30 PM" }, { time: "6:30 PM" }],
  },
  {
    day: "Wednesday",
    ...ARTS_DISTRICT,
    times: [{ time: "4:30 PM" }, { time: "5:30 PM" }, { time: "6:30 PM" }],
  },
  {
    day: "Friday",
    ...HISTORIC_CORE,
    times: [
      { time: "4:00 PM" },
      { time: "5:00 PM" },
      { time: "6:00 PM", label: "Arms & Abs" },
    ],
  },
];

export const BOOKING_URL = "https://www.lagree213.com/book-a-class";
