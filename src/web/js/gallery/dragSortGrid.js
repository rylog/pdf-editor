export default class DragSortGrid {
  constructor(selector) {
    this.dom = document.querySelector(selector);
    this.tiles = [];
    this.init();
  }

  init(){
    this.dom.addEventListener("dragEvent", (e) => {
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

    this.dom.addEventListener("actionEvent", (e) => {
      switch(e.detail.eventType){
        case "removeTile":
          this.removeTile(e.detail.index)
          break;
      }
    })
  }

  addTiles(tiles){
    let fragment = document.createDocumentFragment();
    tiles.forEach((tile) => {
      tile.updateIndex(this.tiles.length)
      this.tiles.push(tile);
      fragment.appendChild(tile.dom);
    });
    this.dom.appendChild(fragment);
  }

  removeTile(index){
    let tile = this.tiles.splice(index, 1)[0];
    tile.dispose();
    let footerIndex = 0;
    this.tiles.forEach((tile) => {
      tile.updateIndex(footerIndex++);
    })
  }

  changePositions(fromIndex, toIndex) {
    let temp = this.tiles.splice(fromIndex, 1);
    this.tiles.splice(toIndex, 0, temp[0]);
    let fragment = document.createDocumentFragment();
    let index = 0;
    this.tiles.forEach((tile) => {
      tile.updateIndex(index++);
      tile.dom.firstChild.style.transform = "";
      fragment.appendChild(tile.dom);
    });
    gallery.replaceChildren(fragment);
  }

  animateDragEnter(fromIndex, toIndex) {
    this.tiles.forEach((tile) => {
      let index = tile.index;
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
