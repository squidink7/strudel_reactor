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
			s[0].forEach(p => {
				partsCode += ',';
			});
			partsCode += ')';
			code += `[${partsCode}, ${s[1]}],`;
		});

		code += ');';
		return code;
	}
}

export class Section {
	constructor(parts, duration) {
		this.parts = parts;
		this.duration = duration;
	}
}