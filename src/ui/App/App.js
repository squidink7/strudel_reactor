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

let globalEditor = null;

const appName = "Strudel Reactor"

function StrudelDemo() {
	// Init strudel on page load
	useEffect(() => {
		initStrudel({
			prebake: () => {
				samples('github:tidalcycles/dirt-samples');
				// samples('github:geikha/tidal-drum-machines');
			}
		});
	}, []);

	// State
	
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
			let saveData = JSON.parse(event.target.result);
			setParts(saveData[0]);
			setArrangements(saveData[1]);
		}
    }

    fileReader.onerror = error => reject(error);
    fileReader.readAsText(file);
  })
	}

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
				<Sidebar arrangementId={arrangementId} setArrangement={setArrangementId} arrangements={arrangements} />
				
				{/* Main Content Area */}
				<div className="flex-1 bg-light vw-100">
					{
						arrangementId == -1 ? (
							<PartsView parts={parts} setParts={setParts} newPart={addPart} />
						) : (
							<div></div>
						)
					}
				</div>
			</div>
			
			<MusicControls handlePlayStop={togglePlaying} handleShowCode={() => setShowCodeDialog(true)} onSave={saveFile} onLoad={loadFile} />
			
			{/* Code Dialog */}
			{showCodeDialog && (<CodeDialog handleCloseDialog={() => setShowCodeDialog(false)} code={generateSongCode()} />)}
		</div>
	);

	function togglePlaying(playing) {
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

export default StrudelDemo;