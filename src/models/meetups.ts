export interface Meetup {
  id: string;
  timestamp: string;
  duration: string;
  location: string;

  meeting_type: string; // eslint-disable-line camelcase

  user_list: Record<string, number>; // eslint-disable-line camelcase
}

export const BLANK_MEETUP: Meetup = {
  id: "a meetup id",
  timestamp: "3:00 PM",
  duration: "25",
  location: "Zoom",
  meeting_type: "Online", // eslint-disable-line camelcase
  user_list: { Katie: 1, "Step Bro": 1 }, // eslint-disable-line camelcase
};
