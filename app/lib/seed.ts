"use server"

import { sql } from "@vercel/postgres";

export async function checkTables() {
	console.log("sadf")

	await sql`
		DO $$ BEGIN
			CREATE TYPE endgame_style AS ENUM ( 'nothing', 'park', 'shallow', 'deep' );
		EXCEPTION
			WHEN duplicate_object THEN null;
		END $$;
		`

    await sql`
        CREATE TABLE IF NOT EXISTS matches (
            match_num int NOT NULL,
            team_num int NOT NULL,
			is_red bool,

			auto_leave bool,
			auto_l1 int,
			auto_l2 int,
			auto_l3 int,
			auto_l4 int,
			auto_coral int,
			auto_processor int,
			auto_net int,

			teleop_l1 int,
			teleop_l2 int,
			teleop_l3 int,
			teleop_l4 int,
			teleop_coral int,
			teleop_processor int,
			teleop_net int,

			endgame endgame_style,

			submitter_name text,

            PRIMARY KEY (match_num, team_num)
        );
    `;

	console.log("sadf")
    await sql`
        CREATE TABLE IF NOT EXISTS possibilities (
            match_num int UNIQUE,
            red_nums int[3],
            blue_nums int[3]
        );
    `;

	console.log("sadf")
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

	console.log("sadf")
	await sql`
		CREATE TABLE IF NOT EXISTS admins (
			email text UNIQUE,
			password text
		);
	`;

	console.log("sadf")
}
