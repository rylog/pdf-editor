export default class Tile {
  constructor(content) {
    this.dom = this.createTile(content);
  }

  createTile(content) {
    let contentContainer = this.createContentContainer();
    let dropZone = this.createDropZone();
    this.applyDragBehaviorToElement(contentContainer);

    let tile = document.createElement("div");
    tile.className = "tile";

    contentContainer.appendChild(content);
    tile.appendChild(contentContainer);
    tile.appendChild(dropZone);

    return tile;
  }

  createContentContainer() {
    var container = document.createElement("div");
    container.className = "content-container";
    container.setAttribute("draggable", true);
    return container;
  }

  createDropZone() {
    let dropZone = document.createElement("div");
    dropZone.className = "dropZone";
    dropZone.ondragenter = (e) => this.onDragEnter(e);
    return dropZone;
  }

  applyDragBehaviorToElement(elem) {
    //apply drag behavior
    elem.ondragstart = (e) => this.onDragStart(e);
    elem.ondragover = (e) => this.onDragOver(e);
    elem.ondragend = (e) => this.onDragEnd(e);
    elem.addEventListener("drop", (e) => this.onDragDrop(e));
    elem.addEventListener("dragover", (e) => this.onDragOver(e));
  }

  onDragStart(e) {
    this.source = e.target;
    this.source.classList.add("selected");
    document
      .querySelectorAll(".content-container")
      .forEach((contentContainer) => {
        if (contentContainer != this.source) {
          contentContainer.style.pointerEvents = "none";
        }
      });
		this.dispatchDragEvent("dragStart", this.getTileIndex(this.dom))
  }

  onDragEnd() {
    document
      .querySelectorAll(".content-container")
      .forEach((contentContainer) => {
        if (contentContainer != this.source) {
          contentContainer.style.pointerEvents = "auto";
        }
      });
    this.source.classList.remove("selected");
		this.dispatchDragEvent("dragEnd");
  }

  onDragEnter(e) {
    e.preventDefault();
		this.dispatchDragEvent("dragEnter", this.getTileIndex(this.dom))
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "copy";
  }

  onDragDrop(e) {
		console.log("drop")
    //e.preventDefault();
    let dropZone = e.currentTarget;
    this.dragEndIndex = this.getTileIndex(dropZone);
  }

  getTileIndex(tile) {
    return [...tile.parentElement.children].indexOf(tile);
  }

  dispatchDragEvent(eventType, index = null) {
    const event = new CustomEvent("dragEvent", {
      detail: {
        eventType: eventType,
        index: index,
      },
    });
    this.dom.parentElement.dispatchEvent(event);
  }
}
