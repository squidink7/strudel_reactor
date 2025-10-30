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

	addSection(parts, duration) {
		this.sections.push([parts, duration]);
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