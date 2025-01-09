import { state } from "@/app/scoutingapp/page";
import CoolSwitch from "./CoolSwitch";
import ImageCrementor from "./ImageCrementor";
import Image from "next/image";
import { Dispatch, MutableRefObject, useState } from "react";
import Dropdown from "../Dropdown";
import Coralinator from "./Coralinator";

export function ScoutingDataInputter({initialStates}: {initialStates: state}) {
	const [endgame, setEndgame] = useState("");

	return (
		<>
			<section className="scroll-mt-6" id="auto">
				<h2>Auto</h2>
				<CoolSwitch className="p-10" title="Leave" initial={initialStates["leave"]} />
				<Coralinator title="Auto Coral" scores={[3, 4, 6, 7]} />	
				<ImageCrementor className="p-10" scale={6} src="/processor.jpg" title="Auto Processor" initial={initialStates["auto_processor"]} />
				<ImageCrementor className="p-10" scale={4} src="/net.jpg" title="Auto Net" initial={initialStates["auto_net"]} />
			</section>

			<section className="scroll-mt-6" id="teleop">
				<h2>Teleop</h2>
				<Coralinator title="Teleop Coral" scores={[2, 3, 4, 5]} />	
				<ImageCrementor className="p-10" scale={6} src="/processor.jpg" title="Teleop Processor" initial={initialStates["teleop_processor"]} />
				<ImageCrementor className="p-10" scale={4} src="/net.jpg" title="Teleop Net" initial={initialStates["teleop_net"]} />
			</section>

			<section className="scroll-mt-6" id="endgame">
				<h2>Endgame</h2>

				<div className="title mx-10">Climb</div>
				<Dropdown setMatchNum={setEndgame} className="relative -top-28 m-7" name="Select Option">
					<option value="nothing">Nothing</option>
					<option value="park">Park</option>
					<option value="deep">Deep Cage</option>
					<option value="shallow">Shallow Cage</option>
				</Dropdown>
				<input type="hidden" value={endgame} />
				<div className="h-56" />
				<ImageSwitch current={endgame} />

			</section>
		</>
	)
}

function ImageSwitch({current}: {current: string}) {
	let src = new Map<string, string>([
		["park", "park.jpg"],
		["deep", "deep.jpg"],
		["shallow", "shallow.jpg"],
	]);
	return <Image className="mx-10 mt-5" src={"/" + (src.get(current) ?? "cage.png")} alt="" width={300} height={300} />
}
