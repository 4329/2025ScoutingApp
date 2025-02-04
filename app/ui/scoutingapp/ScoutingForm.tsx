import { QueryResultRow } from "@vercel/postgres";
import { publish } from "@/app/lib/publisher";
import CoolSwitch from "./CoolSwitch";
import ImageCrementor from "./ImageCrementor";
import { useFormStatus } from "react-dom";
import Modal from "react-modal"
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { ScoutingDataInputter } from "./ScoutingDataInputter";
import { state } from "@/app/lib/match";

export default function ScoutingForm({matchNum, teamNum, teamState, initialStates}: {matchNum: string, teamNum: string, teamState: QueryResultRow, initialStates: state}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [data, setData] = useState({});
	const [notification, setNotification] = useState("");
	const [gif, setGif] = useState("");


	function runNotification(text: string, gif: string) {
		setNotification(text);
		setGif(gif);
		setTimeout(() => setNotification(""), 5000);
	}

	return (
		<form onSubmit={(e) => {
			e.preventDefault()

			if (!matchNum || !teamNum) {
				if (!matchNum) runNotification("Please enter a match number","/uncooldog.gif")
				else runNotification("Please enter a team number","/uncooldog.gif");

				setData({});
				return;
			}

			const tmp: any = e.target;

			let out: any = {
				match_num: matchNum,
				team_num: teamNum,
				is_red: teamState.red_nums.includes(parseInt(teamNum))
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
							runNotification(`${tmp[i].name} has no data`, "/uncooldog.gif");
							setData({});
							return;
						} else if (tmp[i].id == "hidden") {
							break;
						}
						out[tmp[i].id] = tmp[i].value;
					break;
				}
			}

			if ((e.nativeEvent as any).submitter.name == "submit") {
				runNotification("Successfully sent data","/cooldog.gif");
				publish(out);
			} else {
				setData(out);
			}
		}}>

			<main>
				<ScoutingDataInputter initialStates={initialStates} />
			</main>
			<PendedSubmit />
			<button className="button-text relative bottom-5" type="submit" onClick={() => {
				setModalOpen(true);
			}}>Generate QR Code</button>

			<Modal isOpen={modalOpen}
				style={{
					content: {
						color: "white",
						backgroundColor: "#333"
					}
				}}>
				<div className="grid grid-cols-3 place-items-center">
					<div />
					<button className="button-text" onClick={() => setModalOpen(false)}>Close</button>
					<div />

					<div />
					<div className="p-5">
						{
							JSON.stringify(data) == "{}" ?
								<>
									<p className="text-red-500 text-4xl text-center font-extrabold">Error creating QRCode</p> 
									<a href = "/crying-tears.gif"><img src = "/crying-tears.gif"></img></a>
								</> :
								<QRCodeSVG value={JSON.stringify(data)} bgColor="white" marginSize={1} size={300} />
						}
					</div>
				</div>
			</Modal>
			{
				notification ?
					<div className="notification fixed bottom-0 right-0 z-10 text-4xl">
						{notification}
						<a href = {gif}><img src = {gif}></img></a>
					</div> :
					""
			}
		</form>
   );
}

function PendedSubmit() {
    const { pending, data } = useFormStatus();
    return <button className="button-text relative bottom-5" type="submit" name="submit" disabled={pending}>Send to Server</button>
}

