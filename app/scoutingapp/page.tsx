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
import { state, teams } from "../lib/match";

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
	const [scouterid, setScouterid] = useState<number | undefined>();
    const [teamNum, setTeamNum] = useState<string>("");

	useEffect(() => {
		if (scouterid)
			setTeamNum(teamState.blue_nums.concat(teamState.red_nums)[scouterid] + "");
	}, [scouterid, matchNum])

	const [initial, setInitial] = useState<state>({} as state);
	useEffect(() => {
		if (matchNum && teamNum) {
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
				<div className="flex flex-col">
					<div className="title mx-10">Match Num</div>
					<Dropdown name="Match Number" setMatchNum={setMatchNum}>
						{matchState.map((x: QueryResultRow) => <option value={x.match_num} key={x.match_num}>{x.match_num}</option>)}
					</Dropdown>
				</div>

				<div className="flex flex-col">
					<div className="title mx-10">Scouter Id</div>
					<div className="flex items-center">
						<Dropdown name="Scouter Id" setMatchNum={setScouterid}>
							{[0, 1, 2, 3, 4, 5].map((_: number, i: number) => {
								return <option value={i} key={i}>{i + 1}</option>
							})}
						</Dropdown>
						{scouterid ?
							<div className="title !mt-9">{teamState.blue_nums.concat(teamState.red_nums)[scouterid]}</div>
								: <></>
						}
					</div>
				</div>
			</div>
			<ScoutingForm matchNum={matchNum} teamNum={teamNum} teamState={teamState} initialStates={initial}/>
        </>
    );

}

