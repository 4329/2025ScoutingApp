"use server"
import { sql } from "@vercel/postgres";
import { rankEntry } from "./dataSource";

export async function getEvent(): Promise<string> {
	let a = await sql`SELECT event_name FROM possibilities`;
	return a.rows[0].event_name;
}

export async function getAllPossibilities() {
	return (await sql`SELECT match_num, possibilities.red_nums, possibilities.blue_nums FROM possibilities`).rows;
}

export async function getMatchPossibilities(eventKey: string) {
	const out = await sql`SELECT match_num FROM possibilities WHERE event_name = ${eventKey}`;
	return out.rows;
}

export async function getTeams(eventKey: string, matchNum: string) {
	const out = await sql`SELECT possibilities.red_nums, possibilities.blue_nums FROM possibilities WHERE match_num = ${matchNum} AND event_name = ${eventKey}`;
	return out.rows;
}

export async function getData(eventKey: string, matchNum: string, teamNum: string) {
	const out = await sql`
		SELECT * FROM matches WHERE match_num = ${matchNum} AND team_num = ${teamNum} AND event_name = ${eventKey}
	`;
	return out.rows
}

export async function getTop(myName: string | undefined): Promise<rankEntry[]> {
	let names = await sql`SELECT submitter_name FROM matches`;
	let scores: Map<string, number> = new Map();
	for (let name of names.rows) {
		if (name.submitter_name) scores.set(name.submitter_name, (scores.get(name.submitter_name) ?? 0) + 1)
	}

	let out = [...scores.entries()].sort((a, b) => b[1] - a[1]);
	let myRank = out.findIndex(x => x[0] == myName);

	let spliced = [...out].splice(0, 6);
	if (myName && myRank != -1 && !spliced.some(x => x[0] == myName)) {
		return spliced.toSpliced(5, 1).map((x, i) => {return {
			name: x[0],
			score: x[1],
			rank: i,
			me: false,
		}}).concat({
			name: out[myRank][0],
			score: out[myRank][1],
			rank: myRank,
			me: true,
		});
	} else {
		return spliced.map((x, i) => {return {
			name: x[0],
			score: x[1],
			rank: i,
			me: i == myRank,
		}});
	}
}
