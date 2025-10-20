// import './cors-redirect';
import { Editor } from '../Editor/Editor'
import { MusicControls } from '../MusicControls/MusicControls'
import './App.css';
import { initStrudel, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../../tunes';
import { PartCard } from '../PartCard/PartCard';

let globalEditor = null;

const appName = "Strudel Reactor"


export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started === true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
}

export function Proc(text) {

  let proc_text = document.getElementById('proc').value
  let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

  let replace = ""
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = "_"
  }

  return replace
}

function StrudelDemo() {
	const [arrangementId, setArrangementId] = useState(-1);
	const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const arrangements = [
    { id: 1, name: "Verse" },
    { id: 2, name: "Chorus" },
    { id: 3, name: "Bridge" },
    { id: 4, name: "Verse" },
    { id: 5, name: "Chorus" },
    { id: 6, name: "Outro" },
    { id: 7, name: "Intro" },
    { id: 8, name: "Verse" },
  ];

  const handlePlayStop = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShowCode = () => {
    setShowCodeDialog(true);
  };

  const handleCloseDialog = () => {
    setShowCodeDialog(false);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="d-flex flex-1">
        {/* Sidebar */}
        <div className="d-flex flex-column w-25 bg-light border-end p-3">
          <button className="btn btn-primary btn-lg mb-4">
            All Parts
          </button>
          
          <h5 className="mb-3">Arrangements</h5>
          <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
            <ul className="list-group">
              {arrangements.map(arrangement => (
								<button type="button" className={"list-group-item list-group-item-action " + (arrangement.id == arrangementId ? "active" : "")} onClick={() => showArrangement(arrangement.id)}>
									{arrangement.name}
								</button>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 bg-white">
          {/* {currentView} */}
        </div>
      </div>
      
      {/* Bottom Controls */}
      <div className="d-flex justify-content-center align-items-center p-3 bg-light border-top">
        <button 
          className={`btn rounded-circle ${isPlaying ? 'btn-danger' : 'btn-success'} d-flex align-items-center justify-content-center`}
          style={{ width: '60px', height: '60px', fontSize: '24px' }}
          onClick={handlePlayStop}
        >
          {isPlaying ? '■' : '▶'}
        </button>
        <button 
          className="btn btn-outline-secondary ms-3"
          onClick={handleShowCode}
        >
          Show Code
        </button>
      </div>
    </div>
  );

	function showArrangement(id) {
		setArrangementId(id);
	}
}

export default StrudelDemo;