import DragSortGrid from './dragSortGrid.js';
export default class Gallery {
	constructor(){
		this.grid = new DragSortGrid('#gallery');
	}
	
  loadPdf(data) {
		let itemList = [];
    data.forEach((page) => {
			let canvas = document.createElement('canvas');
			this.renderPageOnCanvas(page, canvas);
      itemList.push(canvas);
    });
    this.grid.addTiles(itemList);
  }

  renderPageOnCanvas(page, canvas) {
    let desiredWidth = 120;
    let viewport = page.getViewport({ scale: 1 });
    let scale = desiredWidth / viewport.width;
    let scaledViewport = page.getViewport({ scale: scale });
    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;
    let ctx = canvas.getContext('2d');
    const renderCtx = {
      canvasContext: ctx,
      viewport: scaledViewport,
    };
    page.render(renderCtx);
  }
}
