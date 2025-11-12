import { useState } from "react";
import { ArrangementSection } from "./ArrangementSection";
import { Section } from "../../data/Arrangement"

export function ArrangementsView({ arrangementId, arrangements, updateArrangement, parts }) {
	let arrangement = getArrangement(arrangementId);
	
	const [arr, setArr] = useState(getArrangement(arrangementId));
	const [sections, setSections] = useState(getArrangement(arrangementId).sections);
	
	function getArrangement(id) {
		for (let i=0; i<arrangements.length; i++) {
			if (arrangements[i].id === id) {
				return arrangements[i];
			}
		}
	}

	function handleTitleChange(e) {
		getArrangement(arrangementId).name = e.target.value;
		arr.name = e.target.value;
		updateArrangement(arrangement);
	};

	function updateSections(newSection) {
		let newSections = [...arr.sections];
		
		for (let i=0; i<newSections.length; i++) {
			if (newSections[i].id && newSection.id) {
				newSections[i] = newSection;
			}
		}

		arr.sections = newSections;
		setArr(arr);
	}

	function deleteSection(sectionid) {
		console.log("deleting section " + sectionid);
		let newSections = [];
		
		for (let i=0; i<sections.length; i++) {
			if (sections[i].id !== sectionid) {
				newSections.push(sections[i]);
			}
		}

		arr.sections = newSections;
		setSections(newSections);
	}

	return (
		<div className="container p-0">
			<div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
				<input
					type="text"
					className="form-control"
					value={getArrangement(arrangementId).name}
					onChange={handleTitleChange}
					style={{ maxWidth: '200px' }}
				/>
				<div>
					<button className="btn btn-primary mx-2" onClick={() => {
						let section = new Section();
						let a = getArrangement(arrangementId);
						a.addSection(section);
						setSections([...a.sections]);
					}}>
						+ Add Section
					</button>
				</div>
			</div>
			<div className="col">
			{sections.map(s => (
				<ArrangementSection
					key={s.id}
					section={s}
					onSectionChange={updateSections}
					parts={parts}
					onPartAdd={undefined}
					onDelete={deleteSection}
				/>
			))}
			</div>
		</div>
	)
}