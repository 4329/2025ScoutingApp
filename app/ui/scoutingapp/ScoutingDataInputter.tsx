import CoolSwitch from "./CoolSwitch";
import ImageCrementor from "./ImageCrementor";
import Image from "next/image";
import { Dispatch, useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import Coralinator from "./Coralinator";
import { state } from "@/app/lib/match";
import { rankEntry } from "@/app/lib/dataSource";
import { Table } from "./Table";
import EndMatchNotes from "./EndMatchNotes";

export function ScoutingDataInputter({initialStates, top, setName}: {initialStates: state, top: rankEntry[], setName: Dispatch<string | undefined>}) {
	const [endgame, setEndgame] = useState("");
	const [auto_corals, setAuto_corals] = useState([initialStates.auto_l1, initialStates.auto_l2, initialStates.auto_l3, initialStates.auto_l4]);
	const [teleop_corals, setTeleop_corals] = useState([initialStates.teleop_l1, initialStates.teleop_l2, initialStates.teleop_l3, initialStates.teleop_l4]);

	useEffect(() => {
		setAuto_corals([initialStates.auto_l1, initialStates.auto_l2, initialStates.auto_l3, initialStates.auto_l4]);
		setTeleop_corals([initialStates.teleop_l1, initialStates.teleop_l2, initialStates.teleop_l3, initialStates.teleop_l4]);
	}, [initialStates])

	return (
		<>
		<div className="text-xl flex items-center">
				Enter Name: <input className="m-4 p-1" id="submitter_name" onChange={x => {
					setName(x.target.value);
				}}/> {top[0] ? <Table data={top} /> : ""}
			</div>

			<section className="scroll-mt-6" id="auto">
				<h2>Auto</h2>
				<CoolSwitch className="p-10" id="auto_leave" title="Leave" initial={initialStates.auto_leave} />
				<Coralinator title="Auto Coral" type="auto" initialStates={auto_corals} />	
				<ImageCrementor className="p-10" id="auto_processor" src="/processor.jpg" title="Auto Processor" initial={initialStates.auto_processor} />
				<ImageCrementor className="p-10" id="auto_net" src="/net.jpg" title="Auto Net" initial={initialStates.auto_net} />
			</section>

			<section className="scroll-mt-6" id="teleop">
				<h2>Teleop</h2>
				<Coralinator title="Teleop Coral" type="teleop" initialStates={teleop_corals} />
				<ImageCrementor className="p-10" id="teleop_processor" src="/processor.jpg" title="Teleop Processor" initial={initialStates.teleop_processor} />
				<ImageCrementor className="p-10" id="teleop_net" src="/net.jpg" title="Teleop Net" initial={initialStates.teleop_net} />
			</section>

			<section className="scroll-mt-6" id="endgame">
				<h2>Endgame</h2>

				<div className="title mx-10">Climb</div>
				<Dropdown setMatchNum={setEndgame} className="relative -top-28 m-7" name="Select" initial={(initialStates.endgame ?? "nothing").toString()}>
					<option value="nothing">Nothing</option>
					<option value="park">Park</option>
					<option value="shallow">Shallow Cage</option>
					<option value="deep">Deep Cage</option>
				</Dropdown>
				<input type="hidden" id="endgame" value={endgame} />
				<div className="h-56" />
				<ImageSwitch current={endgame} />

				<CoolSwitch className="pt-10 pl-10" id="defense" title="Defence" initial={initialStates.defense} />
				<CoolSwitch className="p-10" id="died" title="Demolished" initial={initialStates.died} />

			</section>
			
            <EndMatchNotes initial={initialStates.end_match_notes} />
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
