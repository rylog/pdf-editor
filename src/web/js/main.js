import Gallery  from "./gallery/gallery.js";

const url = "../../1A_structure.pdf";
const url2 = "../../1903724 Ryan Lo Examen INF8405.pdf"

let pdfDoc = null,
  nPages = 0,
  pdfIsRendering = false;

pdfjsLib.getDocument(url2).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  nPages = pdfDoc.numPages;
  loadPdf();
});

//render the PDF
async function loadPdf() {
  let promises = [];
  let gallery = new Gallery('gallery');
  for (let i = 0; i < nPages; i++) {
    promises.push(pdfDoc.getPage(i + 1));
    console.log(pdfDoc.getPage(1));
  }
  const data = await Promise.all(promises);
  gallery.loadPdf(data);
}
