// import './cors-redirect';
import { MusicControls } from '../MusicControls/MusicControls'
import './App.css';
import { initStrudel, evaluate, hush, samples } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { PartsView } from '../PartsView/PartsView';
import { Sidebar } from '../Sidebar/Sidebar';
import { CodeDialog } from '../CodeDialog/CodeDialog';
import { SimplePart, CodePart } from '../../data/Part';
import { Arrangement } from '../../data/Arrangement';
import { ArrangementsView } from '../Arrangements/ArrangementsView';

const appName = "Strudel Reactor"

function App() {
	// Init strudel on page load
	useEffect(() => {
		initStrudel({
			prebake: () => {
				samples('github:tidalcycles/dirt-samples');
			}
		});
	}, []);

	// State
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
	const [arrangements, setArrangements] = useState(
		[
			new Arrangement("Verse"),
			new Arrangement("Chorus"),
			new Arrangement("Bridge"),
			new Arrangement("Verse"),
			new Arrangement("Chorus"),
			new Arrangement("Outro"),
			new Arrangement("Intro"),
			new Arrangement("Verse"),
		]
	);

	function loadFile(file) {
		new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.onload = event => {
		if (event.target) {
			let saveData;
			try {
				saveData = JSON.parse(event.target.result);
			} catch (error) {
				alert("Invalid save file!");
				return;
			}
			let parts = [];
			// ensure loaded parts are actually part classes.
			saveData[0].forEach(p => {
				if (p.type == "simple") {
					parts.push(Object.setPrototypeOf(p, SimplePart.prototype));
				}
				else {
					let newP = new CodePart();
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

	function addPart(type) {
		let part;
		if (type == "simple") {
			part = new SimplePart("New Part","","");
		} else {
			part = new CodePart("New Part", "");
		}
		
		parts.push(part);
		return part;
	}
	
	const [arrangementId, setArrangementId] = useState(-1);
	const [showCodeDialog, setShowCodeDialog] = useState(false);

	return (
		<div className="d-flex flex-column vh-100">
			<div className="d-flex flex-1 vh-100">
				{/* Sidebar */}
				<Sidebar arrangementId={arrangementId} setArrangementId={setArrangementId} arrangements={arrangements} />
				
				{/* Main Content Area */}
				<div className="flex-1 bg-light vw-100">
					{
						arrangementId == -1 ? (
							<PartsView parts={parts} setParts={(parts) => {setParts(parts); updateSong();}} newPart={addPart} />
						) : (
							<ArrangementsView arrangement={getArrangement(arrangementId)} updateArrangement={(a) => updateArrangement(a)} />
						)
					}
				</div>
			</div>
			
			<MusicControls handlePlayStop={togglePlaying} handleShowCode={() => setShowCodeDialog(true)} onSave={saveFile} onLoad={loadFile} />
			
			{/* Code Dialog */}
			{showCodeDialog && (<CodeDialog handleCloseDialog={() => setShowCodeDialog(false)} code={generateSongCode()} />)}
		</div>
	);

	function getArrangement(id) {
		for (let i=0; i<arrangements.length; i++) {
			if (arrangements[i].id == id) {
				return arrangements[i];
			}
		}
	}

	function updateArrangement(a) {
		for (let i=0; i<arrangements.length; i++) {
			if (arrangements[i].id == a.id) {
				arrangements[i] = a;
			}
		}

		setArrangements(arrangements);
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
	}

	function generateSongCode() {
		let code = '';

		parts.forEach(part => {
			code += part.toStrudel();
			code += '\n';
		});

		return code;
	}
}

export default App;