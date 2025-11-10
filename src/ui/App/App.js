// import './cors-redirect';
import { MusicControls } from '../MusicControls/MusicControls'
import './App.css';
import { initStrudel, evaluate, hush, samples, initAudioOnFirstClick, evalScope, registerSynthSounds } from "@strudel/web";
import { registerSoundfonts } from "@strudel/soundfonts";
import { useEffect, useReducer, useState } from "react";
import { PartsView } from '../PartsView/PartsView';
import { Sidebar } from '../Sidebar/Sidebar';
import { CodeDialog } from '../CodeDialog/CodeDialog';
import { SimplePart, CodePart } from '../../data/Part';
import { Arrangement, Section } from '../../data/Arrangement';
import { ArrangementsView } from '../Arrangements/ArrangementsView';

function App() {
	// Init strudel on page load
	useEffect(() => {
		initStrudel({
			prebake: async () => {
				initAudioOnFirstClick();
				const loadModules = evalScope(
					import('@strudel/core'),
					import('@strudel/draw'),
					// import('@strudel/mini'), // Importing mini breaks evaluate()
					import('@strudel/tonal'),
					import('@strudel/webaudio'),
				);
				await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
				samples('github:tidalcycles/dirt-samples');
			}
		});
		// Load saved json
		loadJson(localStorage.getItem('savedata'));
		setLoaded(true);
	}, []);

	// State
	const [loaded, setLoaded] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [parts, setParts] = useState([
		new SimplePart(
			"Piano Melody",
			"piano",
			"C4 E4 G4 C5",
		),
		new CodePart(
			"Drums",
			's("bd:1 bd:2,hh:0 hh:1 hh:2 hh:3")',
		),
		new SimplePart(
			"Drum Kit",
			"bd",
			"Kick Snare Hi-Hat Crash",
		)
	]);
	const testArrangement = new Arrangement("Arrangement 1");
	testArrangement.addSection(new Section([parts[0], parts[2]], 2));
	const [arrangements, setArrangements] = useState(
		[
			testArrangement,
		]
	);
	const [cps, setCps] = useState('');

	// Save to localstorange on change
	useEffect(() => {
		if (!loaded) return;
		localStorage.setItem('savedata', JSON.stringify([parts, arrangements]));
	}, [parts, arrangements]);

	function loadFile(file) {
		new Promise((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.onload = event => {
				if (event.target) {
					try {
						JSON.parse(event.target.result);
					} catch (error) {
						alert('Invalid save file!');
						return;
					}
					loadJson(event.target.result)
				}
			}

			fileReader.onerror = error => reject(error);
			fileReader.readAsText(file);
		})
	}

	// Save application state as json
	function saveFile() {
		const element = document.createElement("a");
		const file = new Blob([JSON.stringify([parts, arrangements])], {type: 'application/json'});
		element.href = URL.createObjectURL(file);
		element.download = "composition.json";
		document.body.appendChild(element);
		element.click();
	}

	function loadJson(json) {
		let saveData;
		try {
			saveData = JSON.parse(json);
		} catch (error) {
			return;
		}
		let parts = [];
		// ensure loaded parts are actually part classes.
		saveData[0].forEach(p => {
			if (p.type === "simple") {
				parts.push(Object.setPrototypeOf(p, SimplePart.prototype));
			}
			else {
				parts.push(Object.setPrototypeOf(p, CodePart.prototype));
			}
		});
		setParts(parts);
		let arrangements = [];
		// ensure loaded arrangements are actually arrangement classes.
		saveData[1].forEach(a => {
			arrangements.push(Object.setPrototypeOf(a, Arrangement.prototype));
		});
		setArrangements(saveData[1]);
	}

	function addPart(type) {
		let part;
		if (type === "simple") {
			part = new SimplePart("New Part","","");
		} else {
			part = new CodePart("New Part", "");
		}
		
		parts.push(part);
		return part;
	}

	function addArrangement() {
		arrangements.push(new Arrangement("New Arrangement"));
		setArrangements([...arrangements]);
	}
	
	const [arrangementId, setArrangementId] = useState(-1);
	const [showCodeDialog, setShowCodeDialog] = useState(false);
	const [updateGraph, setUpdateGraph] = useState(false);

	return (
		<div className="d-flex flex-column vh-100">
			<div className="d-flex flex-1 vh-100">
				{/* Sidebar */}
				<Sidebar arrangementId={arrangementId} setArrangementId={setArrangementId} arrangements={arrangements} newArrangement={addArrangement} updateGraph={updateGraph} />
				
				{/* Main Content Area */}
				<div className="flex-1 bg-light vw-100">
					{
						arrangementId === -1 ? (
							<PartsView
								parts={parts}
								setParts={(parts) => {setParts(parts); updateSong();}}
								newPart={addPart}
							/>
						) : (
							<ArrangementsView
								arrangementId={arrangementId}
								arrangements={arrangements}
								updateArrangement={(a) => updateArrangement(a)}
								parts={parts}
							/>
						)
					}
				</div>
			</div>
			
			<MusicControls handlePlayStop={togglePlaying} handleShowCode={() => setShowCodeDialog(true)} onSave={saveFile} onLoad={loadFile} cps={cps} setCps={setCps} />
			
			{/* Code Dialog */}
			{showCodeDialog && (<CodeDialog handleCloseDialog={() => setShowCodeDialog(false)} code={generateSongCode()} updateGraph={updateGraph} />)}
		</div>
	);

	function getArrangement(id) {
		for (let i=0; i<arrangements.length; i++) {
			if (arrangements[i].id === id) {
				return arrangements[i];
			}
		}
	}

	function updateArrangement(a) {
		for (let i=0; i<arrangements.length; i++) {
			if (arrangements[i].id === a.id) {
				arrangements[i] = a;
			}
		}

		setArrangements([...arrangements]);
	}

	function updateSong() {
		if (playing) {
			evaluate(generateSongCode());
		}
	}

	function togglePlaying(playing) {
		setPlaying(playing);
		if (playing) {
			console.log('Playing song:');
			console.log(generateSongCode());
			evaluate(generateSongCode());
		} else {
			hush();
		}
		setUpdateGraph(!updateGraph);
	}

	function generateSongCode() {
		let code = `setCps(${cps});\n`;

		// Generate code for all parts
		parts.forEach(part => {
			code += part.toStrudel();
			code += '\n';
		});

		if (arrangementId === -1) {
			// Play all parts
			code += 'stack(';
			parts.forEach(p => {
				if (p.enabled) {
					code += p.codeName() + ',';
				}
			});
			code += ').fft(1).analyze("a");';
		} else {
			// Generate code for current arrangement
			code += getArrangement(arrangementId).toStrudel();
		}

		return code;
	}
}

export default App;