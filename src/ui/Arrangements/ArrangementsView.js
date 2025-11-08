import { useState } from "react";
import { ArrangementSection } from "./ArrangementSection";
import { Section } from "../../data/Arrangement"

export function ArrangementsView({ arrangement, updateArrangement, parts }) {
	const [arr, setArr] = useState(arrangement);
	
	function updateSections(newSection) {
		let newSections = [...arr.sections];
		
		for (let i=0; i<newSections.length; i++) {
			if (newSections[i].parts == newSection.parts && newSections[i].duration == newSection.duration) {
				newSections[i] = newSection;
			}
		}

		arr.sections = newSections;
		setArr(arr);
	}

	function deleteSection(section) {
		console.log("deleting section " + section);
		let newSections = [];
		
		for (let i=0; i<arr.sections.length; i++) {
			if (arr.sections[i].parts == section.parts && arr.sections[i].duration == section.duration) {
				newSections.push(arr.sections[i]);
			}
		}

		arr.sections = newSections;
		setArr(arr);
	}

	return (
		<div className="container p-0">
			<div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
				<h2 className="mb-0">Arrangements</h2>
				<div>
					<button className="btn btn-primary mx-2" onClick={() => {
						let section = new Section();
						arr.addSection(section);
					}}>
						+ Add Section
					</button>
				</div>
			</div>
			<div className="col">
			{arr.sections.map(s => (
				<div key={s.id}>
					<ArrangementSection
						section={s}
						onSectionChange={updateSections}
						parts={parts}
						onPartAdd={undefined}
					/>
				</div>
			))}
			</div>
		</div>
	)
}