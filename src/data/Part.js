"use strict";

let id = 0;

function partId() {
	id++
	return id
}

export class SimplePart {
	constructor(title, instrument, notes) {
		this.id = partId();
		this.title = title;
		this.type = 'simple';
		this.instrument = instrument;
		this.notes = notes.split(' ');
		this.enabled = true;
		this.gain = 1.0;
	}

	// returns JS-safe unique name
	codeName() {
		return this.title.replace(/[^a-zA-Z_]/gi, '') + '_' + String(this.id);
	}

	toStrudel() {
		return `const ${this.codeName()} = ${this.toCode()}`;
	}

	toCode() {
		if (!this.notes) {
			this.notes = [];
		}
		let notes = this.notes.join(' ');

		return `s("${(this.instrument + " ").repeat(this.notes.length).slice(0, -1)}").n("${notes}").gain(${this.gain});`;
	}
}

export class CodePart {
	constructor(title, code) {
		this.id = partId();
		this.title = title;
		this.type = 'code';
		this.code = code;
		this.enabled = true;
	}

	// returns JS-safe unique name
	codeName() {
		return this.title.replace(/[^a-zA-Z_]/gi, '') + '_' + String(this.id);
	}

	toStrudel() {
		return `const ${this.codeName()} = ${this.code};`;
	}
}
