/**
 * Export path animation
 * @icon	{iconsURI}Design/picture/picture_go.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 
(function(){
 	xjsfl.init(this);
	clear();
	var posX = "";
	var posY = "";
	var regX = ""
	var regY = "";
	var scX = "";
	var scY = "";
	var rot = "";
	var skewX = "";
	var skewY = "";
	var imgcase = "";
	var lastimg = "";
	var images = new Array(); 
	var imagesStr = "";
	var currentFrame = -1;
	var patt = /^Bitmaps\//;
	var labels = "";
	
	function roundTo(number, digits){
		if (digits == undefined) digits = 4;
		digits = Math.pow(10, digits);
		return (Math.round(digits * number) / digits);
	}
	try {
		function layerCallback(layer, index) {
			bLayerVisible = layer.visible;
			currentFrame = 0;
			//trace("LAYER: "+layer.name + " "+bLayerVisible);
		}
		function frameCallback(frame) { 
			
			if(bLayerVisible){
				//trace("onFrame "+currentFrame);
				//trace(frame.getMotionObjectXML())
				var name = frame.name;
				if(name) {
					labels += "\tmLabelNames["+(frame.startFrame+1)+"] = '"+name+"';\n";
				}
				currentFrame++;
			}
		}
		function elementCallback(element) {
			try {
			if(bLayerVisible){
				//trace("ELEMENT: "+element.libraryItem.name + " "+element.elementType +" "+element.instanceType +" "+element.x);
				var child = null;
				var childLayers, childElement, name="";
				switch(element.elementType) {
					case "instance":
						var childLayers = element.libraryItem.timeline.layers;
						if(childLayers.length>0){
							child = element.libraryItem.timeline.layers[0].frames[element.firstFrame].elements[0];
							if(child.libraryItem) name = child.libraryItem.name;
						}
						break;
					case "bitmap":
						name = element.libraryItem.name;
						break;
				}
				//var name = element.libraryItem.timeline.layers[0].frames[element.firstFrame].elements[0].libraryItem.name;//"" + element.firstFrame; //element.libraryItem.name;
				if(lastimg != name){
					var index = images.indexOf(name);
					
					if(index<0) {
						//trace(element.libraryItem.timeline.layers[0].frames[element.firstFrame].elements[0].libraryItem.name)
						images.push(name);
						index = images.length-1;
						//imagesStr += ", '"+name.replace(patt, "")+"'";
						imagesStr += "mImages["+index+"] = Assets.getImage('"+name.replace(patt, "")+"');\n";
						if(child){
							imagesStr += "mImages["+index+"].x="+child.x+"; "
										+"mImages["+index+"].y="+child.y+";\n"
						}
					}
					imgcase += "mImageChanges["+currentFrame+"]="+ index +";\n";
					lastimg = name;
				}
				posX +=", "+element.transformX;
				posY +=", "+element.transformY;
				scX  +=", "+roundTo(element.scaleX, 3);
				scY  +=", "+roundTo(element.scaleY, 3);
				rot  +=", "+roundTo(element.skewX * 1.74532925199433E-2);
				skewX  +=", "+roundTo(element.skewX * 1.74532925199433E-2);
				skewY  +=", "+element.skewY * 1.74532925199433E-2;
				var pivot = element.getTransformationPoint();
				//trace("? "+pivot.x+" "+pivot.y+" "+element.transformX+" "+element.x);
				regX +=", "+roundTo(pivot.x,2);
				regY +=", "+roundTo(pivot.y,2);
			}
			}catch(error){
				debug(error);
			}
		}

		Iterators.layers($dom.getTimeline(), layerCallback, frameCallback, elementCallback);
		posX = "Vector.<Number>(["+posX.slice(2)+"]);";
		posY = "Vector.<Number>(["+posY.slice(2)+"]);";
		regX = "Vector.<Number>(["+regX.slice(2)+"]);";
		regY = "Vector.<Number>(["+regY.slice(2)+"]);";
		scX = "Vector.<Number>(["+scX.slice(2)+"]);";
		scY = "Vector.<Number>(["+scY.slice(2)+"]);";
		rot = "Vector.<Number>(["+rot.slice(2)+"]);";
		skewX = "Vector.<Number>(["+skewX.slice(2)+"]);";
		skewY = "Vector.<Number>(["+skewY.slice(2)+"]);";
		trace(imagesStr);
		trace(imgcase);
		trace("static private const mPositionsX:Vector.<Number> = "+posX);
		trace("static private const mPositionsY:Vector.<Number> = "+posY);
		//trace("static private const mPivotsX:Vector.<Number> = "+regX);
		//trace("static private const mPivotsY:Vector.<Number> = "+regY);
		trace("static private const mScalesX:Vector.<Number> = "+scX);
		//trace("static private const mScalesY:Vector.<Number> = "+scY);
		trace("static private const mRotations:Vector.<Number> = "+rot);
		//trace("static private const mSkewX:Vector.<Number> = "+skewX);
		//trace("static private const mSkewY:Vector.<Number> = "+skewY);
		trace(labels);

	} catch(err){ debug(err);}
})()