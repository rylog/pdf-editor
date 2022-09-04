import {
	onDragDrop,
	onDragEnd,
	onDragEnter,
	onDragOver,
	onDragStart,
} from './dragSort.js';

function convertDataToTiles(data) {
	let fragment = document.createDocumentFragment();
	data.forEach((page) => {
	  let tile = createTile(page);
	  fragment.appendChild(tile);
	});
	let gallery = document.getElementById("gallery");
	gallery.appendChild(fragment);
}

function createTile(page) {
  //create tile elements
  let canvas = document.createElement("canvas");
  let canvasContainer = createCanvasContainer();
  let dropZone = createDropZone();

  renderPageOnCanvas(page, canvas);
  applyDragBehaviorToElement(canvasContainer);

  let tile = document.createElement("div");
  tile.className = "tile";

  //append to tile
  canvasContainer.appendChild(canvas);
  tile.appendChild(canvasContainer);
  tile.appendChild(dropZone);
  
  return tile;
}

function createCanvasContainer(){
	var canvasContainer = document.createElement("div");
	canvasContainer.className = "canvas-container";
	canvasContainer.setAttribute("draggable", true);
	return canvasContainer;
}

function createDropZone(){
	let dropZone = document.createElement("div");
	dropZone.className = "dropZone"
	dropZone.ondragenter = (e) => onDragEnter(e);
	return dropZone;
}

function renderPageOnCanvas(page, canvas){
	  let desiredWidth = 120;
	  let viewport = page.getViewport({ scale: 1 });
	  let scale = desiredWidth / viewport.width;
	  let scaledViewport = page.getViewport({ scale: scale });
	  canvas.height = scaledViewport.height;
	  canvas.width = scaledViewport.width;
	  let ctx = canvas.getContext("2d");
	  const renderCtx = {
		canvasContext: ctx,
		viewport: scaledViewport,
	  };
	  page.render(renderCtx);
}

function applyDragBehaviorToElement(elem) {
  //apply drag behavior
  elem.ondragstart = (e) => onDragStart(e);
  elem.ondragover = (e) => onDragOver(e);
  elem.ondragend = (e) => onDragEnd(e);
	elem.addEventListener("drop", onDragDrop);
	elem.addEventListener("dragover", onDragOver);
}

export { convertDataToTiles };
