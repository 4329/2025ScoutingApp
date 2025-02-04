import { number, string } from "zod";

export type teams = {
	blue_nums: number[],
	red_nums: number[]
};

export enum endgame {
	"nothing",
	"park",
	"shallow",
	"deep"
}

const endgameScores: Map<string, number> = new Map([
	["nothing", 0],
	["park", 2],
	["shallow", 6],
	["deep", 12],
]);	

const scores: Map<string, number> = new Map([
	["auto_leave", 3],
	["auto_l1", 3],
	["auto_l2", 4],
	["auto_l3", 6],
	["auto_l4", 7],
	["auto_processor", 6],
	["auto_net", 4],

	["teleop_l1", 2],
	["teleop_l2", 3],
	["teleop_l3", 4],
	["teleop_l4", 6],
	["teleop_processor", 6],
	["teleop_net", 4]
]);

export function scoreToState(key: string, value: number | string) {
	if (key == "auto_leave") return value == 3;
	if (key == "endgame") {
		for (let [k, v] of endgameScores.entries()) {
			if (v == value) return k;
		}
	}

	for (let [k, v] of scores.entries()) {
		if (k == key) {
			return parseInt(value + "") / v;
		}
	}

	return value;
}

export function stateToScore(key: string, value: number | string): number | string {
	if (key == "endgame") return endgameScores.get(value as string) ?? 0;

	if (scores.get(key)) return (scores.get(key) ?? 0) * parseInt(value + "");

	return value;
}

export type state = {
	"match_num": number,
	"team_num": string,
	"is_red": boolean,

	"auto_leave": boolean,
	"auto_l1": number,
	"auto_l2": number,
	"auto_l3": number,
	"auto_l4": number,
	"auto_processor": number,
	"auto_net": number,
	"auto_total": number,

	"teleop_l1": number,
	"teleop_l2": number,
	"teleop_l3": number,
	"teleop_l4": number,
	"teleop_processor": number,
	"teleop_net": number,
	"teleop_total": number,

	"endgame": endgame,
	"endgame_total": number,

	"match_total": number,
}
