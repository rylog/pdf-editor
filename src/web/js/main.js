import Gallery from "./gallery/gallery.js";

let fileInput = document.getElementById("file-input");

document.getElementById("save-button").addEventListener("click", savePdf);
fileInput.onchange = (event) => {
  loadFiles(event.target.files);
};

let gallery = new Gallery("gallery");

function loadFiles(files) {
  let readers = [];
  //Read all inputs
  Array.from(files).forEach((file) => {
    readers.push(readFileAsArrayBuffer(file));
  });
  //Await all results and load each document
  Promise.all(readers).then((readResults) =>{
    readResults.forEach(result => loadDocument(new Uint8Array(result)));
  });
}

function savePdf() {
  let payload = gallery.buildSavePayload();
  console.log(payload);
  eel.savePdf(payload);
}


async function loadDocument(arrayBuffer) {
  return new Promise(async (resolve, reject) => {
    try {
      let id = await eel.saveArrayBuffer(Array.from(arrayBuffer))();
      console.log(id);
      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdfDoc = await loadingTask.promise;
      const pdf = {
        pdfId : id,
        pages: await loadPages(pdfDoc),
      }
      gallery.addPdf(pdf);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

async function loadPages(pdf) {
  let promises = [];
  for (let i = 0; i < pdf.numPages; i++) {
    promises.push(pdf.getPage(i + 1));
  }
  return Promise.all(promises);
}

function readFileAsArrayBuffer(file){
  return new Promise((resolve, reject)=>{
    let filereader = new FileReader();
    
    filereader.onload = () => {
      resolve(filereader.result);
    };

    filereader.onerror = () => reject(filereader);

    filereader.readAsArrayBuffer(file);
  })
}