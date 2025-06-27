export async function getTBAMatchData(eventkey: string) {
    let data: any[] = await getTBA(`https://www.thebluealliance.com/api/v3/event/${eventkey}/matches/simple`);
    return data.map((x) => {
        return {
            teams: x.alliances.blue.team_keys.concat(x.alliances.red.team_keys).map((x: string) => x.replace("frc", '')),
            number: x.match_number,
			comp_level: x.comp_level,
        };
    });
}

async function getTBA(url: string) {
    let data: any[] = await fetch(`${url}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TBA-Auth-Key': 'BPNkws6O0VfaO46odlRsTxJPQrjzdsb5GcUwnEoH0yhcbNDZUrWkUai61cyLRIYv'
        }
    }).then((res) => res.json());
    return data;
}
