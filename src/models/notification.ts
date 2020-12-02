import { Meetup } from "./meetups";

export interface Notification {
  id: string;
  user_id: string; // eslint-disable-line camelcase
  timestamp: string;
  asset_id: string; // eslint-disable-line camelcase
  asset_type: number; // eslint-disable-line camelcase
  asset: Meetup; // only meetings are returned now but we could extend this to support other types
  message: string;
  dismissed: boolean;
}
