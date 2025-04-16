"use server"

import { sql } from "@vercel/postgres"
import { state, stateToScore } from "./match";

function sumSection(state: state, sectionName: string): number {
	let total = 0;
	for (let key of Object.keys(state)) {
		if (!["event_name", "match_num", "team_num", "is_red", "submitter_name", "end_match_notes"].includes(key) 
			&& key.includes(sectionName) 
			&& (state as any)[key]) {

			total += parseInt(stateToScore(key, (state as any)[key]).toString());
		}
	}

	return total;
}

export async function publish(toPublish: state) {
	let sqled: any = {
		endgame: toPublish.endgame
	};
	Object.entries(toPublish)
		.filter(([k, _]) => !["endgame"].includes(k))
		.map(([k, v]) => [k, stateToScore(k, v as string | number)])
		.forEach(([k, v]) => sqled[k] = v);

	sqled.match_total = sumSection(toPublish, "");
	sqled.auto_total = sumSection(toPublish, "auto");
	sqled.teleop_total = sumSection(toPublish, "teleop");
	sqled.endgame_total = sumSection(toPublish, "endgame");

	try {
		await sql`
		INSERT INTO matches (
			event_name,
            match_num,
            team_num,
			is_red,

			auto_leave,
			auto_l1,
			auto_l2,
			auto_l3,
			auto_l4,
			auto_processor,
			auto_net,
			auto_total,

			teleop_l1,
			teleop_l2,
			teleop_l3,
			teleop_l4,
			teleop_processor,
			teleop_net,
			teleop_total,

			endgame,
			endgame_total,

			match_total,

			died,
			defense,

			submitter_name,
			end_match_notes
		)

		VALUES (
			${sqled.event_name},
            ${sqled.match_num},
            ${sqled.team_num},
			${sqled.is_red},

			${sqled.auto_leave},
			${sqled.auto_l1},
			${sqled.auto_l2},
			${sqled.auto_l3},
			${sqled.auto_l4},
			${sqled.auto_processor},
			${sqled.auto_net},
			${sqled.auto_total},

			${sqled.teleop_l1},
			${sqled.teleop_l2},
			${sqled.teleop_l3},
			${sqled.teleop_l4},
			${sqled.teleop_processor},
			${sqled.teleop_net},
			${sqled.teleop_total},

			${sqled.endgame},
			${sqled.endgame_total},

			${sqled.match_total},

			${sqled.died},
			${sqled.defense},

			${sqled.submitter_name},
			${sqled.end_match_notes}
		)
		ON CONFLICT (event_name, match_num, team_num)
		DO UPDATE SET 
			event_name = EXCLUDED.event_name,
			match_num = EXCLUDED.match_num,
            team_num = EXCLUDED.team_num,
			is_red = EXCLUDED.is_red,

			auto_leave = EXCLUDED.auto_leave,
			auto_l1 = EXCLUDED.auto_l1,
			auto_l2 = EXCLUDED.auto_l2,
			auto_l3 = EXCLUDED.auto_l3,
			auto_l4 = EXCLUDED.auto_l4,
			auto_processor = EXCLUDED.auto_processor,
			auto_net = EXCLUDED.auto_net,
			auto_total = EXCLUDED.auto_total,

			teleop_l1 = EXCLUDED.teleop_l1,
			teleop_l2 = EXCLUDED.teleop_l2,
			teleop_l3 = EXCLUDED.teleop_l3,
			teleop_l4 = EXCLUDED.teleop_l4,
			teleop_processor = EXCLUDED.teleop_processor,
			teleop_net = EXCLUDED.teleop_net,
			teleop_total = EXCLUDED.teleop_total,

			endgame = EXCLUDED.endgame,
			endgame_total = EXCLUDED.endgame_total,

			match_total = EXCLUDED.match_total,

			defense = EXCLUDED.defense,
			died = EXCLUDED.died,

			submitter_name = EXCLUDED.submitter_name,
			end_match_notes = EXCLUDED.end_match_notes
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
