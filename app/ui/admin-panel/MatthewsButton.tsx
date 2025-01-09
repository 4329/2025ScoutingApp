"use client"
import { populatePossibilitiesWithTBA } from "@/app/lib/actions";
import { SyntheticEvent, useState } from "react";

export default function MatthewsButton({toRun, title}: {toRun: any, title: string}) {
    let [state, setState]: [any, any] = useState("");
    const handleChange = (event: SyntheticEvent) => {
        const tmp: HTMLSelectElement = event.target as HTMLSelectElement;
        setState(tmp.value);
    }

    return (
        <div className="m-8">
            <div className="grid grid-cols-3">
                <h2 className="text-[30px] m-6 text-end relative">{title}</h2>
                <input placeholder="Event Key" className="text-2xl p-2" type="text" id="name" name="name" onChange={handleChange} />
                <button id="savebutton" className="button-text w-[100px]" onClick={() => toRun(state)}>Pull</button>
            </div>
        </div>
    );
}
