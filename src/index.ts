import { year, teamId, meets } from "./config.json";
import { Athlete, AthleteListing, TeamCore, PR } from "./types";
import { filterForPRs } from "./filterForPRs";
import { fetchDataWithCache, groupBy, mapFrom, mapMap } from "./helpers";
import { EVENTS, isValidEventID } from "./events";

class PRTracker {
  //Event => Name => PRs
  private prdata: Map<string, Map<string, PR[]>> = new Map();

  // Meet ID => Meet Name
  private meets: Map<number, string> = new Map();

  public addPRs(event: string, name: string, prs: PR[]): void {
    const namesMap = this.prdata.get(event) ?? new Map<string, PR[]>();
    this.prdata.set(event, namesMap);

    const athletePRs = namesMap.get(name) ?? [];
    namesMap.set(name, athletePRs.concat(prs));
  }

  public addMeets(meets: Map<number, string>): void {
    for (let [meetId, name] of meets.entries()) {
      this.meets.set(meetId, name);
    }
  }

  public displayByEvent(): void {
    for (let [event, athletes] of this.prdata.entries()) {
      console.log(`======== ${event} ========`);
      for (let [name, prs] of athletes.entries()) {
        console.log(name);
        for (let pr of prs) {
          console.log(`${this.meets.get(pr.meet)} - ${pr.result} - Previous: ${pr.previous}`);
        }
        console.log();
      }
      console.log(); //I kinda like the double space
    }
  }

  public getNumPRs(): number {
    const names = new Set<string>();
    for (let event of this.prdata.values()) {
      for (let name of event.keys()) {
        names.add(name);
      }
    }

    return names.size;
  }
}

function prWasSetAtMeet(prsByEvent: Map<number, PR[]>) {
  for (let prs of prsByEvent.values()) {
    for (let pr of prs) {
      if (meets.includes(pr.meet)) {
        return true;
      }
    }
  }

  return false;
}

async function getData() {
  const teamCore: TeamCore = await fetchDataWithCache(`https://www.athletic.net/api/v1/TeamHome/GetTeamCore?teamId=${teamId}&sport=tfo&year=${year}`);
  const listings: AthleteListing[] = await fetchDataWithCache(`https://www.athletic.net/api/v1/TeamHome/GetAthletes?seasonId=${year}`, { anettokens: teamCore.jwtTeamHome });

  const data = new PRTracker();

  for (let listing of listings) {
    const athlete: Athlete = await fetchDataWithCache(`https://www.athletic.net/api/v1/AthleteBio/GetAthleteBioData?athleteId=${listing.ID}&sport=tf&level=${teamCore.team.Level}`);

    const resultsByEvent = groupBy(Object.values(athlete.resultsTF), r => r.EventID);
    const PRsByEvent = mapMap(resultsByEvent, filterForPRs);

    data.addMeets(mapFrom(Object.values(athlete.meets), "IDMeet", "MeetName"));

    //If a PR was set at these meets
    if (prWasSetAtMeet(PRsByEvent)) {
      for (let [eventId, PRs] of PRsByEvent.entries()) {
        if (PRs.some(pr => meets.includes(pr.meet))) {
          if (isValidEventID(eventId)) {
            data.addPRs(EVENTS[eventId], `${athlete.athlete.FirstName} ${athlete.athlete.LastName}`, PRs.filter(pr => meets.includes(pr.meet)));
          } else {
            throw new Error(`Unknown event id: ${eventId}!`);
          }
        }
      }
    }
  }

  data.displayByEvent();
  console.log(`There were a total of ${data.getNumPRs()} PRs at the last meet!`);
}

getData();