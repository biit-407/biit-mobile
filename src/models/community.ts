export interface Ban {
  name: string;
  // TODO make camelcase
  ordered_by: string; // eslint-disable-line camelcase
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
