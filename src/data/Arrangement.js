import { SimplePart, CodePart } from "./Part"

let id = 0;

function arrangementId() {
	id++
	return id
}

// Arrangement of parts into an ordered song.
export class Arrangement {
	constructor(name) {
		this.id = arrangementId();
		this.name = name;
		this.sections = [];
	}

	addSection(section) {
		this.sections.push(section);
	}

	getSections() {
		return this.sections;
	}

	toStrudel() {
		let code = 'arrange(';
		
		this.sections.forEach(s => {
			let partsCode = 'stack(';
			s.parts.forEach(p => {
				let part = p;
				// Ensure part is part class
				if (p.type === "simple") {
					part = Object.setPrototypeOf(p, SimplePart.prototype);
				}
				else {
					part = Object.setPrototypeOf(p, CodePart.prototype);
				}
				partsCode += part.codeName() + ',';
			});
			partsCode += ')';
			code += `[${s.duration}, ${partsCode}],`;
		});

		code += ').fft(1).analyze("a");';
		return code;
	}
}


// Section of an arrangement.
export class Section {
	constructor(parts, duration) {
		this.id = arrangementId()
		this.title = "Section";
		if (parts) {
			this.parts = parts;
		} else {
			this.parts = [];
		}
		if (duration) {
			this.duration = duration;
		} else {
			this.duration = 2;
		}
	}
}