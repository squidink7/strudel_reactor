// import './cors-redirect';
import { Editor } from '../Editor/Editor'
import { MusicControls } from '../MusicControls/MusicControls'
import './App.css';
import { initStrudel } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../../tunes';
import { PartCard } from '../PartCard/PartCard';
import { PartsView } from '../PartsView/PartsView';
import { Sidebar } from '../Sidebar/Sidebar';
import { CodeDialog } from '../CodeDialog/CodeDialog';

let globalEditor = null;

const appName = "Strudel Reactor"

function StrudelDemo() {
	// Init strudel on page load
	useEffect(() => {
		initStrudel();
	}, []);

	// State
	const [mainView, setMainView] = useState((<div />));
	const [showCodeDialog, setShowCodeDialog] = useState(false);
	
	const [parts, setParts] = useState([
    {
      id: 1,
      title: "Piano Melody",
      type: "simple",
      name: "Grand Piano",
      notes: ["C4", "E4", "G4", "C5"],
      enabled: true,
      gain: 0.7,
    },
    {
      id: 2,
      title: "Bass Line",
      type: "custom",
      name: "Synth Bass",
      notes: ["F#3", "A3", "C#4", "F#4"],
      enabled: false,
      gain: 0.85,
    },
    {
      id: 3,
      title: "Drum Kit",
      type: "simple",
      name: "Acoustic Drums",
      notes: ["Kick", "Snare", "Hi-Hat", "Crash"],
      enabled: true,
      gain: null
    }
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

	const handleCloseDialog = () => {
		setShowCodeDialog(false);
	};

	return (
		<div className="d-flex flex-column vh-100">
			<div className="d-flex flex-1">
				{/* Sidebar */}
				<Sidebar showArrangement={showArrangement} arrangements={arrangements} />
				
				{/* Main Content Area */}
				<div className="flex-1 bg-white">
					{/* {currentView} */}
					{mainView}
				</div>
			</div>
			
			<MusicControls handlePlayStop={() => {}} handleShowCode={() => setShowCodeDialog(true)} />
			
			{/* Code Dialog */}
			{showCodeDialog && (<CodeDialog handleCloseDialog={() => setShowCodeDialog(false)} />)}
		</div>
	);

	function showArrangement(id) {
		if (id == -1) {
			setMainView((<PartsView parts={parts} setParts={setParts} />))
		} else {
			setMainView((<div></div>))
		}
	}
}

export default StrudelDemo;