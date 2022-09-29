export default class Tile {
  constructor(content) {
    this.dom = this.createTile(content);
    this.index = 0;
  }

  createTile(content) {
    let contentContainer = this.createContentContainer();
    this.applyDragBehaviorToElement(contentContainer);

    let tile = document.createElement("div");
    tile.className = "tile";

    contentContainer.appendChild(content);
    tile.appendChild(contentContainer);
    tile.appendChild(this.createDropZone());
    tile.appendChild(this.createFooter());

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
    dropZone.addEventListener("dragover", (e) => this.onDragOver(e));
    return dropZone;
  }

  createFooter(){
    let footer = document.createElement("div");
    this.indexTextNode = document.createTextNode(this.index);
    footer.appendChild(this.indexTextNode);
    return footer;
  }

  updateIndex(index){
    this.index = index;
    this.indexTextNode.nodeValue = index;
  }

  applyDragBehaviorToElement(elem) {
    //apply drag behavior
    elem.ondragstart = (e) => this.onDragStart(e);
    elem.ondragover = (e) => this.onDragOver(e);
    elem.ondragend = (e) => this.onDragEnd(e);
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
		this.dispatchDragEvent("dragStart", this.index)
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
		this.dispatchDragEvent("dragEnter", this.index)
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "copy";
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
