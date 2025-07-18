"use client"
import { useFormStatus } from "react-dom";
import NavPanel from "../ui/NavPanel";
import Dropdown from "../ui/Dropdown"
import ImageCrementor from "../ui/scoutingapp/ImageCrementor";
import { Dispatch, MutableRefObject, useEffect, useRef, useState } from "react";
import { getAllPossibilities } from "../lib/getter";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import ScoutingForm from "../ui/scoutingapp/ScoutingForm"
import { DataSource, NetworkSource, NothingSource, rankEntry } from "../lib/dataSource";
import Possibilities from "../ui/scoutingapp/Possibilities";
import { defaultState, scoreToState, state, teams } from "../lib/match";
import localFont from "next/font/local";

export default function ScoutingApp() {

	const [dataSource, setDataSource] = useState<DataSource>(new NetworkSource());
	useEffect(() => {
		addEventListener("online", () => setDataSource(new NetworkSource()));
		addEventListener("offline", () => setDataSource(new NothingSource()));
	}, [])

	const [eventKey, setEventKey] = useState("");
	useEffect(() => {
		dataSource.getEvent().then(setEventKey).catch(() => setDataSource(new NothingSource()));
	}, [dataSource]);

	const [matchState, setMatchState] = useState<QueryResultRow[]>([]);
	const [matchNum, setMatchNum] = useState<string>("");
	useEffect(() => {
		if (eventKey == "") return;

		dataSource.getMatchPossibilities(eventKey).then((x: QueryResultRow[]) => {
			setMatchState(x.sort((a, b) => a.match_num - b.match_num));
			setMatchNum("");
		});
	}, [eventKey, dataSource]);

	const [teamState, setTeamState] = useState<teams>({blue_nums: [], red_nums: []});
	useEffect(() => {
		if (matchNum == "" || eventKey == "") return;
		dataSource.getTeams(eventKey, matchNum).then((x: QueryResultRow[]) => {
			setTeamState(x[0] as teams);
		});
	}, [eventKey, matchNum]);
	const [scouterid, setScouterid] = useState<number | undefined>();
    const [teamNum, setTeamNum] = useState<string>("");

	useEffect(() => {
		if (scouterid)
			setTeamNum(teamState.blue_nums.concat(teamState.red_nums)[scouterid] + "");
	}, [scouterid, teamState])

	const [initial, setInitial] = useState<state>({} as state);

	const [name, setName] = useState<string>();


	const [top, setTop] = useState<rankEntry[]>([])
	useEffect(() => {
        const doTop = () => dataSource.getTop(name).then(setTop).catch(() => setDataSource(new NothingSource()));
        doTop();
		const interval = setInterval(() => {
            doTop();
		}, 10000);

		return () => clearInterval(interval);
	}, [name]);

	useEffect(() => {
		if (eventKey && matchNum && teamNum) {
			dataSource.getData(eventKey, matchNum, teamNum).then(x => {
				if (x && x[0]) {
					Object.keys(x[0])
						.filter(y => !["match_num", "team_num", "is_red", "defense", "died"].includes(y))
						.forEach(y => x[0][y] = scoreToState(y, x[0][y]));
					setInitial(x[0] as state);
				} else {
					setInitial(defaultState as unknown as state);
					setTimeout(() => setInitial({} as state), 20);
				}
			})
		}
	}, [teamNum, matchNum]);

	return (
        <>
			<header>
				<NavPanel />
				<h1 className="font-bold">4329 Scouting App</h1>
			</header>
			<nav className="selection-panel sticky top-0">
				<ul>
					<li><a href="#auto">Auto</a></li>
					<li><a href="#teleop">Tele-op</a></li>
					<li><a href="#endgame">Endgame</a></li>
				</ul>
			</nav>

			<Possibilities eventKey={eventKey} setDataSource={setDataSource} dataSource={dataSource} />
			
			{/* Dropdown Menus */}
			<div className="dropdown-container p-2 flex">
				<div className="flex flex-col">
					<div className="title mx-10">Match Num</div>
					<Dropdown name="Match Number" className="w-[300px]" setValue={setMatchNum}>
						{matchState.map((x: QueryResultRow) => <option value={x.match_num} key={x.match_num}>{x.match_num}</option>)}
					</Dropdown>
				</div>

				<div className="flex flex-col">
					<div className="title mx-10">Scouter Id</div>
					<div className="flex items-center">
						<Dropdown name="Scouter Id" className="w-[300px]" setValue={setScouterid}>
							{[0, 1, 2, 3, 4, 5].map((_: number, i: number) => {
								return <option value={i} key={i}>{i + 1}</option>
							})}
						</Dropdown>
						{scouterid && teamNum != "undefined" &&
							<div className="title !mt-9">{teamNum}</div>
						}
					</div>
				</div>
			</div>
			<ScoutingForm eventKey={eventKey} matchNum={matchNum} teamNum={teamNum} teamState={teamState} initialStates={initial} top={top} setName={setName} />
        </>
    );

}

