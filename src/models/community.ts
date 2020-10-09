export interface Ban {
  name: string;
  ordered_by: string;
}

export interface Community {
  name: string;
  codeofconduct: string;
  Admins: string[];
  Members: string[];
  bans: Ban[];
  mpm: string;
  meettype: string;
}

export const BLANK_COMMUNITY: Community = {
  name: "",
  codeofconduct: "",
  Admins: [],
  Members: [],
  bans: [],
  mpm: "",
  meettype: "",
};
