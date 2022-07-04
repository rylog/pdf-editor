let tiles = [];
let dragStartIndex;
let dragEndIndex;
let source;

function createTile(page) {
  //create canvas
  let canvas = document.createElement("canvas");
  let canvasContainer = document.createElement("div");
  canvasContainer.className = "canvas-container";
  canvasContainer.appendChild(canvas);
  canvasContainer.setAttribute("draggable", true);
  let dropZone = document.createElement("div");
  dropZone.className = "dropZone"
  dropZone.ondragenter = (e) => onDragEnter(e);
  applyDragBehaviorToElement(canvasContainer);

  //adjust scaling
  var desiredWidth = 120;
  var viewport = page.getViewport({ scale: 1 });
  var scale = desiredWidth / viewport.width;
  var scaledViewport = page.getViewport({ scale: scale });

  canvas.height = scaledViewport.height;
  canvas.width = scaledViewport.width;
  let ctx = canvas.getContext("2d");

  const renderCtx = {
    canvasContext: ctx,
    viewport: scaledViewport,
  };
  page.render(renderCtx);

  let tile = document.createElement("div");
  tile.appendChild(canvasContainer);
  tile.appendChild(dropZone);
  tile.className = "tile";
  return tile;
}

function convertDataToTiles(data) {
  let fragment = document.createDocumentFragment();
  data.forEach((page) => {
    let tile = createTile(page);
    tiles.push(tile);
    //indexing
    tile.setAttribute("data-index", tiles.length - 1);
    tile.addEventListener("drop", onDragDrop);
    tile.addEventListener("dragover", onDragOver);
    fragment.appendChild(tile);
  });
  let gallery = document.getElementById("gallery");
  gallery.appendChild(fragment);
}

function applyDragBehaviorToElement(elem) {
  //apply drag behavior
  elem.ondragstart = (e) => onDragStart(e);
  elem.ondragover = (e) => onDragOver(e);
  elem.ondragend = (e) => onDragEnd(e);
}

function onDragStart(e) {
  dragStartIndex = e.target.parentElement.getAttribute("data-index");
  source = e.target;
  source.className = "selected canvas-container"
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
  e.preventDefault();
  dragEndIndex = parseInt(e.currentTarget.parentElement.getAttribute("data-index"));
  shiftPositions(dragStartIndex, dragEndIndex);
  //e.target.parentNode.insertBefore(source, e.target)
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "copy";
}

function onDragDrop(e) {
  //e.preventDefault();
  dragEndIndex = parseInt(e.currentTarget.getAttribute("data-index"));
}

function changePositions(fromIndex, toIndex) {
  source.className = "canvas-container"
  let temp = tiles.splice(fromIndex, 1);
  tiles.splice(toIndex, 0, temp[0]);
  let fragment = document.createDocumentFragment();
  let i = 0;
  tiles.forEach((tile) => {
    tile.setAttribute("data-index", i++);
    tile.firstChild.style.transform = "";
    fragment.appendChild(tile);
  });
  let gallery = document.getElementById("gallery");
  gallery.replaceChildren(fragment);
}

function shiftPositions(fromIndex, toIndex) {
  if (fromIndex < toIndex) {
    shiftLeft(fromIndex, toIndex);
  } else {
    document.querySelectorAll(".canvas-container").forEach((tile) => {
      var tileIndex = parseInt(tile.parentElement.getAttribute("data-index"));
      let width = document
        .getElementById("gallery")
        .getBoundingClientRect().width;
      let x = 0;
      let y = 0;
      if (fromIndex == toIndex) {
        x = 0;
        y = 0;
      } else if (tileIndex < fromIndex && tileIndex >= toIndex) {
        x = 130;
        let boundingRect = tile.getBoundingClientRect();
        let nColumns = Math.trunc(width / 130);
        if ((tileIndex + 1) % nColumns == 0) {
          x = -(nColumns - 1) * 130;
          y = boundingRect.height;
        }
      }
      tile.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

function shiftLeft(fromIndex, toIndex) {
  document.querySelectorAll(".canvas-container").forEach((tile) => {
    var tileIndex = parseInt(tile.parentElement.getAttribute("data-index"));
    let width = document
      .getElementById("gallery")
      .getBoundingClientRect().width;
    let x = 0;
    let y = 0;
    if (tileIndex > fromIndex && tileIndex <= toIndex) {
      x = -130;
      let boundingRect = tile.getBoundingClientRect();
      let nColumns = Math.trunc(width / 130);
      if (tileIndex % nColumns == 0) {
        x = (nColumns - 1) * 130;
        y = -boundingRect.height;
      }
    }
    tile.style.transform = `translate(${x}px, ${y}px)`;
  });
}

export { createTile, convertDataToTiles };
