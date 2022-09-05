import Tile from "./tile.js";

export default class DragSortGrid {
  constructor(selector) {
    this.dom = document.querySelector(selector);
    this.dom.addEventListener("dragEvent", (e) => {
      console.log(e.detail);
      switch(e.detail.eventType){
        case "dragStart":
          this.dragStartIndex = e.detail.index;
          break;
        case "dragEnter":
          this.dragEndIndex = e.detail.index;
          this.animateDragEnter(this.dragStartIndex, this.dragEndIndex);
          break;
        case "dragEnd":
          this.changePositions(this.dragStartIndex, this.dragEndIndex);
          break;
      }
    });
    this.tiles = [];
  }

  addTiles(itemList) {
    let fragment = document.createDocumentFragment();
    itemList.forEach((item) => {
      let tile = new Tile(item);
      this.tiles.push(tile);
      fragment.appendChild(tile.dom);
    });

    this.dom.appendChild(fragment);
  }

  changePositions(fromIndex, toIndex) {
  
    let temp = this.tiles.splice(fromIndex, 1);
    this.tiles.splice(toIndex, 0, temp[0]);
    let fragment = document.createDocumentFragment();
    this.tiles.forEach((tile) => {
      tile.dom.firstChild.style.transform = "";
      fragment.appendChild(tile.dom);
    });
    gallery.replaceChildren(fragment);
  }

  animateDragEnter(fromIndex, toIndex) {
    console.log("changing");
    //shift all tile positions according to dragStart and dragEnter positions
    this.tiles.forEach((tile) => {
      let index = tile.getTileIndex(tile.dom);
      let width = document
        .getElementById("gallery")
        .getBoundingClientRect().width;
      let x = 0;
      let y = 0;
      if (fromIndex == toIndex) {
        x = 0;
        y = 0;
      } else if (index > fromIndex && index <= toIndex) {
        let boundingRect = tile.dom.getBoundingClientRect();
        x = -boundingRect.width;
        let nColumns = Math.trunc(width / boundingRect.width);
        if (index % nColumns == 0) {
          x = (nColumns - 1) * boundingRect.width;
          y = -boundingRect.height;
        }
      } else if (index < fromIndex && index >= toIndex) {
        let boundingRect = tile.dom.getBoundingClientRect();
        x = boundingRect.width;
        let nColumns = Math.trunc(width / boundingRect.width);
        if ((index + 1) % nColumns == 0) {
          x = -(nColumns - 1) * boundingRect.width;
          y = boundingRect.height;
        }
      }
      tile.dom.firstChild.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}
