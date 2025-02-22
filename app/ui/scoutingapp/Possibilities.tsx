import { DataSource, QRCodeSource } from "@/app/lib/dataSource";
import { getAllPossibilities } from "@/app/lib/getter";
import { QRCodeSVG } from "qrcode.react";
import { Dispatch, useState } from "react";
import Modal from "react-modal";
import QRModal from "../ModalScanner";
import { posix } from "path";

export default function Possibilities({eventKey, dataSource, setDataSource}: {eventKey: string, dataSource: DataSource, setDataSource: Dispatch<DataSource>}) {
    const [possibilities, setPossibilities] = useState<string>();

    const [scan, setScan] = useState(false);

    return (
        <>
            <button className="button-text" onClick={() => {
                getAllPossibilities().then(x => {
					setPossibilities(formatPossibilities(eventKey, x as any));
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
					{ possibilities ?
						<QRCodeSVG value={possibilities} bgColor="white" marginSize={1} size={300} />
							: <></>}
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

function formatPossibilities(eventKey: string, possibilities: { match_num: number, red_nums: number[], blue_nums: number[] }[]) {
    function doArray(array: number[]) {
        return array.reduce((a, b) => {
            let out = b + "";
            while (out.length < 4) out += 0;
            return a + out;
        }, "");
    }

    let encoded: string = "";

	let accumulated = "";
	for (let i = 0; i < possibilities.length; i++) {
		accumulated += possibilities[i].match_num + "-" + doArray(possibilities[i].blue_nums) + doArray(possibilities[i].red_nums);
	}

    return eventKey + "-" + accumulated;
}

function parsePossibilities(possibilities: string) {
	let eventKeyIndex = possibilities.indexOf("-");
	let eventKey = possibilities.substring(0, eventKeyIndex);
	possibilities = possibilities.substring(eventKeyIndex);


    let matches = []
    for (let i = 0; i < possibilities.length; i++) {
        let out: any = {
			event_name: eventKey
		};
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

