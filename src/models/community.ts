export interface Community {
  name: string;
  codeOfConduct: string;
  admins: string[];
  members: string[];
  mpm: string;
  meetType: string;
  token: string;
}

export const BLANK_COMMUNITY: Community = {
  name: "",
  codeOfConduct: "",
  admins: [],
  members: [],
  mpm: "",
  meetType: "",
  token: "",
};
