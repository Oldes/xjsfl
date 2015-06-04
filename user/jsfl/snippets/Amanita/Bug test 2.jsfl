/**
 * Collects walk data, sensor positions and walk labels
 * @icon	{iconsURI}Design/picture/picture_go.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 
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
	var labels = "";
	var gotoLeft = "";
	var gotoRight = "";
	var currentLayerName = "";
	var walkSensors ="";
	
	function roundTo(number, digits){
		if (digits == undefined) digits = 4;
		digits = Math.pow(10, digits);
		return (Math.round(digits * number) / digits);
	}
	
	var time = new Date().getTime();

	
	var dom = fl.getDocumentDOM();
	var timeline = dom.getTimeline();
	for(var j=0;j<timeline.layerCount;j++){
		var layer = timeline.layers[j];
		if(layer.visible){
			currentLayerName = layer.name		
			currentFrame = 0;
			//trace("LAYER: "+layer.name);
			var frameCount = layer.frameCount;
			for(var f=0; f<frameCount; f++){
				var frame = layer.frames[f];
				if(frame) {
					if(frame.startFrame == f){

						var tmp = "\t"+(frame.startFrame+1)+'\t"'+ frame.name + '"\n';
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
						//fl.trace("ELEMENTS: "+frame.elements.length);
						var elementCount = frame.elements.length;
						for(var e=0; e<elementCount; e++){
							var element = frame.elements[e];
							if(currentLayerName == "Positions"){
								posX +=" "+element.transformX;
								posY +=" "+element.transformY;
								scX  +=" "+roundTo(element.scaleX, 3);
								//scY  +=", "+roundTo(element.scaleY, 3);
								rot  +=" "+roundTo(element.skewX * 1.74532925199433E-2); // ROTATION!!
	
							} else if(currentLayerName == "Reflections"){
								rPosX +=" "+element.transformX;
								rPosY +=" "+element.transformY;
								scX  +=" "+roundTo(element.scaleX, 3);
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
					}
				}
			}
		}
	}
	
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

	fl.trace(result)

	fl.trace("DONE in "+(new Date().getTime()-time)+"ms");
