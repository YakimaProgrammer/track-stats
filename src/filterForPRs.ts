// Sorts through Athletic.net `Result`s and returns a list of all PRs

import { Result, PR } from "./types";

const invalid = new Set(["NT", "SCR", "ND"]);

export function filterForPRs(results: Result[]) {
  let PRs: PR[] = [];
  let best: number = Infinity;
  let previous: string = "";
  
  for (let result of results) {
    if (!invalid.has(result.Result)) {
      //Athletic.net's `Result.Result` has many, many different formats which makes parsing difficult
      //Interesting `Result.SortInt` can replace the need for parsing. For distance runners, it is the time ran in milliseconds.
      //For throwers, it is a constant minus the distance they threw in milliinches.

      if (result.SortInt < best) {
        PRs.push({
          meet: result.MeetID,
          result: result.Result,
          previous
        });

        best = result.SortInt;
        previous = result.Result;
      }
    }
  }

  //The first "PR" will always be the first time you do something
  PRs.shift();
  return PRs;
};