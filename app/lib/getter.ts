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
