"use client"
import NavPanel from "../ui/NavPanel";
import { ScoutingDataInputter } from "../ui/scoutingapp/ScoutingDataInputter";
import { state } from "../scoutingapp/page";
import Dropdown from "../ui/Dropdown";
import QRModal from "../ui/ModalScanner";
import WeirdDataInputter from "../ui/qrcode/weirdDataInputter";
import { useEffect, useRef, useState } from "react";
import { publish } from "../lib/publisher";
import { match } from "assert";


export default function Qrcode() {
	const [showQR, setShowQR] = useState(false);
	const [qrData, setQrData] = useState<any>({});

	const [matchState, setMatchState] = useState<string>("");
	const [teamState, setTeamState] = useState<string>("");

	const ack = useRef(false);
	const ack2 = useRef(false);

	const keys = [
		"is_red",
		"leave",
		"auto_l1",
		"auto_l2",
		"auto_l3",
		"auto_l4",
		"auto_processor",
		"auto_net",

		"teleop_l1",
		"teleop_l2",
		"teleop_l3",
		"teleop_l4",
		"teleop_processor",
		"teleop_net",

		"park",
		"deep_cage",
		"shallow_cage",
	];

	return (
		<>
			<NavPanel />
			<QRModal isOpen={showQR} close={() => setShowQR(false)} onScan={(result) => {
				parseData(result[0].rawValue);
				setShowQR(false);
			}}/>

			<div className="flex">
				<button className="button-text !mt-6" onClick={() => setShowQR(true)}>Scan Code</button>
				<WeirdDataInputter onData={parseData} />
			</div>

			{/* Dropdown Menus */}
			<div className="dropdown-container p-2 flex">
				<Dropdown name="Match Number" setMatchNum={setMatchState} ack={ack}>
					{Object.keys(qrData).map(x => <option value={x} key={x}>{x}</option>)}
				</Dropdown>

				<Dropdown name="Team Number" setMatchNum={setTeamState} ack={ack2}>
					{Object.keys(qrData[matchState] ?? {}).map((x: string) => {
						return <option value={x} key={x}>{x}</option>
					})}
				</Dropdown>
				<div className="mt-4">
					<button className="button-text" onClick={() => {
						if (matchState == "" || teamState == "") return;
						const newData = {...qrData};

						delete newData[matchState][teamState];
						if (Object.keys(newData[matchState]).length == 0) {
							delete newData[matchState];
						}

						ack.current = true;
						ack2.current = true;
						setQrData(newData);
					}}>Delete Match</button>
				</div>
			</div>

			<main>
				<ScoutingDataInputter initialStates={
					qrData[matchState] && qrData[matchState][teamState] ?
						qrData[matchState][teamState] :
						({} as state)
				}/>
			</main>
			<button className="button-text" onClick={() => Object.keys(qrData).map((x: any) => Object.keys(qrData[x]).map((y: any) => {
				let nonsense = keys.map(k => {
					switch (qrData[x][y][k]) {
						case true: return "TRUE";
						case false: return "FALSE";
						case undefined: return "undefined";
						default: return qrData[x][y][k];
					}
				});
				console.log([x, y].concat(nonsense));
				publish([x, y].concat(nonsense).concat("undefined"));
			}))}>Upload</button>
		</>
	);

	function parseData(result: string) {
		const data = JSON.parse(result);
		let newData = {...qrData};
		newData[data[0]] = qrData[data[0]] ?? {};

		let out: any = {};
		keys.map((x, i) => out[x] = data[i + 2]);
		newData[data[0]][data[1]] = out;

		setQrData(newData);
		console.log(newData);
	}
}
