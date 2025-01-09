import { DataSource, QRCodeSource } from "@/app/lib/dataSource";
import { getAllPossibilities } from "@/app/lib/getter";
import { QRCodeSVG } from "qrcode.react";
import { Dispatch, useState } from "react";
import Modal from "react-modal";
import QRModal from "../ModalScanner";

export default function Possibilities({setDataSource}: {setDataSource: Dispatch<DataSource>}) {
    const [possibilities, setPossibilities] = useState("");
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
                    <button className="button-text" onClick={() => setPossibilities("")}>Close</button>
                    <div />

                    <div />
                    <div className="p-5">
                        <QRCodeSVG value={possibilities} bgColor="white" marginSize={1} size={300} />
                    </div>
                </div>
            </Modal>

            <QRModal isOpen={scan} 
                onScan={x => {
                    setDataSource(new QRCodeSource(parsePossibilities(x[0].rawValue)));
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

    let encoded = "";
    for (const x of possibilities) {
        encoded += x.match_num + "-" + doArray(x.blue_nums) + doArray(x.red_nums);
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

