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
    	this.instrument = '';
    	this.notes = notes.split(' ');
    	this.enabled = true;
    	this.gain = 1.0;
	}

	// returns JS-safe unique name
	codeName() {
		return this.title.replace(/[^a-zA-Z_]/gi, '') + '_' + String(this.id);
	}

	toStrudel() {
		return `$${this.codeName()}: ${this.toCode()}`;
	}

	toCode() {
		return '';
	}
}

export class CodePart {
	constructor(title, code) {
		this.id = partId();
		this.title = title;
		this.type = 'code';
		this.code = code;
	}

	// returns JS-safe unique name
	codeName() {
		return this.title.replace(/[^a-zA-Z_]/gi, '') + '_' + String(this.id);
	}

	toStrudel() {
		return `$${this.codeName()}: ${this.code}`;
	}
}
