'use strict';
(() => {
  let callback=null,kind='scenario';
  const input=document.getElementById('import-file');
  const editor=document.getElementById('editor-dialog');
  const bridge={
    state:null,
    connectGame(fn){callback=fn;document.getElementById('backup-save').disabled=false;document.getElementById('restore-save').disabled=false},
    report(json){this.state=JSON.parse(json);document.getElementById('turn-label').textContent='第'+this.state.turn+'期 / 六河争流';document.getElementById('storage-warning').hidden=this.state.persistent},
    pick(type){kind=type;input.value='';input.click()},
    openEditor(){const frame=document.getElementById('editor-frame');if(!frame.getAttribute('src'))frame.src='editor.html';editor.showModal()}
  };
  window.MobBrowser=bridge;
  input.addEventListener('change',async()=>{
    const file=input.files[0];if(!file||!callback)return;
    if(file.size>20*1024*1024){alert('20MB以下のJSONファイルを選んでください。');return}
    try{const text=await file.text();JSON.parse(text);callback(kind,text)}catch(error){alert('JSONファイルを読み込めませんでした。\n'+error.message)}
  });
  document.getElementById('backup-save').onclick=()=>{if(callback)callback('export')};
  document.getElementById('restore-save').onclick=()=>bridge.pick('save');
  document.getElementById('open-editor').onclick=()=>bridge.openEditor();
  document.getElementById('close-editor').onclick=()=>{editor.close();document.getElementById('canvas').focus()};
  document.getElementById('fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{})};
})();
