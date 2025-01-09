"use client"
import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import CheckBox from "./check-box";

export default function TeamChecks({ teamList, removals, setRemovals }: { teamList: any[], removals: any, setRemovals: Dispatch<any> }) {
    const [filter, setFilter] = useState("");
    const checkBoxes = CheckBoxes();

    return (
        <div className="bg-blue-500 p-4 m-10 rounded-lg w-[250px]">
            <input type="number"
                onChange={e => setFilter((e.target as HTMLInputElement).value)}
                className="p-2" />
            <div className="m-4" />
            <div className="grid grid-cols-1 h-[200px] overflow-y-auto overflow-x-clip">
                {checkBoxes}
            </div>
        </div>
    );

    function CheckBoxes() {
        return Object.entries(teamList)
            .filter(x => x[0].includes(filter))
            .sort((a: any, b: any) => -a[1].total_score + b[1].total_score)
            .map((x: any) => <CheckBox name={x[0]} key={x[0]} onChange={(checkbox: any) => {
                let tmp = removals.slice();
                if (checkbox.checked) {
                    tmp.splice(tmp.indexOf(checkbox.name), 1);
                    setRemovals(tmp);
                } else {
                    tmp.push(checkbox.name);
                    setRemovals(tmp);
                }
            }} />);
    }

}