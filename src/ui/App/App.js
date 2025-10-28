// import './cors-redirect';
import { Editor } from '../Editor/Editor'
import { MusicControls } from '../MusicControls/MusicControls'
import './App.css';
import { initStrudel, evaluate, hush } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { PartCard } from '../PartCard/PartCard';
import { PartsView } from '../PartsView/PartsView';
import { Sidebar } from '../Sidebar/Sidebar';
import { CodeDialog } from '../CodeDialog/CodeDialog';
import { SimplePart, CodePart } from '../../data/Part'

let globalEditor = null;

const appName = "Strudel Reactor"

function StrudelDemo() {
	// Init strudel on page load
	useEffect(() => {
		initStrudel();
	}, []);

	// State
	
	const [parts, setParts] = useState([
		new SimplePart(
			"Piano Melody",
			"Grand Piano",
			"C4 E4 G4 C5",
		),
		new CodePart(
			"Bass Line",
			"F#3 A3 C#4 F#4",
		),
		new SimplePart(
			"Drum Kit",
			"Acoustic Drums",
			"Kick Snare Hi-Hat Crash",
		)
	]);
	const [arrangements, setArrangements] = useState(
		[
			{ id: 1, name: "Verse" },
			{ id: 2, name: "Chorus" },
			{ id: 3, name: "Bridge" },
			{ id: 4, name: "Verse" },
			{ id: 5, name: "Chorus" },
			{ id: 6, name: "Outro" },
			{ id: 7, name: "Intro" },
			{ id: 8, name: "Verse" },
		]
	);
	
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
	
	const [mainView, setMainView] = useState((<PartsView parts={parts} setParts={setParts} />));
	const [showCodeDialog, setShowCodeDialog] = useState(false);

	return (
		<div className="d-flex flex-column vh-100">
			<div className="d-flex flex-1 vh-100">
				{/* Sidebar */}
				<Sidebar showArrangement={showArrangement} arrangements={arrangements} />
				
				{/* Main Content Area */}
				<div className="flex-1 bg-light vw-100">
					{mainView}
				</div>
			</div>
			
			<MusicControls handlePlayStop={togglePlaying} handleShowCode={() => setShowCodeDialog(true)} />
			
			{/* Code Dialog */}
			{showCodeDialog && (<CodeDialog handleCloseDialog={() => setShowCodeDialog(false)} />)}
		</div>
	);

	function togglePlaying(playing) {
		if (playing) {
			evaluate('note("c a f e").jux(rev)')
		} else {
			hush()
		}
	}

	function showArrangement(id) {
		if (id == -1) {
			setMainView((<PartsView parts={parts} setParts={setParts} />))
		} else {
			setMainView((<div></div>))
		}
	}
}

export default StrudelDemo;