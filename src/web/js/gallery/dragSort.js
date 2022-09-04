let dragStartIndex;
let dragEndIndex;
let source;

function onDragStart(e) {
	let tile = e.target.parentElement;
  dragStartIndex = getTileIndex(tile);
  source = e.target;
  source.classList.add("selected");
  document.querySelectorAll(".canvas-container").forEach(canvasContainer => {
    if(canvasContainer != source){
      canvasContainer.style.pointerEvents = "none";
    }
  })
}
function onDragEnd(){
  document.querySelectorAll(".canvas-container").forEach(canvasContainer => {
    if(canvasContainer != source){
      canvasContainer.style.pointerEvents = "auto";
    }
  })
  changePositions(dragStartIndex, dragEndIndex);
}

function onDragEnter(e) {
	let tile = e.target.parentElement;
  e.preventDefault();
  dragEndIndex = getTileIndex(tile);
  shiftPositions(dragStartIndex, dragEndIndex);
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "copy";
}

function onDragDrop(e) {
  //e.preventDefault();
	let dropZone = e.currentTarget
  dragEndIndex = getTileIndex(dropZone);
}

function changePositions(fromIndex, toIndex) {
  source.classList.remove("selected");
  let gallery = document.getElementById("gallery");
  let tiles = [...gallery.children];
  let temp = tiles.splice(fromIndex, 1);
  tiles.splice(toIndex, 0, temp[0]);
  let fragment = document.createDocumentFragment();
  tiles.forEach((tile) => {
    tile.firstChild.style.transform = "";
    fragment.appendChild(tile);
  });
  gallery.replaceChildren(fragment);
}

function shiftPositions(fromIndex, toIndex){
  //shift all tile positions according to dragStart and dragEnter positions
  document.querySelectorAll(".canvas-container").forEach((canvasContainer) => {
    let tile = canvasContainer.parentElement;
    var tileIndex = getTileIndex(tile);
    let width = document
      .getElementById("gallery")
      .getBoundingClientRect().width;
    let x = 0;
    let y = 0;

    if (fromIndex == toIndex) {
      x = 0;
      y = 0;
    } else if (tileIndex > fromIndex && tileIndex <= toIndex) {
      let boundingRect = tile.getBoundingClientRect();
      x = -boundingRect.width;
      let nColumns = Math.trunc(width / boundingRect.width);
      if (tileIndex % nColumns == 0) {
        x = (nColumns - 1) * boundingRect.width;
        y = -boundingRect.height;
      }
    } else if (tileIndex < fromIndex && tileIndex >= toIndex) {
      let boundingRect = tile.getBoundingClientRect();
      x = boundingRect.width;
      let nColumns = Math.trunc(width / boundingRect.width);
      if ((tileIndex + 1) % nColumns == 0) {
        x = -(nColumns - 1) * boundingRect.width;
        y = boundingRect.height;
      }
    }
    canvasContainer.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function getTileIndex(tile){
	return [...tile.parentElement.children].indexOf(tile);
}

export { onDragDrop, onDragEnd, onDragEnter, onDragOver, onDragStart };