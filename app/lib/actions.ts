"use server"

import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"
import { getTBAMatchData } from "./theBlueAlliance";
import { signIn } from "@/auth";
import { SignInOptions } from "next-auth/react";
import { AuthError } from "next-auth";
import { checkTables } from "./seed";

export async function populatePossibilitiesWithTBA(eventkey: string) {
	await sql`DROP TABLE possibilities`;
	await checkTables();


    const data = await getTBAMatchData(eventkey);
    data.forEach(async (x) => {
		if (x.comp_level != "qm") return;

        await sql`
            INSERT INTO possibilities (event_name, match_num, blue_nums, red_nums)
            VALUES (
				${eventkey},
				${x.number}, 
				ARRAY[${x.teams[0]}, ${x.teams[1]}, ${x.teams[2]}]::int[],
				ARRAY[${x.teams[3]}, ${x.teams[4]}, ${x.teams[5]}]::int[])
            ON CONFLICT (event_name, match_num)
                DO UPDATE SET red_nums = EXCLUDED.red_nums, blue_nums = EXCLUDED.blue_nums
       `;
    });
}

export async function getAdmin(email: string) {
    let data = await sql`SELECT * FROM admins WHERE email=${email}`;
    return data.rows[0];
}

export async function createAdmin(email: string, password: string) {
    const defaultAdmin = (await sql`
        SELECT * FROM admins WHERE email = 'admin@admin'
    `).rowCount;

    if (defaultAdmin) {
        await sql`DELETE FROM admins WHERE email = 'admin@admin'`
    }

    bcrypt.hash(password, 12, async (_error, hash) => {
        await sql`
            INSERT INTO admins (email, password)
            VALUES (${email}, ${hash})
        `;
    });
}

export async function authenticate(_state: boolean, initialState: void | undefined) {
    try {
        await signIn("credentials", initialState as unknown as SignInOptions);
        return false;
    } catch (err) {
        if (err instanceof AuthError) return true;
        throw err;
    }
}
