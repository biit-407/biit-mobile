export interface Meetup {
    id: string;
    timestamp: string;
    duration: string;
    location: string;
    meeting_type: string;
    user_list: string[];
}

export const BLANK_MEETUP: Meetup = {
    id: 'a meetup id',
    timestamp: "3:00 PM",
    duration: '25',
    location: "Zoom",
    meeting_type: 'Online',
    user_list: ["Katie", "Step Bro"]
}