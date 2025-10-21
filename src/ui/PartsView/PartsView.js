import { PartCard } from "../PartCard/PartCard";

export function PartsView({ parts, setParts }) {
	return (
		<div className="container p-0">
			<div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
				<h2 className="mb-0">Parts</h2>
				<button className="btn btn-primary">
					+ Add Part
				</button>
			</div>
			<div className="row p-3">
			{parts.map(part => (
				<div key={part.id} className="col-md-6 col-lg-4">
					<PartCard instrument={part} />
				</div>
			))}
			</div>
		</div>
	)
}