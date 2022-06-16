const url = '../../Transcript_RyanLo_FR.pdf';

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
	console.log(data);
	data.forEach((page) =>{
		addToGallery(page);
	})
	 
};

const addToGallery = (page) => {
	let canvas = document.createElement('canvas');
	let gallery = document.getElementById("gallery")
	gallery.appendChild(canvas);
	
	var desiredWidth = 108;
	var viewport = page.getViewport({ scale: 1, });
	var scale = desiredWidth / viewport.width;
	var scaledViewport = page.getViewport({ scale: scale, });
	canvas.height = scaledViewport.height;
	canvas.width = scaledViewport.width;
	let ctx = canvas.getContext('2d')
	
	
	const renderCtx = {
		canvasContext: ctx,
		viewport : scaledViewport,
	}
	page.render(renderCtx);

}



