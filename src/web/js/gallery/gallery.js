import DragSortGrid from './dragSortGrid.js';
import Tile from './tile.js'

export default class Gallery {
	constructor(){
		this.grid = new DragSortGrid('#gallery');
	}
	
  PAGESIZE = 155;

  addPdf(pdf) {
		let tiles = [];
    pdf.pages.forEach(page => {
			let canvas = document.createElement('canvas');
			this.renderPageOnCanvas(page, canvas);
      let tile = new Tile(canvas);
      tile.url = pdf.url;
      tiles.push(tile);
    });
    this.grid.addTiles(tiles);
  }

  renderPageOnCanvas(page, canvas) {
    let viewport = page.getViewport({ scale: 1 });
    let scale = 1;
    if(viewport.height >= viewport.width){
      let desiredWidth = 139;
      scale = desiredWidth / viewport.width;
    }
    else{
      let desiredHeight = 139;
      scale = desiredHeight / viewport.width;
    }
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
