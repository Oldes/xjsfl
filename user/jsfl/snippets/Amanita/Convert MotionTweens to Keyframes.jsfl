/**
 * Convert MotionTweens to Keyframes
 * @icon	{iconsURI}Design/picture/picture_go.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 
(function(){
 	xjsfl.init(this);
	clear();
	
	var bLayerVisible;
	
	try {
		function layerCallback(layer, index) {
			bLayerVisible = layer.visible;
			//trace("LAYER: "+layer.name + " "+bLayerVisible);
		}
		function frameCallback(frame) { 
			if(bLayerVisible){
				try {
					trace("onFrame "+frame+" "+frame.startFrame+" "+frame.duration);
					if(frame.isMotionObject()) {
						//trace(frame.getMotionObjectXML());
						frame.selectMotionPath(true);
						//frame.convertMotionObjectTo2D()
						fl.getDocumentDOM().getTimeline().convertToKeyframes(frame.startFrame-1, frame.startFrame -1 + frame.duration );
						//fl.getDocumentDOM().getTimeline().convertToKeyframes(%*d%*d);
	
	
					}
				} catch(err){ debug(err);}
			}
		}
		function elementCallback(element) {}

		Iterators.layers($dom.getTimeline(), layerCallback, frameCallback, elementCallback);
		
	} catch(err){ debug(err);}
})()