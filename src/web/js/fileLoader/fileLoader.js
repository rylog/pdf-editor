export default class PdfReader {

	readFilesAsArrayBuffer(files){
		let readers = [];
		//Read all inputs
		Array.from(files).forEach((file) => {
			readers.push(this.readAsArrayBuffer(file));
		});
		
		return Promise.all(readers);
	}

	async loadDocumentPages(arrayBuffer) {
		return new Promise(async (resolve, reject) => {
			try {
				const pdfDocument = await pdfjsLib.getDocument(arrayBuffer).promise;
				//get pages from the document
				const getPageTasks = [];
				for (let i = 0; i < pdfDocument.numPages; i++) {
					getPageTasks.push(pdfDocument.getPage(i + 1));
				}
				const pages = await Promise.all(getPageTasks)
				resolve(pages);
			} 
			catch (e) {
				reject(e);
			}
		});
	}
	
	readAsArrayBuffer(file){
		return new Promise((resolve, reject)=>{
			let filereader = new FileReader();
			
			filereader.onload = () => {
				resolve(new Uint8Array(filereader.result));
			};
	
			filereader.onerror = () => reject(filereader);
	
			filereader.readAsArrayBuffer(file);
		})
	}
}
