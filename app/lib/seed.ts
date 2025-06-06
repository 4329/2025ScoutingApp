"use server"

import bcrypt from "bcrypt"
import { sql } from "@vercel/postgres";

export async function checkTables() {
	await sql`
		DO $$ BEGIN
			CREATE TYPE endgame_style AS ENUM ( 'nothing', 'park', 'shallow', 'deep' );
		EXCEPTION
			WHEN duplicate_object THEN null;
		END $$;
		`

    await sql`
        CREATE TABLE IF NOT EXISTS matches (
			event_name text NOT NULL,
            match_num int NOT NULL,
            team_num text NOT NULL,
			is_red bool,

			auto_leave int,
			auto_l1 int,
			auto_l2 int,
			auto_l3 int,
			auto_l4 int,
			auto_processor int,
			auto_net int,
			auto_total int,

			teleop_l1 int,
			teleop_l2 int,
			teleop_l3 int,
			teleop_l4 int,
			teleop_processor int,
			teleop_net int,
			teleop_total int,

			endgame endgame_style,
			endgame_total int,

			match_total int,

			defense bool,
			died bool,

			submitter_name text,
			end_match_notes text,

            PRIMARY KEY (event_name, match_num, team_num)
        );
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS possibilities (
			event_name text NOT NULL,
            match_num int NOT NULL,
            red_nums int[3],
            blue_nums int[3],

			PRIMARY KEY (event_name, match_num)
        );
    `;

    await sql `
        CREATE TABLE IF NOT EXISTS teams (
            team_num int UNIQUE,
			team_name text,
			team_location text,
			drive_type text,
			ranking_points int,
			coop_points int
        );
    `;

	await sql`
		CREATE TABLE IF NOT EXISTS admins (
			email text UNIQUE,
			password text
		);
	`;

    const admincount = (await sql`SELECT * FROM admins`).rowCount
	if (!admincount) {
    	bcrypt.hash('0123', 12, async (error, hash) => {
        	console.log(hash);
			await sql`INSERT INTO admins (email, password) VALUES ('admin@admin', ${hash})`
    	});
	}
}
