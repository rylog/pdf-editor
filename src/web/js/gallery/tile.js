class Tile{
	onDragStart(e) {
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
	onDragEnd(){
		document.querySelectorAll(".canvas-container").forEach(canvasContainer => {
			if(canvasContainer != source){
				canvasContainer.style.pointerEvents = "auto";
			}
		})
		changePositions(dragStartIndex, dragEndIndex);
	}
	
	onDragEnter(e) {
		let tile = e.target.parentElement;
		e.preventDefault();
		dragEndIndex = getTileIndex(tile);
		shiftPositions(dragStartIndex, dragEndIndex);
	}
	
	onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.dropEffect = "copy";
	}
	
	onDragDrop(e) {
		//e.preventDefault();
		let dropZone = e.currentTarget
		dragEndIndex = getTileIndex(dropZone);
	}
}