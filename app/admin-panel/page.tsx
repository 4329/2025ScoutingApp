"use client"
import { signOut } from "next-auth/react";
import MatthewsButton from "../ui/admin-panel/MatthewsButton";
import NavPanel from "../ui/NavPanel";
import { revalidatePath } from "next/cache";
import { createAdmin, populatePossibilitiesWithTBA, populateTeamsWithTBA } from "../lib/actions";
import { SyntheticEvent, useState } from "react";
import { checkTables } from "../lib/seed";

export default function Page() {

	const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <header>
                <h1>Roboteer Admin Panel</h1>
                <NavPanel />
            </header>
            <h2 className="text-[40px] text-center m-10">Pull Data From TBA</h2>
            <MatthewsButton title="Pull Matches" toRun={populatePossibilitiesWithTBA}/>
            <MatthewsButton title="Pull Teams" toRun={populateTeamsWithTBA}/>

            <div id="padding" className="m-20"></div>

            <form id="Add Admin" onSubmit={(e: SyntheticEvent) => {
                e.preventDefault();
                const tmp = e.target as any;
                createAdmin(tmp[0].value, tmp[1].value)
            }}>
                <h2 className="text-[40px] m-6 text-center">Add Admin</h2>
                <div className="flex justify-center">
                    <input placeholder="email" name="email" type="email" className="login-field" />
                    <input placeholder="password" name="password" className="login-field" />
                    <button type="submit" className="button-text">Create</button>
                </div>
            </form>      
            
            <div id="padding" className="m-6"></div>

			<button className="button-text" onClick={async () => {
				checkTables()
			}}>Check Tables</button>
			<br />

			<button className="button-text !m-5" onClick={() => {
				signOut()
			}}>Sign Out</button>
        </>
    );
}
