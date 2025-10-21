import { useState } from "react";

export function Sidebar({arrangements, showArrangement}) {
	const [arrangementId, setArrangementId] = useState(-1);

	return (
		<div className="d-flex flex-column w-25 bg-light border-end p-3">
			<button className="btn btn-primary btn-lg mb-4" onClick={() => showArrangement(-1)}>
				All Parts
			</button>
			
			<h5 className="mb-3">Arrangements</h5>
			<div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
				<ul className="list-group">
					{arrangements.map(arrangement => (
						<button type="button" className={"list-group-item list-group-item-action " + (arrangement.id == arrangementId ? "active" : "")} onClick={() => {setArrangementId(arrangement.id); showArrangement(arrangement.id)}}>
							{arrangement.name}
						</button>
					))}
				</ul>
			</div>
		</div>
	)
}