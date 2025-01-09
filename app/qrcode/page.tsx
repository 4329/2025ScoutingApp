"use client"
import { Scanner } from "@yudiel/react-qr-scanner"
import { useEffect, useRef, useState } from "react";
import NavPanel from "../ui/NavPanel";
import Modal from "react-modal"
import ScoutingForm from "../ui/scoutingapp/ScoutingForm";
import { ScoutingDataInputter } from "../ui/scoutingapp/ScoutingDataInputter";
import { state } from "../scoutingapp/page";
import Dropdown from "../ui/Dropdown";
import QRModal from "../ui/ModalScanner";


export default function Qrcode() {
	const [showQR, setShowQR] = useState(false);
	const qrData = useRef<any>({});

	const [matchState, setMatchState] = useState<string>("");
	const [teamState, setTeamState] = useState<string>("");

	return (
		<>
			<NavPanel />
			<button className="button-text" onClick={() => setShowQR(true)}>Scan Code</button>
			<QRModal isOpen={showQR} close={() => setShowQR(false)} onScan={(result) => {
					const data = JSON.parse(result[0].rawValue);
					qrData.current[data[0]] = qrData.current[data[0]] ?? {};
					qrData.current[data[0]][data[1]] = {
						"auto_leave": data[3] == "TRUE",
						"auto_speaker": data[4],
						"auto_amp": data[5],
						"passing": data[6] == "TRUE",
						"teleop_speaker": data[7],
						"teleop_amp": data[8],
						"park": data[9] == "TRUE",
						"onstage": data[10] == "TRUE",
						"spotlit": data[11] == "TRUE",
						"harmony": data[12] == "TRUE",
						"trap": data[13]
					};
					console.log(qrData.current);
					setShowQR(false);
				}}/>

			{/* Dropdown Menus */}
			<div className="dropdown-container p-2 flex">
				<Dropdown name="Match Number" setMatchNum={setMatchState}>
					{Object.keys(qrData.current).map(x => <option value={x} key={x}>{x}</option>)}
				</Dropdown>

				<Dropdown name="Team Number" setMatchNum={setTeamState}>
					{Object.keys(qrData.current[matchState] ?? {}).map((x: string) => {
						return <option value={x} key={x}>{x}</option>
					})}
				</Dropdown>
			</div>

			<main>
				<ScoutingDataInputter initialStates={
					qrData.current[matchState] && qrData.current[matchState][teamState] ?
						qrData.current[matchState][teamState] :
						({} as state)
				}/>
			</main>
		</>
	);
}
