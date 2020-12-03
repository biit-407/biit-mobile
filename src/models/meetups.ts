export interface Meetup {
  id: string;
  timestamp: string;
  duration: string;
  location: string;
  meeting_type: string; // eslint-disable-line camelcase
  user_list: Record<string, number>; // eslint-disable-line camelcase
  rating_dict?: Record<string, number>; // eslint-disable-line camelcase
  community: string;
  zoomID?: string;
  zoomLink?: string;
}

// zoom_id: string
// zoom_link: string
// community: string

export const BLANK_MEETUP: Meetup = {
  id: "a meetup id",
  timestamp: "3:00 PM",
  duration: "25",
  location: "Zoom",
  meeting_type: "Online", // eslint-disable-line camelcase
  user_list: { Daniel: 1, Stephen: 1 }, // eslint-disable-line camelcase
  rating_dict: { Katie: 3 }, // eslint-disable-line camelcase
  community: "biit",
};

export type MeetupType = "tentative" | "accepted" | "declined";
