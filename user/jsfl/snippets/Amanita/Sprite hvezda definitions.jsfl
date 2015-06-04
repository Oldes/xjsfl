/**
 * TEST Sprite definitions for Starling
 * @icon	{iconsURI}Design/picture/picture_go.png
 */
 
(function()
{
	// ----------------------------------------------------------------------------------------------------
	// variables
	
	var bLayerVisible;
	var outputEmbeding = "";
	var outputImages = "";
	var outputTmp = "";
	var outputDefinitions = "";
	var outputQuadSensors = "";
	var hasPngExt = /\.png$/i;
	var assetIndex = 0;
	var container = "";
	
	var lastFolderName;
	// ----------------------------------------------------------------------------------------------------
	// functions
	var patt = /^Bitmaps\//;
	var pattUseLayer = /^_layer/;
	
	
	
	var hvezdy = new Array();

	function outputBitmap(bmp, element){
		var bitmapName = bmp.libraryItem.name;
		//if(!hasPngExt.test(bitmapName)) bitmapName+=".png";
		bitmapName.replace(/\.png$/, '');
		//trace("ImgSprite('"+bitmapName+"', "+element.x+", "+element.y+")");
		var layer = element.layer;
		var parentLayer = layer.parentLayer;
		if(parentLayer && parentLayer.layerType == "folder" && pattUseLayer.test(parentLayer.name)){
			container = parentLayer.name+".";
			if(lastFolderName != parentLayer.name) {
				lastFolderName = parentLayer.name;
				outputDefinitions += "		static public const "+lastFolderName+":Sprite = new Sprite();\n";
			}
		} else {
			container = "";
		}
		name = bitmapName.replace(patt,"");
		var h = hvezdy[name];

		if(h == undefined) h = hvezdy[name] = new Array();
		h.push(element.x, element.y);
		
	}
	// set up the callback functions
    function layerCallback(layer, index) {
		bLayerVisible = layer.visible;
		//trace("LAYER: "+layer.name + " "+bLayerVisible);
	}
    function frameCallback(element) {  }
    function elementCallback(element) {
	    try {
		if(bLayerVisible){
			//trace("ELEMENT: "+element.name + " "+element.elementType +" "+element.instanceType);
			if(element.instanceType == "symbol"){
				if("_QuadSensor_" == element.libraryItem.name){
					var layer = element.layer;
					var parentLayer = layer.parentLayer;
					var target = "this";
					if(parentLayer && parentLayer.layerType == "folder" && pattUseLayer.test(parentLayer.name)){
						target = parentLayer.name;
					}
					outputQuadSensors+="addQuadSensor("+target+", '"+ element.name +"', "+Math.round(element.x)+", "+Math.round(element.y)+",  "+Math.round(element.width)+", "+Math.round(element.height)+");\n";
				} else {
					$library.selectItem(element.libraryItem.name);
					$library.editItem();
					var tmpCollection = $('*');
					if(tmpCollection.elements.length==1){
						var bmp = tmpCollection.elements[0];
						if(bmp.instanceType == "bitmap"){
							outputBitmap(bmp, element);
						}	
					}
					//Iterators.layers(element, layerCallback, frameCallback, elementCallback);
				}

			}else if(element.instanceType == "bitmap"){
				outputBitmap(element, element);
			}
		}
		}catch(error){
			debug(error);
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// code
	xjsfl.init(this);
	clear();
	var context = Context.create();
	
    Iterators.layers($dom.getTimeline(), layerCallback, frameCallback, elementCallback);
    
	for (k in hvezdy){
		trace(k+"=new Vector.<Number>(["+hvezdy[k]+"]);")
	}
    context.goto(); 
   // var temp = xjsfl.uri + 'user/temp/';
	//var file = new File(temp + 'test.bat', 'echo hello').open();

})()