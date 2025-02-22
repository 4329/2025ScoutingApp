"use server"
import { sql } from "@vercel/postgres";

export async function getEvent(): Promise<string> {
	let a = await sql`SELECT event_name FROM possibilities`;
	return a.rows[0].event_name;
}

export async function getAllPossibilities() {
	return (await sql`SELECT match_num, possibilities.red_nums, possibilities.blue_nums FROM possibilities`).rows;
}

export async function getMatches(eventKey: string) {
	return (await sql`SELECT * FROM matches WHERE event_name = ${eventKey}`).rows;
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
