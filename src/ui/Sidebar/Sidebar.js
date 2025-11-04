import { useState } from "react";
import { Graph } from "../Graph/Graph"

export function Sidebar({arrangements, arrangementId, setArrangementId, startGraph}) {

	return (
		<div className="d-flex flex-column w-25 bg-light border-end p-3 justify-content-between">
			<div className="d-flex flex-column">
				<button className="btn btn-primary btn-lg mb-4" onClick={() => setArrangementId(-1)}>
					All Parts
				</button>
				
				<h5 className="mb-3">Arrangements</h5>
				<div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
					<ul className="list-group">
						{arrangements.map(arrangement => (
							<button key={arrangement.id} type="button" className={"list-group-item list-group-item-action " + (arrangement.id == arrangementId ? "active" : "")} onClick={() => setArrangementId(arrangement.id)}>
								{arrangement.name}
							</button>
						))}
					</ul>
				</div>
			</div>
			{/* <Graph start={startGraph} /> */}
		</div>
	)
}