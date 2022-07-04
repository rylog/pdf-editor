import { convertDataToTiles } from "./modules/gallery.js";
const url = "../../1A_structure.pdf";

let pdfDoc = null,
  nPages = 0,
  pdfIsRendering = false;

pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  nPages = pdfDoc.numPages;
  loadPdf();
});

//render the PDF
async function loadPdf() {
  let promises = [];
  for (let i = 0; i < nPages; i++) {
    promises.push(pdfDoc.getPage(i + 1));
    console.log(pdfDoc.getPage(1));
  }
  const data = await Promise.all(promises);
  convertDataToTiles(data);
}
