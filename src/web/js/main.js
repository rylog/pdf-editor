import { addPageToGallery } from "./modules/gallery.js"; 
const url = '../../1A_structure.pdf';

let pdfDoc = null,
nPages = 0,
pdfIsRendering = false;

pdfjsLib.getDocument(url).promise.then(pdfDoc_ =>{
	pdfDoc = pdfDoc_;
	nPages = pdfDoc.numPages;
	loadPdf();
})

//render the PDF
const loadPdf = async () => {
	let promises = []; 
	for (let i = 0; i < nPages; i ++){
		promises.push(pdfDoc.getPage(i+1))
		console.log(pdfDoc.getPage(1));
	}
	const data = await Promise.all(promises);
	let i = 0;
	data.forEach((page) =>{
		addPageToGallery(page);
	})
	 
};





