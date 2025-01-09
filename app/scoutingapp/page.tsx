"use client"
import { useFormStatus } from "react-dom";
import NavPanel from "../ui/NavPanel";
import Dropdown from "../ui/Dropdown"
import ImageCrementor from "../ui/scoutingapp/ImageCrementor";
import { Dispatch, MutableRefObject, useEffect, useRef, useState } from "react";
import { getAllPossibilities } from "../lib/getter";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import ScoutingForm from "../ui/scoutingapp/ScoutingForm"
import Modal from "react-modal";
import { QRCodeSVG } from "qrcode.react";
import { Scanner } from "@yudiel/react-qr-scanner";
import useNetworkStatus from "../lib/useNetworkStatus";
import { DataSource, NetworkSource, NothingSource, QRCodeSource } from "../lib/dataSource";
import Possibilities from "../ui/scoutingapp/Possibilities";

export type teams = {
	blue_nums: number[],
	red_nums: number[]
};

export type state = {
	"leave": boolean,
	"auto_l1": number,
	"auto_l2": number,
	"auto_l3": number,
	"auto_l4": number,
	"auto_processor": number,
	"auto_net": number,

	"teleop_l1": number,
	"teleop_l2": number,
	"teleop_l3": number,
	"teleop_l4": number,
	"teleop_processor": number,
	"teleop_net": number,

	"park": boolean,
	"deep_cage": boolean,
	"shallow_cage": boolean,
}

export default function ScoutingApp() {
	const [dataSource, setDataSource] = useState<DataSource>(new NetworkSource());
	useEffect(() => {
		addEventListener("online", () => setDataSource(new NetworkSource()));
		addEventListener("offline", () => setDataSource(new NothingSource()));
	}, [])

	const [matchState, setMatchState] = useState<QueryResultRow[]>([]);
	useEffect(() => {
		dataSource.getMatchPossibilities().then((x: QueryResultRow[]) => {
			setMatchState(x.sort((a, b) => a.match_num - b.match_num));
		});
	}, []);
	const [matchNum, setMatchNum] = useState<string>("");

	const [teamState, setTeamState] = useState<teams>({blue_nums: [], red_nums: []});
	useEffect(() => {
		if (matchNum == "") return;
		dataSource.getTeams(matchNum).then((x: QueryResultRow[]) => {
			setTeamState(x[0] as teams);
		});
	}, [matchNum]);
    const [teamNum, setTeamNum] = useState<string>("");


	//less ugly way to do this?
	const resetTeamNum = useRef(false);
	useEffect(() => {
		resetTeamNum.current = true
	}, [matchNum]);

	const [initial, setInitial] = useState<state>({} as state);
	useEffect(() => {
		if (teamNum) {
			dataSource.getData(matchNum, teamNum).then(x => {
				if (x && x[0]) setInitial(x[0] as state);
				else setInitial({} as state);
			})
		}
	}, [teamNum]);

	return (
        <>
			<header>
				<h1>4329 Scouting App</h1>
				<NavPanel />
			</header>
			<nav className="selection-panel sticky top-0">
				<ul>
					<li><a href="#auto">Auto</a></li>
					<li><a href="#teleop">Tele-op</a></li>
					<li><a href="#endgame">Endgame</a></li>
				</ul>
			</nav>

			<Possibilities setDataSource={setDataSource} />
			
			{/* Dropdown Menus */}
			<div className="dropdown-container p-2 flex">
				<Dropdown name="Match Number" setMatchNum={setMatchNum}>
					{matchState.map((x: QueryResultRow) => <option value={x.match_num} key={x.match_num}>{x.match_num}</option>)}
				</Dropdown>

				<Dropdown name="Team Number" setMatchNum={setTeamNum} ack={resetTeamNum}>
					{teamState.blue_nums.concat(teamState.red_nums).map((x: number) => {
						return <option value={x} key={x}>{x}</option>
					})}
				</Dropdown>
			</div>
			<ScoutingForm matchNum={matchNum} teamNum={teamNum} teamState={teamState} initialStates={initial}/>
        </>
    );

}

