/**
 * Export path animation
 * @icon	{iconsURI}Design/picture/picture_go.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 
(function(){
 	xjsfl.init(this);
	clear();
	var labels = "";
	var currentFrame = 0;
	var labelsURI = $dom.pathURI.slice(0,$dom.pathURI.length-3)+"labels";

	
	try {
		function layerCallback(layer, index) {
			if(!layer.visible || layer.name != "LABELS" ) return false;
			currentLayerName = layer.name		
			currentFrame = 0;
		}
		function frameCallback(frame) { 
			//trace("onFrame "+currentFrame);
			//trace(frame.getMotionObjectXML())
			var name = frame.name;
			if(name) {
				labels += (frame.startFrame+1)+'\t"'+ name + '"\n';				
			}
			currentFrame++;
		}

		Iterators.layers($dom.getTimeline(), layerCallback, frameCallback, null);

		trace(labels);
		var file	= new File(labelsURI, labels);
		
	} catch(err){ debug(err);}
})()