import { useState } from "react";
import { PartCard } from "../PartCard/PartCard";
import { SimplePartEditor } from "../PartEditor/SimplePartEditor";
import { CodePartEditor } from "../PartEditor/CodePartEditor";

export function PartsView({ parts, setParts, newPart }) {
	const [editingPartId, setEditingPartId] = useState(0);
	
	function updatePart(newPart) {
		let newParts = parts;
		
		for (let i=0; i<newParts.length; i++) {
			if (newParts[i].id == newPart.id) {
				newParts[i] = newPart;
			}
		}

		setParts(newParts);
	}

	function deletePart(partId) {
		console.log("deleting part " + partId);
		let newParts = [];
		
		for (let i=0; i<parts.length; i++) {
			if (parts[i].id != partId) {
				newParts.push(parts[i]);
			}
		}

		console.log(newParts);
		setParts(newParts);
	}

	return (
		<div className="container p-0 d-flex flex-column" style={{ height: '90vh' }}>
			{/* Header */}
			<div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
				<h2 className="mb-0">Parts</h2>
				<div>
					<button className="btn btn-outline-primary mx-2" onClick={() => {
						let part = newPart("code");
						setEditingPartId(part.id);
					}}>
						+ Add Code Part
					</button>
					<button className="btn btn-primary mx-2" onClick={() => {
						let part = newPart("simple");
						setEditingPartId(part.id);
					}}>
						+ Add Simple Part
					</button>
				</div>
			</div>

			{/* Scrollable Parts Display */}
			<div className="flex-grow-1 overflow-auto p-3">
				<div className="row">
					{parts.map(part => (
						<div key={part.id} className="col-md-6 col-lg-4 mb-3">
							<PartCard part={part} edit={() => setEditingPartId(part.id)} onUpdate={updatePart} />
						</div>
					))}
				</div>
			</div>

			{/* Part editor */}
			{editingPartId != null && editingPartId != 0 && (
				getCurrentPart().type === 'simple' ? (
					<SimplePartEditor
						part={getCurrentPart()}
						onSave={(newPart) => updatePart(newPart)}
						onClose={() => setEditingPartId(null)}
						onDelete={(id) => deletePart(id)}
					/>
				) : (
					<CodePartEditor
						part={getCurrentPart()}
						onSave={(newPart) => updatePart(newPart)}
						onClose={() => setEditingPartId(null)}
						onDelete={(id) => deletePart(id)}
					/>
				)
			)}
		</div>
	);

	function getCurrentPart() {
		let found = null;
		parts.forEach(p => {
			if (p.id == editingPartId) {
				found = p;
			}
		})

		return found;
	}
}