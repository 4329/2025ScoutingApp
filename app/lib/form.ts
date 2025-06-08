import { Dispatch } from "react";
import { publish } from "./publisher";

export function formAtData(e: any, eventKey: string, matchNum: string, teamNum: string, is_red: boolean) {
	const tmp: any = e.target;

	let out: any = {
		event_name: eventKey,
		match_num: matchNum,
		team_num: teamNum,
		is_red: is_red
	}

	//array.map doesn't appear to exist...
	for (let i = 0; i < tmp.length; i++) {
		switch (tmp[i].type) {
			case "checkbox":
				out[tmp[i].id] = tmp[i].checked ? 1 : 0;
			break;

			case "hidden":
            case "text":
				if (tmp[i].value == "") {
                    return tmp[i].id; // this is how I error
                } else if (tmp[i].id == "hidden") {
                    break;
                }
                out[tmp[i].id] = tmp[i].value;
                break;
            case "textarea":
                out[tmp[i].id] = tmp[i].value;
                break;
		}
	}

	return out;
}
