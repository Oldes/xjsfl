﻿/**
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
	//reflections:
	var rPosX = "";
	var rPosY = "";
	var rRot  = "";
	//============
	var currentFrame = -1;
	var patt = /^Bitmaps\//;
	var labels = "";
	var gotoLeft = "";
	var gotoRight = "";
	var currentLayerName = "";
	var walkSensors ="";
	
	var resultURI = $dom.pathURI.slice(0,$dom.pathURI.length-3)+"txt";
	
	
	function roundTo(number, digits){
		if (digits == undefined) digits = 4;
		digits = Math.pow(10, digits);
		return (Math.round(digits * number) / digits);
	}
	function layerCallback(layer, index) {
		if(!layer.visible) return false;
		currentLayerName = layer.name		
		currentFrame = 0;
		trace("LAYER: "+layer.name);
	}
	function frameCallback(frame) { 
		//trace("onFrame "+currentFrame);
		//trace(frame.getMotionObjectXML())
		var name = frame.name;
		if(name) {
			//labels += "\tmLabelNames["+(frame.startFrame+1)+"] = '"+name+"';\n";
			var tmp = "\t"+(frame.startFrame+1)+'\t"'+ name + '"\n';
			switch(currentLayerName){
				case "LEFT":
					gotoLeft += tmp;
					break;
				case "RIGHT":
					gotoRight += tmp;
					break;
				default:
					labels += tmp;
			}
			
		}
		currentFrame++;
	}
	function elementCallback(element) {
		if(currentLayerName == "Positions"){
			posX +=" "+element.transformX;
			posY +=" "+element.transformY;
			scX  +=" "+roundTo(element.scaleX, 3);
			//scY  +=", "+roundTo(element.scaleY, 3);
			rot  +=" "+roundTo(element.skewX * 1.74532925199433E-2); // ROTATION!!

		} else if(currentLayerName == "Reflections"){
			rPosX +=" "+element.transformX;
			rPosY +=" "+element.transformY;
			//scX  +=" "+roundTo(element.scaleX, 3);
			//scY  +=", "+roundTo(element.scaleY, 3);
			rRot  +=" "+roundTo(element.skewX * 1.74532925199433E-2); // ROTATION!!

		} else if(currentLayerName == "Klikadla"){
			if(element.instanceType == "symbol"){
				switch(element.libraryItem.name){
					case "_QuadSensor_":
						walkSensors += "\t"+element.name+"\t\t"+Math.round(element.transformX)+"x"+Math.round(element.transformY)+"\n";
					break;
				}
			}
		}
	}

	Timer.start('Static');
	
	var tl = $dom.getTimeline();
	Iterators.layers(tl, layerCallback, frameCallback, elementCallback);

	Timer.stop(true);
		
		
		result = "posX:  [\n"+ posX.slice(1) +"]\n\n"
			+    "posY:  [\n"+ posY.slice(1) +"]\n\n"
			+    "scale: [\n"+ scX.slice(1)  +"]\n\n"
			+    "rotate:[\n"+ rot.slice(1)  +"]\n\n"
			+    "rPosX:  [\n"+ rPosX.slice(1) +"]\n\n"
			+    "rPosY:  [\n"+ rPosY.slice(1) +"]\n\n"
			+    "rRotate:[\n"+ rRot.slice(1)  +"]\n\n"
			+    "sensors: [\n"+ walkSensors +"]\n\n"
			+    "labelsAt: [\n"+    labels    +"]\n\n"
			+    "labelsLeft: [\n"+  gotoLeft  +"]\n\n"
			+    "labelsRight: [\n"+ gotoRight +"]\n\n"

		trace(result)
		var file	= new File(resultURI, result);
		//trace(labels);
	trace("time: "+Timer.instance.milliseconds);
})()