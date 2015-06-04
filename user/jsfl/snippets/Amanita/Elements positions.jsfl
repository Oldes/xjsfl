/**
 * Elements positions
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
			var layer = element.layer;
			var parentLayer = layer.parentLayer;
			if(parentLayer && parentLayer.layerType == "folder" && pattUseLayer.test(parentLayer.name)){
				container = parentLayer.name;
			} else {
				container = "";
			}
			
			/*
			outputTmp       += "		anim = Assets.getTimelineObject('"+element.libraryItem.linkageIdentifier+"') as TimelineMovie;\n"
		//"		img = new Image(Texture.fromBitmap(new BMPAsset"+assetIndex+"() as Bitmap, false));\n"
		                + "		anim.x = "+element.x+"; anim.y = "+element.y+";\n";
			if(element.colorMode == 'alpha'){
				 outputTmp += "		anim.alpha = "+element.colorAlphaPercent/100+";\n";
			}
			if(element.scaleX != 1){
				 outputTmp += "		anim.scaleX = "+element.scaleX+";\n";
			}
			if(element.scaleY != 1){
				 outputTmp += "		anim.scaleY = "+element.scaleY+";\n";
			}
			if(element.skewX != 0){
				 outputTmp += "		anim.skewX = "+element.skewX * 1.74532925199433E-2+";\n";
			}
			if(element.skewY != 0){
				 outputTmp += "		anim.skewY = "+element.skewY * 1.74532925199433E-2+";\n";
			}
			if(element.rotation){
				 outputTmp += "		anim.rotation = "+(element.rotation * 1.74532925199433E-2) +";\n";
			}
		
			outputTmp += "		"+ container +"addChild(anim);\n";
			*/
			
			/*outputTmp += "		addKvet('"+element.libraryItem.linkageIdentifier+"', "+element.x+", "+element.y;
			if(element.scaleX != 1 || element.rotation) outputTmp += ", "+element.scaleX;
			if(element.scaleY != 1 || element.rotation) outputTmp += ", "+element.scaleY;
			if(element.rotation)    outputTmp += ", "+element.rotation * 1.74532925199433E-2;
			outputTmp += ");\n";
			*/
			outputTmp += "		addKytka("+container+", '"+element.libraryItem.name+"', "+element.x+", "+element.y;
			outputTmp += ", "+element.transformX+", "+element.transformY;
			if(element.scaleX != 1 || element.rotation) outputTmp += ", "+element.scaleX;
			if(element.scaleY != 1 || element.rotation) outputTmp += ", "+element.scaleY;
			if(element.rotation)    outputTmp += ", "+element.rotation * 1.74532925199433E-2;
			outputTmp += ");\n";
			
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
    
	trace(outputTmp);
    context.goto(); 
   // var temp = xjsfl.uri + 'user/temp/';
	//var file = new File(temp + 'test.bat', 'echo hello').open();

})()