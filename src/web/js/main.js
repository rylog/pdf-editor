import PdfReader from "./fileLoader/fileLoader.js";
import Gallery from "./gallery/gallery.js";

let view = {

  init: function () {
    this.fileInput = document.getElementById("file-input"),
      this.main = document.getElementById("main"),
      this.editor = document.getElementById("editor"),
      this.browse = document.getElementById("browse"),
      this.browse.addEventListener("click", browseFiles)
  },

  toEditorView: function () {
    this.main.style.display = view.main.style.display == "none" ? "flex" : "none";
    this.editor.style.display = view.editor.style.display == "none" ? "flex" : "none"

    let download = document.getElementById("download");
    let add = document.getElementById("add");
    add.addEventListener("click", browseFiles);
    download.addEventListener("click", downloadPdf);
  },

  browseFiles: function () {
    this.fileInput.click();
  }
}

view.init();
let isGalleryView = false;

view.fileInput.onchange = (event) => {
  if (!isGalleryView)
    view.toEditorView();
  isGalleryView = true;
  loadFiles(event.target.files);
};

let gallery = new Gallery("gallery");
let pdfReader = new PdfReader();

function browseFiles() {
  view.browseFiles();
}

async function loadFiles(files) {
  const readersResults = await pdfReader.readFilesAsArrayBuffer(files);
  readersResults.forEach(async arrayBuffer => {
    let id = await eel.saveArrayBuffer(Array.from(arrayBuffer))();
    const pages = await pdfReader.loadDocumentPages(arrayBuffer, id);
    const pdfInfo = {
      pdfId: id,
      pages: pages,
    };
    gallery.addPdf(pdfInfo);
  });
}

async function downloadPdf() {
  const saveFile = await showSaveFilePicker({
    suggestedName: 'name',
    types: [{
      description: 'Pdf file',
      accept: { 'application/pdf': ['.pdf'] },
    }],
  });

  let payload = gallery.buildSavePayload();
  let b64Pdf = await eel.savePdf(payload)();
  let arrayBuffer = base64ToArrayBuffer(b64Pdf);
  const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  const writableStream = await saveFile.createWritable();
  await writableStream.write(blob);
  await writableStream.close();

}

function base64ToArrayBuffer(base64){
  let binaryString = atob(base64)
  let bytes = new Uint8Array(binaryString.length);
  
  //convert binary string to ascii
  for (let i = 0 ; i < binaryString.length; i++){
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}