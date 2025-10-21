import { PartCard } from "../PartCard/PartCard";

export function PartsView({ parts, setParts }) {
	return (
		<div className="container mt-4">
			<h1 className="mb-4">Parts</h1>
			<div className="row">
			{parts.map(part => (
				<div key={part.id} className="col-md-6 col-lg-4">
					<PartCard instrument={part} />
				</div>
			))}
			</div>
		</div>
	)
}