var tiles = [];
const addPageToGallery = (page) => {

	//create canvas
	let canvas = document.createElement('canvas');
	let div = document.createElement('div');
	div.className = "canvas-container";
	div.appendChild(canvas);
	div.setAttribute('draggable', true);
	let gallery = document.getElementById("gallery");
	gallery.appendChild(div);
	
	//tracking
	// div.index = index;
	// tiles.push(div);

	//apply drag behavior
	div.onmousedown = (e) => onMouseDown(e);
	div.ondragenter = (e) => onDragEnter(e);
	div.ondragstart = (e) => onDragStart(e);
	div.ondragover = (e) =>{
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}
	//div.onmouseup = (e) => onMouseUp(e);
	
	//adjust scaling
	var desiredWidth = 120;
	var viewport = page.getViewport({ scale: 1, });
	var scale = desiredWidth / viewport.width;
	var scaledViewport = page.getViewport({ scale: scale, });

	canvas.height = scaledViewport.height;
	canvas.width = scaledViewport.width;
	let ctx = canvas.getContext('2d')
	
	
	const renderCtx = {
		canvasContext: ctx,
		viewport : scaledViewport,
	}
	page.render(renderCtx);

}
var source;

const onMouseDown = (e) =>{
	source = e.currentTarget;
	e.style.cursor = 'move';
	e.preventDefault();
}

const onDragStart = (e) =>{
	e.dataTransfer = "move";
	//e.preventDefault()
	
}


const onDragEnter = (e) =>{
	if(source != e.currentTarget){
		let target = e.currentTarget;
		target = target !== source.nextSibling? 
		target :
		target.nextSibling;
		gallery.insertBefore(source, target	);
	}
	// console.log("enter");
	// e.preventDefault();
	// if(source !== e.currentTarget){
	//  	changePositions(source, e.currentTarget);
	// }
	//e.target.parentNode.insertBefore(source, e.target)	
}



const changePositions = (source, target)=> {
	// if(source.index > target.index){
	// 	gallery.insertBefore(source, target)
	// 	let temp = tiles.splice(source, 1);
	// 	tiles.splice(target, 0, temp[0]);
	// 	for(let i = target.index; i < source.index; i++){
	// 		tiles[i].index++;
	// 	}
	// 	source.index = target.index-1;
		
	// }
	
}

export{ addPageToGallery }