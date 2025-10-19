// import './cors-redirect';
import { Editor } from '../editor/editor'
import { MusicControls } from '../music-controls/musicControls'
import './app.css';
import { initStrudel, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../../tunes';

let globalEditor = null;

const appName = "Strudel Mixer"


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

export default function StrudelDemo() {

  const hasRun = useRef(false);
  let strudel = useState(
		new StrudelMirror({
			defaultOutput: webaudioOutput,
			getTime: () => getAudioContext().currentTime,
			transpiler,
			root: document.getElementById('editor'),
			prebake: async () => {
				initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
				const loadModules = evalScope(
					import('@strudel/core'),
					import('@strudel/draw'),
					import('@strudel/mini'),
					import('@strudel/tonal'),
					import('@strudel/webaudio'),
				);
				await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
			},
		})
	);

  useEffect(() => {

    if (!hasRun.current) {
      hasRun.current = true;
      (async () => {
        await initStrudel();

        Proc()
      })();
      document.getElementById('proc').value = stranger_tune
    }

  }, []);


  return (
    <div>
      <h2>{appName}</h2>
      <main>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
              <Editor />
            </div>
            <div className="col-md-4">

              <MusicControls playFn={strudel.evaluate} pauseFn={strudel.stop} processFn={Proc}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <div id="editor" />
            </div>
            <div className="col-md-4">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  p1: ON
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  p1: HUSH
                </label>
              </div>
            </div>
          </div>
        </div>

      </main >
    </div >
  );


}

