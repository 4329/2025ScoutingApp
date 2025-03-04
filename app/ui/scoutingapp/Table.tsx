import { rankEntry } from "@/app/lib/dataSource";

export function Table({data}: {data: rankEntry[]}) {
	return (
		<div className="m-4">
			<label className="title text-center">Leaderboard</label>
			<table className="mt-4">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{data.map(x => 
							  <tr className={x.me ? "bg-blue-500" : ""} key={x.name}>
								  <th>{x.rank}</th>
								  <th>{x.name}</th>
								  <th>{x.score}</th>
							  </tr>)}
				</tbody>
			</table>
		</div>
	)
}
