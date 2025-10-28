class Arrangement {
	constructor() {
		this.sections = []
	}

	addSection(parts, duration) {
		this.sections.push([parts, duration])
	}

	getSections() {
		return this.sections
	}

	toStrudel() {
		let code = 'arrange('
		
		sections.forEach(s => {
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