import { DataSource, QRCodeSource } from "@/app/lib/dataSource";
import { getAllPossibilities } from "@/app/lib/getter";
import { QRCodeSVG } from "qrcode.react";
import { Dispatch, useState } from "react";
import Modal from "react-modal";
import QRModal from "../ModalScanner";
import { posix } from "path";

export default function Possibilities({dataSource, setDataSource}: {dataSource: DataSource, setDataSource: Dispatch<DataSource>}) {
    const [possibilities, setPossibilities] = useState<string[]>();

    const [scan, setScan] = useState(false);

    return (
        <>
            <button className="button-text" onClick={() => {
                getAllPossibilities().then(x => {
					setPossibilities(formatPossibilities(x as any));
                })
            }} >Show Possibilities</button>
            <button className="button-text" onClick={() => setScan(true)} >Scan Possibilities</button>

            <Modal isOpen={!!possibilities}
				ariaHideApp={false}
                style={{
                    overlay: {
                        zIndex: 30
                    },
                    content: {
                        color: "white",
                        backgroundColor: "#333",
                    }
                }}>
                <div className="grid grid-cols-3 place-items-center">
                    <div />
                    <button className="button-text" onClick={() => setPossibilities(undefined)}>Close</button>
                    <div />

                    <div />
                    <div className="p-5">
					{(possibilities ?? []).map((x: any) => <QRCodeSVG value={x} bgColor="white" marginSize={1} size={300} key={x} />)}
                    </div>
                </div>
            </Modal>

            <QRModal isOpen={scan} 
                onScan={x => {
					let possibilities = parsePossibilities(x[0].rawValue);
					if (dataSource && (dataSource as any).addData) (dataSource as any).addData(possibilities);
					else setDataSource(new QRCodeSource(possibilities));
                }} 
                close={() => setScan(false)}/>
        </>
    );
}

function formatPossibilities(possibilities: { match_num: number, red_nums: number[], blue_nums: number[] }[]) {
    function doArray(array: number[]) {
        return array.reduce((a, b) => {
            let out = b + "";
            while (out.length < 4) out += 0;
            return a + out;
        }, "");
    }

    let encoded: string[] = [];

	let iMax = 1;
	for (let i = 0; i < iMax; i++) {
		let accumulated = "";
		for (let j = Math.round(i * (possibilities.length / iMax)); j < (i + 1) * (possibilities.length / iMax); j++) {
			accumulated += possibilities[j].match_num + "-" + doArray(possibilities[j].blue_nums) + doArray(possibilities[j].red_nums);
		}
		encoded.push(accumulated);
	}

    return encoded;
}

function parsePossibilities(possibilities: string) {
    let matches = []
    for (let i = 0; i < possibilities.length; i++) {
        let out: any = {};
        let start = i;
        while (possibilities.charAt(i) != "-") i++;
        out["match_num"] = possibilities.substring(start, i);
        i++;

        let red_nums = [];
        for (let j = 0; j < 3; j++, i += 4) {
            red_nums.push(possibilities.substring(i, i + 4));
        }
        out["red_nums"] = red_nums;

        let blue_nums = [];
        for (let j = 0; j < 3; j++, i += 4) {
            blue_nums.push(possibilities.substring(i, i + 4));
        }
        out["blue_nums"] = red_nums;
        i--;

        matches.push(out);
    }
    return matches;
}

