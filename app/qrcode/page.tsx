"use client"
import NavPanel from "../ui/NavPanel";
import { ScoutingDataInputter } from "../ui/scoutingapp/ScoutingDataInputter";
import Dropdown from "../ui/Dropdown";
import QRModal from "../ui/ModalScanner";
import WeirdDataInputter from "../ui/qrcode/weirdDataInputter";
import { useRef, useState } from "react";
import { state } from "../lib/match";
import { publish } from "../lib/publisher";
import { formAtData } from "../lib/form";


export default function Qrcode() {
	const [showQR, setShowQR] = useState(false);
	const [qrData, setQrData] = useState<any>({});

	const [matchState, setMatchState] = useState<string>("");
	const [teamState, setTeamState] = useState<string>("");

	const rerender = useRef(false);
	const rerender2 = useRef(false);

	const [notification, setNotification] = useState("");
	const [gif, setGif] = useState("");

	function runNotification(text: string, gif: string) {
		setNotification(text);
		setGif(gif);
		setTimeout(() => setNotification(""), 5000);
	}

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
				<Dropdown name="Match Number" setMatchNum={setMatchState} rerender={rerender}>
					{Object.keys(qrData).map(x => <option value={x} key={x}>{x}</option>)}
				</Dropdown>

				<Dropdown name="Team Number" setMatchNum={setTeamState} rerender={rerender2}>
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

						rerender.current = true;
						rerender2.current = true;
						setQrData(newData);
					}}>Delete Match</button>
				</div>
			</div>

			<main>
				<form onSubmit={(e) => {
					e.preventDefault();

					if (!matchState || !teamState) {
						if (!matchState) runNotification("Please enter a match number","/uncooldog.gif")
						else runNotification("Please enter a team number","/uncooldog.gif");

						return;
					}

					let out = formAtData(e, matchState, teamState, qrData[matchState][teamState].is_red);
					let newData = {...qrData};
					newData[matchState][teamState] = out;
					setQrData(newData);
				}}>

					<ScoutingDataInputter initialStates={qrData[matchState] && qrData[matchState][teamState] ?
						qrData[matchState][teamState] :
						({} as state)}/>

					<button className="button-text" type="submit" name="submit">Update (not upload) this match specifically</button>
					<button className="button-text" type="button" onClick={() => {
						Object.values(qrData).map(x => Object.values(x as any).map((x: any) => {
							x.auto_leave = x.auto_leave ? 1 : 0;
							publish(x as state)
						}));
					}}>Upload</button>
				</form>
			</main>
			{
				notification ?
					<div className="notification fixed bottom-0 right-0 z-10 text-4xl">
						{notification}
						<a href = {gif}><img src = {gif}></img></a>
					</div> :
					""
			}
		</>
	);

	function parseData(result: string) {
		const newData = {...qrData};
		const data = JSON.parse(result);

		newData[data.match_num] ??= {};
		newData[data.match_num][data.team_num] = data;

		setQrData(newData);
	}
}
