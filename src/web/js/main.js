import Gallery  from "./gallery/gallery.js";

const url1 = "../../1A_structure.pdf";
const url2 = "../../1903724 Ryan Lo Examen INF8405.pdf"

let pdfDoc = null,
  nPages = 0,
  pdfIsRendering = false;

let gallery = new Gallery('gallery');

loadPdfs([url1, url2]);

async function loadPdfs(urlList){
  for(let url of urlList){
    await loadPdf(url);
  }
}

async function loadPdf(url){
  return new Promise(async (resolve, reject)=>{
    try{
      const loadingTask = pdfjsLib.getDocument(url);
      const pdfDoc = await loadingTask.promise;
      const pdf = {
        url :url,
        pages: await loadPdfPages(pdfDoc)
      }
      gallery.addPdf(pdf);
      resolve();
    }
    catch(e){
      reject();
    }
  })
}

async function loadPdfPages(pdf) {
  let promises = [];
  for (let i = 0; i < pdf.numPages; i++) {  
    promises.push(pdf.getPage(i + 1));
  }
  return Promise.all(promises);
}
