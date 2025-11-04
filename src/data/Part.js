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
		// let prefix = this.enabled ? '' : '_';
		if (!this.enabled) return '';
		return `$${this.codeName()}: ${this.toCode()}`;
	}

	toCode() {
		let notes = this.notes.join(' ');

		return `s("${this.instrument}").n("${notes}").gain(${this.gain});`;
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
		if (!this.enabled) return '';
		return `$${this.codeName()}: ${this.code};`;
	}
}
