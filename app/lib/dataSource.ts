import { QueryResultRow } from "@vercel/postgres";
import { teams } from "../scoutingapp/page";
import { getData, getMatchPossibilities, getTeams } from "./getter";

export interface DataSource {
    getMatchPossibilities(): Promise<QueryResultRow[]>;
    getTeams(matchNum: string): Promise<QueryResultRow[]>;
    getData(matchNum: string, teamNum: string): Promise<QueryResultRow[]>;
}

export class NetworkSource implements DataSource {
    getMatchPossibilities = getMatchPossibilities;
    getTeams = getTeams;
    getData = getData;
}

export class QRCodeSource implements DataSource {
    data: any[];

    constructor(data: any[]) {
        this.data = data;
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
}
