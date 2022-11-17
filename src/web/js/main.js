import PdfReader from "./fileLoader/fileLoader.js";
import Gallery from "./gallery/gallery.js";

let fileInput = document.getElementById("file-input");
let fileUpload = document.getElementById("file-upload")
let saveButton = document.getElementById("save-button")

document.getElementById("browse").addEventListener("click", browseFiles);
document.getElementById("save-button").addEventListener("click", savePdf);

fileInput.onchange = (event) => {
  if(fileUpload.style.display != "flex"){
    fileUpload.style.display = "none"
  }
  loadFiles(event.target.files);
};

let gallery = new Gallery("gallery");
let pdfReader = new PdfReader();


function browseFiles(){
  fileInput.click();
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

function savePdf() {
  let payload = gallery.buildSavePayload();
  eel.savePdf(payload);
}