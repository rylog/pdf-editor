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
    contentContainer.appendChild(this.createActions())
    tile.appendChild(contentContainer);
    tile.appendChild(this.createDropZone());
    tile.appendChild(this.createFooter());

    return tile;
  }

  dispose(){
    this.dom.parentNode.removeChild(this.dom); 
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

  createActions(){
    this.actions = document.createElement("div");
    this.actions.className = "actions";
    this.actions.appendChild(this.createAction("remove"));
    return this.actions;
  }

	createAction(actionType) {
		const action = document.createElement("div")
		action.innerHTML += 
		`
      <div class = ${actionType}>
        <svg id= tile-${actionType} class="action-icon" viewBox="0 0 48 48">
          <use class="icon" href="icons/${actionType}.svg#${actionType}-icon" />
        </svg>
      <div>
    `;
    action.addEventListener("click", () => this.dispatchActionEvent(`${actionType}Tile`, this.index))
    return action;
	}

  updateIndex(index){
      this.index = index;
      //Change footer value
      this.indexTextNode.nodeValue = index+1;
  }

  applyDragBehaviorToElement(elem) {
    //apply drag behavior
    elem.onmousedown = (e) => this.onMouseDown(e);
    elem.ondragstart = (e) => this.onDragStart(e);
    elem.ondragover = (e) => this.onDragOver(e);
    elem.ondragend = (e) => this.onDragEnd(e);
  }

  onMouseDown(e) {
    this.source = e.target;
    this.dispatchDragEvent("mouseDown", this.index)
  }

  onDragStart(e) {
    this.source = e.target;
    this.source.classList.add("dragged");
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
    this.source.classList.remove("dragged");
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

  dispatchActionEvent(eventType, index = null){
    const event = new CustomEvent("actionEvent", {
      detail:{
        eventType: eventType,
        index: index,
      }
    })
    this.dom.parentElement.dispatchEvent(event);
  }
}
