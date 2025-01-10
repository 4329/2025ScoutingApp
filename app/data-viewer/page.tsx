"use client"
import { useEffect, useState } from "react";
import { getTeams, team } from "../lib/actions";
import Chart from "react-google-charts";
import Dropdown from "../ui/Dropdown";
import NavPanel from "../ui/NavPanel";
import TeamChecks from "../ui/data-viewer/team-checks";
import * as XLSX from 'xlsx/xlsx.mjs';
import { getData, getMatches } from "../lib/getter";

export default function Page() {
    const [teams, setTeams]: any = useState({ "57": { "test": "9" } });
    const [width, setWidth] = useState<number>(0);
    const [key, setKey] = useState("");
    const [removals, setRemovals]: any = useState([]);

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
        return () => {
            window.removeEventListener("resize", () => {
                setWidth(window.innerWidth);
            });
        }
    }, []);

    useEffect(() => {
        getTeams().then((x: team) => {
            setTeams(x);
        })
    }, []);

	let data = Object.entries(teams)
                        .filter(x => !removals.includes(x[0]))
                        .sort((a: any, b: any) => b[1][key] - a[1][key])
                        .map((x: any) => [x[0], parseInt(x[1][key])])

    return (
        <>
            <header>
                <h1>Data Viewer</h1>
                <NavPanel />
            </header>
            <div className="p-2 mb-[100px]">
                <Dropdown name="Choose Key" setMatchNum={setKey}>
                    {Object.keys(teams[Object.keys(teams)[0]])
                        .map((x: string) =>
                            <option value={x} key={x}>
                                {x.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                            </option>)}
                </Dropdown>
            </div>
            <div className="overflow-y-scrol overflow-x-clip h-[400px]">
                <Chart
                    chartType="BarChart"
                    data={[["Age", key]].concat(data)}
                    options={{
                        title: `Teams Compared by ${key.replaceAll("_", " ")}`,
						titleTextStyle: {
							color: "#FFFFFF"
						},
                        hAxis: {
                            title: key,
							ticks: data != null ? Array.from([...Array(10).keys()].map((x, i) => x * (Math.max(...(data.map(x => {
								if (isNaN(x[1])) return 0;
								return x[1]
							}))) / 10))) : [0],
							textStyle: {
								color: "#FFFFFF"
							}
                        },
                        vAxis: {
                            textStyle: {
                                fontSize: 30,
								color: "#FFFFFF"
                            },
							titleTextStyle: {
								color: "#FFFFFF"
							}
                        },
                        legend: {
                            position: "none",
							textStyle: {
								color: "#FFFFFF"
							}
                        },
                        chartArea: {
                            width: "85%",
                            left: 150
                        },
                        width,
						backgroundColor: "2b2b2b"
                    }}
                />
            </div >
            <div className="m-4" />
            <TeamChecks teamList={teams} removals={removals} setRemovals={setRemovals} />
			<button className="button-text" onClick={() => {
				getMatches().then((x) => {
					var workbook = XLSX.utils.book_new();
					var table = XLSX.utils.json_to_sheet(x, {});
					XLSX.utils.book_append_sheet(workbook, table, "Yep");
					XLSX.writeFile(workbook, "yep.xlsb");
				});
			}}>Export to .xlsx</button>
        </>
    )
}
