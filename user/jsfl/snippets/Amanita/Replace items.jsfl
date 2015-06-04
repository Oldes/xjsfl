/**
 * Replace items
 * @icon	{iconsURI}Design/picture/picture_go.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 
(function(){
 	xjsfl.init(this);
	clear();
	
	function layerCallback(layer, index) {
		if (!layer.visible || layer.locked) return false;
	}
	
	function frameCallback(frame){
		//trace(frame);
	}
	
	function elementCallback(element){
		var item = element.libraryItem;
		trace("== "+element+" "+item.name+" ========="+item.itemType);

		/*switch(item.itemType){
			case "movie clip":
			case "graphic":
				Iterators.layers(item, null, frameCallback, null);
				break;
			
		}*/
	}
	
	Iterators.layers($dom.getTimeline(), layerCallback, frameCallback, elementCallback);
    
})()