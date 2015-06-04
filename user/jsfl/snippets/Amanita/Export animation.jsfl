/**
 * Export animation
 * @icon	{iconsURI}Design/picture/picture_go.png
 */
 
(function()
{
/*

$dom; // same as fl.getDocumentDOM()

context.layer;        // access the actual Flash layer object
context.frame;        // access the context's frame object
context.keyframes;    // access the keyframes from within the current context's layer
context.elements;     // access the elements within the context's frame

context.setLayer(3);  // update the context layer
context.update();     // update the context to the current IDE context
context.goto();       // force Flash to change the window and timeline to the supplied context

s1: bitmap "bla"
s2: symbol [
	place s1 100x100
	showFrame
	showFrame
	showFrame
	place s1 200x100
]
s3: symbol [
	place s2 0x0
	place s1 0x200
	showFrame
]
*/
	xjsfl.init(this);
	clear();
	var indent = "";
	var items = [];
	var elements="";
	var tmpElements = "";
	var symbols = [];
	var bitmaps = [];
	var duplicates = [];
	var aliasses = new Array();
	var curSymbol, curFrame, curObjects, curTimeline;
	var stackSymbols = [];
	
	function sortNumber(a,b){return a - b;}

	function layerCallback(layer, index, layers, context) {
		//trace(indent+"LAYER: "+layer.name +" "+layer.animationType);
		if(layer.animationType == "IK pose"){
			//inspect(layer);
			
		}
		if(!layer.visible) return false;
		if(curTimeline) curTimeline.setSelectedLayers(index)
	}
    function frameCallback(frame, index, frames, context) {
		//trace(indent+"FRAME: "+index+" elements: "+frame.elements.length+" "+curSymbol.name)


		curFrame = frame;
		
		
		if(curSymbol.frames[index]==null){
			curSymbol.frames[index] = [frame];
			curSymbol.numFrames++;
		} else {
			//trace("AAAAAAAAAAAAAAAAAAAAAAAA");
			curSymbol.frames[index].push(frame);
		}
	}
    function elementCallback(element) {
		trace(indent+"ELEMENT: "+element +" "+element.elementType+" "+element.instanceType+" "+element.libraryItem.name);
		trace("??? "+element.symbolType);
		if(element.libraryItem && items.indexOf(element.libraryItem) === -1) {
			exportAnimation(element.libraryItem);
		}
	}
	
	function convertToKeyframesCallback(frame, index, frames, context) {
		//trace(indent+"XXXXXFRAME: "+index+" tweenType:"+frame.tweenType+" duration:"+frame.duration);
		if(frame.duration > 1){
			curTimeline.setSelectedFrames(index, index+frame.duration);
			curTimeline.convertToKeyframes();//0, dLayers[f].frameCount);
		}
	}

	function exportAnimation(item){
		trace("== "+item.name+" =========");
		//$library.selectItem(item.name);
		//$library.editItem();
		trace(">> "+item+" "+item.itemType);
		switch(item.itemType){
			case "movie clip":
			case "graphic":
				$library.duplicateItem(item.name);
				//inspect($library.items);
				var duplicated = $library.items[$library.findItemIndex(item.name+" copy")];
				duplicates.push(duplicated.name);
				curTimeline = duplicated.timeline;
				Iterators.layers(duplicated, layerCallback, convertToKeyframesCallback, null);
				curTimeline = null;
				/*var dLayers = duplicated.timeline.layers;
				for(var f=0; f<dLayers.length; f++){
					if(dLayers[f].frameCount>1 && dLayers[f].visible){
						duplicated.timeline.setSelectedFrames(0,dLayers[f].frameCount);
						duplicated.timeline.convertToKeyframes();//0, dLayers[f].frameCount);
					}
				}*/
				
				//inspect(duplicated);
				items.push(item);
			
				if(curSymbol) stackSymbols.push(curSymbol);
				curSymbol = {
					name: item.name,
					item: duplicated,
					frames: {},
					numFrames: 0
				}
				symbols.push(curSymbol);
						
				indent += "\t";
				
				//list(stackSymbols, 'name');
				//trace("-->>"+curSymbol.name);
				Iterators.layers(duplicated, layerCallback, frameCallback, elementCallback);
				curSymbol = stackSymbols.pop();
				if(curSymbol) trace("<--"+curSymbol.name);
				
				indent = indent.slice(1);
				
				//$library.deleteItem(item+" copy");
			break;
			case "bitmap":
				if(bitmaps.indexOf(item) === -1) bitmaps.push(item);
			break;
		}
		
		//trace(elements);
	}
	
	function processSymbols(symbol){
		trace("PROCESS SYMBOL: "+symbol.item.itemName);
				
		var tmp;
		var item = symbol.item;
		var oFrames = symbol.frames;
		var lastFrameNum = 0;
		
		if(
		
		   symbol.numFrames==1 //there is just one frame in the symbol
		   && oFrames[0].length == 1 //and just one layer
		   && oFrames[0][0].elements.length == 1 //with just one element
		   && (tmp = oFrames[0][0].elements[0])
		   && tmp.instanceType == "bitmap" //which is bitmap
		   && firstSelectedElementName != symbol.name //it's not the root symbol of the animation
		){
			aliasses[symbol.name] = tmp.libraryItem.name;
			result += "Image %"+tmp.libraryItem.name+" "+
					+  tmp.x + " "
					+  tmp.y + " "
					+  tmp.transformX + " "
					+  tmp.transformY + " "
					+  tmp.rotation + " "
					+  tmp.scaleX + " "
					+  tmp.scaleY + " "
					+  tmp.skewX + " "
					+  tmp.skewY + "\n";
			//result += "Alias %"+symbol.name+" %"+tmp.libraryItem.name+"\n";
			//inspect(frames[0][0].elements[0]);
			
		} else {			
			result += "Symbol %"+symbol.name+" [\n";
			//inspect(oFrames);
			var klen, k, i, keys = [];
			for (k in oFrames) keys.push(k);
			keys.sort(sortNumber);
			//trace("KEYS "+keys);
			klen = keys.length;
			
			var curObjects = [];
	
			
			for (i = 0; i < klen; i++) {
				var key = keys[i];
				var aFrames = oFrames[key];
				var fNum = parseInt(key);
				if(lastFrameNum < fNum){
					/*while(lastFrameNum < fNum){
						result += "\tshowFrame\n";
						lastFrameNum++;
					}*/
					result += "\tshow "+(fNum - lastFrameNum)+" frames\n";
					lastFrameNum = fNum;
				}
				
				var len = aFrames.length;
				var objResult = ""
				for(var n=0 ;n<len; n++){
					//PER KEY-FRAME ACTION (per LAYER!)
					var currentFrame = oFrames[key][n];
					//inspect(currentFrame);
					var currentFrameIndex = currentFrame.startFrame;
					var currentFrameLast = currentFrameIndex + currentFrame.duration;
					
					//remove objects...
					var j=curObjects.length;
					while(j>0){
						j--;
						var o = curObjects[j];
						if(o.lastFrame <= currentFrameIndex){
							curObjects.splice(j,1);
						}
					};
					
					var elements = currentFrame.elements;
					var elen = elements.length;

					if(elen>0){ //not empty frame on layer
						for(var e=0 ;e<elen; e++){
							//inspect(elements[e]);
							var element = elements[e];
							curObjects.push({
								element: element,
								lastFrame: currentFrameLast
							});
							//objResult += "\t\t%"+element.libraryItem.name+" "+element.x+" "+element.y+" "+element.rotation+"\n";
						}
					}

				}
				var j=curObjects.length;
				while(j>0){
					j--;
					element = curObjects[j].element;
					//var objName = aliasses[element.libraryItem.name];
					//if(objName==null)
						objName = element.libraryItem.name;
					objResult += "\t\t%"
							  +  objName + " "
							  +  element.x + " "
							  +  element.y + " "
							  +  element.transformX + " "
							  +  element.transformY + " "
							  +  element.rotation + " "
							  +  element.scaleX + " "
							  +  element.scaleY + " "
							  +  element.skewX + " "
							  +  element.skewY + "\n";
				};
				if(objResult!=""){
					result += "\tobjects [\n"+objResult+"\t]\n";
					//result += "\n"+objResult;
				} else {
					result += "\tobjects []\n";
				}
				
			}
			result += "\tshowFrame\n]\n";
		}
		
	}
	var context = Context.create();
	stackSymbols = [];

	var collection = $$(':selected');
	var firstSelectedElementName = collection.elements[0].name;
	fl.showIdleMessage(false); 
	collection.each(exportAnimation);
	
	
	//trace("BITMAPS:"); list(bitmaps, 'name');
   // list(items, ['name', 'itemType']);
	//list(symbols);
	//trace(curSymbol.name);
	//inspect(symbols);
	
	
	var result = "";
	if(bitmaps.length>0){
		result = "Images [\n";
		for(var n=0; n< bitmaps.length; n++){
			var bmp = bitmaps[n];
			result += "\t%"+bmp.name+"\n";
		}
		result += "]\n";
	}

	var collection = new ItemCollection(symbols);
	collection.reach(processSymbols);
	//list(duplicates);
	for(var n=0; n<duplicates.length;n++){
		trace("DELETING: "+$library.deleteItem(duplicates[n]) +" <== "+duplicates[n] );
	}
	fl.showIdleMessage(true);
	
	var aliasResult = "Alias [\n";
	for(var key in aliasses){
		aliasResult += "\t%" + key +" %"+aliasses[key]+"\n";
	}
	
	result = aliasResult +"]\n\n"+ result;
	trace("=-=-=-=-=-=\n\n"+result);
	var temp = xjsfl.uri + 'user/temp/';
	var file = new File(temp + 'test.txt', result) //.open();

	context.goto();
	$library.selectItem(firstSelectedElementName);
})()