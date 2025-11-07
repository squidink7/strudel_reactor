let id = 0;

function arrangementId() {
	id++
	return id
}

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
				partsCode += p.codeName() + ',';
			});
			partsCode += ')';
			code += `[${s.duration}, ${partsCode}],`;
		});

		code += ');';
		return code;
	}
}

export class Section {
	constructor(parts, duration) {
		this.title = "Section";
		this.parts = parts;
		this.duration = duration;
	}
}