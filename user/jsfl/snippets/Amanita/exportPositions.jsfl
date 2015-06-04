/**
 * Export bitmap positions
 * @icon	{iconsURI}Design/picture/picture_go.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 
(function(){
	xjsfl.init(this);
	clear();
	var posX = "";
	var posY = "";
	var rot = "";
	var scaleX = "";
	var scaleY = "";
	
	function roundTo(number, digits){
		if (digits == undefined) digits = 4;
		digits = Math.pow(10, digits);
		return (Math.round(digits * number) / digits);
	}
	
	try {
		function layerCallback(layer, index) {
			bLayerVisible = layer.visible;
			//trace("LAYER: "+layer.name + " "+bLayerVisible);
		}
		function frameCallback(element) {  }
		function elementCallback(element) {
			try {
			if(bLayerVisible){
				//trace("ELEMENT: "+element.libraryItem.name + " "+element.elementType +" "+element.instanceType +" "+element.x);
				posX +=", "+element.transformX;
				posY +=", "+element.transformY;
				scaleX += ", "+roundTo(element.scaleX, 3);
				scaleY += ", "+roundTo(element.scaleY, 3);
				rot  +=", "+roundTo(element.skewX * 1.74532925199433E-2, 4);
			}
			}catch(error){
				debug(error);
			}
		}

		Iterators.layers($dom.getTimeline(), layerCallback, frameCallback, elementCallback);
		trace("mPositionsX = "+posX);
		trace("\nmPositionsY = "+posY);
		trace("\nmScaleX = "+scaleX);
		trace("\nmScaleY = "+scaleY);
		trace("\nmRotation = "+rot);
	} catch(err){ debug(err);}
})()