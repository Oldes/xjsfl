/**
 * Remove actions
 * @icon	{iconsURI}Design/font/font_delete.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 
(function(){
 	xjsfl.init(this);
	clear();
	
	function frameCallback(frame){
		if(frame.actionScript){
			trace(frame+" "+frame.actionScript);
			frame.actionScript = "";
		}
	}
	
	function removeActions(item){
		//trace("== "+item.name+" ========="+item.itemType);

		switch(item.itemType){
			case "movie clip":
			case "graphic":
				Iterators.layers(item, null, frameCallback, null);
				break;
			
		}
	}
	
	var collection = $$(':selected');
	collection.each(removeActions);
})()