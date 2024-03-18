// A collection of interfaces to describe JSON data returned from Athletic.net

type Gender = "M" | "F";

// Getting team / athlete roster information

export interface TeamInfo {
  IDTeam: number;
  Name: string;
  TeamCode: string;
  Level: number;
  MascotUrl: string;
  //CoverPhoto: ???;
  TwitterUser: string;
  PrepSportID: number;
  ShowPSW: number;
  publicToken: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Phone: string;
  Fax: string;
  Website: string;
  RegionID: number;
  LegacySS: number;
  WebsiteSport: string;
  mHeadCoachIdSport: number;
  fHeadCoachIdSport: number;
};

export interface SeasonInfo {
  year: number;
  seasonId: number;
  seasons: number[];
  seasonSiteSupport: boolean;
};

export interface TeamCore {
  team: TeamInfo;
  isTeamCoach: boolean;
  isTeamAthlete: boolean;
  isRegionAdmin: boolean;
  currentSiteSupport: boolean;
  seasonInfo: SeasonInfo;
  //teamCode: ???; 
  //teamCodes: ???; 
  jwtTeamHome: string;
};

export interface AthleteListing {
  ID: number;
  name: string;
  Gender: Gender;
}

// Actual per-athlete results

export interface AthleteBio {
  IDAthlete: number;
  SchoolID: number;
  FirstName: string;
  LastName: string;
  Gender: Gender;
  NoSearch: boolean;
  //UsatfId: null;
  //age: null;
  isClaimed: boolean;
  //PhotoUrl: null;
  Handle: string;
}

export interface Season {
  SchoolID: number;
  IDSeason: number;
  Display: string;
  Selected: boolean;
  //age: null;
}

export interface Team {
  Level: number;
  IDSchool: number;
  SchoolName: string;
  TeamCode: string;
  MascotUrl: string;
  PrefMetric: number;
  PrefConvert: number;
  Year: number;
}

export interface Meet {
  IDMeet: number;
  MeetName: string;
  EndDate: string;
}

export interface Result {
  IDResult: number;
  AthleteID: number;
  Result: string;
  SortInt: number;
  SortIntRaw: number;
  FAT: number;
  Place: string;
  PersonalBest: number;
  Round: string;
  // Wind: null;
  SeasonBest: number;
  Division: string;
  DivisionShort: string;
  SchoolID: number;
  EventID: number;
  EventTypeID: number;
  MeetID: number;
  SeasonID: number;
  MediaCount: {};
  shortCode: string;
}

export interface Event {
  Event: string;
  Type: string;
  Description: null | string;
  IDEvent: number;
  DefaultSortOrder: number;
  IDEventType: number;
  ConversionInt: number;
  PersonalEvent: boolean;
}

export interface RelayTeamMember {
  TeamID: number;
  AthleteID: number;
  Name: string;
  SortID: number;
}

export interface Athlete {
  level: number;
  athlete: AthleteBio;
  canEdit: boolean;
  hasOtherSport: boolean;
  allSeasons: Season[];
  allTeams: { [key: string]: Team };
  grades: { [key: string]: number };
  meets: { [key: string]: Meet };
  resultsTF: Result[];
  eventsTF: Event[];
  relayTeamMembers: RelayTeamMember[];
  // photos: ???[]
  // unattachedCalendars: {}
}

