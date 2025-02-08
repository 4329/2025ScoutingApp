"use server"

import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"
import { getTBAEventTeams, getTBAMatchData } from "./theBlueAlliance";
import { getMatches, getMatchPossibilities } from "./getter";
import { signIn } from "@/auth";
import { SignInOptions } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

export async function populatePossibilitiesWithTBA(eventkey: string) {
    const data = await getTBAMatchData(eventkey);
    data.forEach(async (x) => {
		if (x.comp_level != "qm") return;

        await sql`
            INSERT INTO possibilities (match_num, blue_nums, red_nums)
            VALUES (${x.number}, 
					ARRAY[${x.teams[0]}, ${x.teams[1]}, ${x.teams[2]}]::int[],
					ARRAY[${x.teams[3]}, ${x.teams[4]}, ${x.teams[5]}]::int[])
            ON CONFLICT (match_num)
                DO UPDATE SET red_nums = EXCLUDED.red_nums, blue_nums = EXCLUDED.blue_nums
       `;
    });
}

export async function populateTeamsWithTBA(eventKey: string) {
    const data = await getTBAEventTeams(eventKey);
	console.log(data);
    data.forEach(async (x) => {
        await sql`
            INSERT INTO teams (team_num)
            VALUES (${x.team_number})
        `;
    })
}

export async function getAdmin(email: string) {
	try {
		let data = await sql`SELECT * FROM admins WHERE email=${email}`;
		return data.rows[0];
	} catch (err) {
		console.log("failed to find admin");
		throw err;
	}
}

export async function createAdmin(email: string, password: string) {
    bcrypt.hash(password, 12, async (error, hash) => {
        await sql`
            INSERT INTO admins (email, password)
            VALUES (${email}, ${hash})
        `;
    });
}

export type team = {
    auto_speaker: string
};

const points: any = {
    auto_leave: 2,
	auto_processor: 0,
}

export async function getTeams() {
    const data = await getMatches();
    const teamData: any = { };
    data.forEach((match) => {
        Object.entries(match)
            .filter(x => !["team_num", "match_num", "is_red", "submitter_name"].includes(x[0]))
            .forEach(x => {
                teamData[match.team_num] ??= { total_score: 0, num_matches: 0 };
                teamData[match.team_num][x[0]] = (teamData[match.team_num][x[0]] ?? 0) + (x[1] + 0);
                teamData[match.team_num]["total_score"] += (x[1] + 0) * (points[x[0]] ?? 1);
				if (x[0] == "trap") {
					teamData[match.team_num]["num_matches"]++;
					teamData[match.team_num]["average_score"] = teamData[match.team_num]["total_score"] / teamData[match.team_num]["num_matches"]
				}
            });
    });
    return teamData;
}

export async function authenticate(state: boolean , initialState: void | undefined) {
    try {
        await signIn("credentials", initialState as unknown as SignInOptions);
        return false;
    } catch (err) {
        console.error(err);
        if (err instanceof AuthError) return true;
        throw err;
    }
}
