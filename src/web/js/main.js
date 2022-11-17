import PdfReader from "./fileLoader/fileLoader.js";
import Gallery from "./gallery/gallery.js";

let view = {
  fileInput : document.getElementById("file-input"),
  main : document.getElementById("main"),
  gallery : document.getElementById("gallery"),
  browse: document.getElementById("browse"),
  saveButton: document.getElementById("save-button")
}

let isGalleryView = false;

view.browse.addEventListener("click", browseFiles);
view.saveButton.addEventListener("click", savePdf);

view.fileInput.onchange = (event) => {
  if(!isGalleryView)
    swapMainView();
  loadFiles(event.target.files);
};

let gallery = new Gallery("gallery");
let pdfReader = new PdfReader();

function swapMainView(){
  view.main.style.display = view.main.style.display == "none" ? "flex" : "none";
  view.gallery.style.display = view.gallery.style.display == "none" ? "flex" : "none"
}

function browseFiles(){
  view.fileInput.click();
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