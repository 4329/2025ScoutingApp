"use server"
import { sql } from "@vercel/postgres";

export async function getAllPossibilities() {
	return (await sql`SELECT match_num, possibilities.red_nums, possibilities.blue_nums FROM possibilities`).rows;
}

export async function getMatchPossibilities() {
	const out = await sql`SELECT match_num FROM possibilities`;
	return out.rows;
}

export async function getMatches() {
	return (await sql`SELECT * FROM matches`).rows;
}

export async function getTeams(matchNum: string) {
	const out = await sql`SELECT possibilities.red_nums, possibilities.blue_nums FROM possibilities WHERE match_num = ${matchNum}`;
	return out.rows;
}

export async function getData(matchNum: string, teamNum: string) {
	const out = await sql`
		SELECT * FROM matches WHERE match_num = ${matchNum} AND team_num = ${teamNum}
	`;
	return out.rows
}

export async function getNames(): Promise<[string, number]> {
	const names = (await sql`
		SELECT submitter_name FROM matches
	`).rows;
	let counts: Map<string, number> = new Map();
	for (let name of names) {
		if (name.submitter_name) counts.set(name.submitter_name as string, (counts.get(name.submitter_name as string) ?? 0) + 1);
	}

	if (counts.size > 0) return [...counts.entries()].reduce((a, b) => a[1] > b[1] ? a : b);
	else return ["", 0]
}
