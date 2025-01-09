"use server"

import { sql } from "@vercel/postgres"

export async function publish(toPublish: string[]) {
	let data = toPublish.reduce((a, b) => a + ", " + b);
	console.log("data: " + data);
	//hate this everything is the worst
	try {
		await sql`
		INSERT INTO matches (
            match_num,
            team_num,
			is_red,

			auto_leave,
			auto_l1,
			auto_l2,
			auto_l3,
			auto_l4,
			auto_coral,
			auto_processor,
			auto_net,

			teleop_l1,
			teleop_l2,
			teleop_l3,
			teleop_l4,
			teleop_coral,
			teleop_processor,
			teleop_net,

			endgame
		)
		VALUES (
			${toPublish[0]},
			${toPublish[1]},
			${toPublish[2]},
			${toPublish[3]},
			${toPublish[4]},
			${toPublish[5]},
			${toPublish[6]},
			${toPublish[7]},
			${toPublish[8]},
			${toPublish[9]},
			${toPublish[10]},
			${toPublish[11]},
			${toPublish[12]},
			${toPublish[13]},
			${toPublish[14]},
			${toPublish[15]},
			${toPublish[16]},
			${toPublish[17]},
			${toPublish[18]}
		)
		ON CONFLICT (match_num, team_num)
		DO UPDATE SET 
			match_num = EXCLUDED.match_num,
            team_num = EXCLUDED.team_num,
			is_red = EXCLUDED.is_red,

			auto_leave = EXCLUDED.auto_leave,
			auto_l1 = EXCLUDED.auto_l1,
			auto_l2 = EXCLUDED.auto_l2,
			auto_l3 = EXCLUDED.auto_l3,
			auto_l4 = EXCLUDED.auto_l4,
			auto_coral = EXCLUDED.auto_coral,
			auto_processor = EXCLUDED.auto_processor,
			auto_net = EXCLUDED.auto_net,

			teleop_l1 = EXCLUDED.teleop_l1,
			teleop_l2 = EXCLUDED.teleop_l2,
			teleop_l3 = EXCLUDED.teleop_l3,
			teleop_l4 = EXCLUDED.teleop_l4,
			teleop_coral = EXCLUDED.teleop_coral,
			teleop_processor = EXCLUDED.teleop_processor,
			teleop_net = EXCLUDED.teleop_net,

			endgame = EXCLUDED.endgame
		`;
	} catch (err) {
		console.log(JSON.stringify(err));
		throw err;
   }
}

export async function publishTeams(toPublish: string[]) {
	await sql`
		INSERT INTO teams (
			team_num,
			team_name,
			team_location,
			drive_type,
			ranking_points,
			coop_point
		)
		VALUES (
			${toPublish[0]},
			${toPublish[1]},
			${toPublish[2]},
			${toPublish[3]},
			${toPublish[4]},
			${toPublish[5]}
		)
		ON CONFLICT (team_num)
		DO UPDATE SET team_num = EXCLUDED.team_num,
			team_name = EXCLUDED.team_name,
			team_location = EXCLUDED.team_location,
			drive_type = EXCLUDED.drive_type,
			ranking_points = EXCLUDED.ranking_points,
			coop_point = EXCLUDED.coop_point
	`;
}
