import { QueryResultRow } from "@vercel/postgres";
import { getData, getEvent, getMatchPossibilities, getTeams, getTop } from "./getter";

export type rankEntry = {
	name: string,
	score: number,
	rank: number,
	me: boolean,
}

export interface DataSource {
	getEvent(): Promise<string>;
    getMatchPossibilities(eventKey: string): Promise<QueryResultRow[]>;
    getTeams(eventKey: string, matchNum: string): Promise<QueryResultRow[]>;
    getData(eventKey: string, matchNum: string, teamNum: string): Promise<QueryResultRow[]>;
	getTop(myName: string | undefined): Promise<rankEntry[]>;
}

export class NetworkSource implements DataSource {
	getEvent = getEvent;
    getMatchPossibilities = getMatchPossibilities;
    getTeams = getTeams;
    getData = getData;
	getTop = getTop;
}

export class QRCodeSource implements DataSource {
    data: any[];

    constructor(data: any[]) {
        this.data = data;
    }

	addData(data: any[]) {
		Object.entries(data).map(([k, v]) => this.data[k as any] = v);
	}

    getMatchPossibilities() {
        return new Promise<QueryResultRow[]>((res, _) => res(this.data.map(x => {return {match_num: x.match_num}})));
    }

    getTeams(matchNum: string){
        return new Promise<QueryResultRow[]>((res, _) => {
            const tmp = this.data.filter(x => x.match_num == matchNum)[0];
            res([{blue_nums: tmp.blue_nums, red_nums: tmp.red_nums}]);
        });
    }

    getData(_matchNum: string, _teamNum: string) {
        return new Promise<QueryResultRow[]>((res, _) => res([]));
    }

	getEvent() {
		return new Promise<string>((res, _) => res(this.data[0].event_name));
	}

	getTop() {
		return new Promise<rankEntry[]>((res, _) => res([]));
	}
}

export class NothingSource implements DataSource {
    getMatchPossibilities(): Promise<QueryResultRow[]> {
        return new Promise<QueryResultRow[]>((res, _) => res([]));
    }

    getTeams(_matchNum: string) {
        return new Promise<QueryResultRow[]>((res, _) => res([{blue_nums: [], red_nums: []}]));
    }

    getData(_matchNum: string, _teamNum: string) {
        return new Promise<QueryResultRow[]>((res, _) => res([]));
    }

	getEvent() {
		return new Promise<string>((res, _) => res(""));
	}

	getTop() {
		return new Promise<rankEntry[]>((res, _) => res([]));
	}
}
