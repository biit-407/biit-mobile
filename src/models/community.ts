export interface Community {
  name: string;
  codeofconduct: string;
  Admins: string[];
  Members: string[];
  mpm: string;
  meettype: string;
}

export const BLANK_COMMUNITY: Community = {
  name: "",
  codeofconduct: "",
  Admins: [],
  Members: [],
  mpm: "",
  meettype: "",
};
