/**
 * Remove Tweens
 * @icon	{iconsURI}Design/picture/picture_go.png
 */
 
(function()
{
	xjsfl.init(this);
	clear();

	try {
		function layerCallback(layer, index) {
			bLayerVisible = layer.visible;
			trace("LAYER: "+layer.name + " "+bLayerVisible);
		}
		function frameCallback(element) {
			//trace("FRAME:"+element.tweenType);
			if(element)	element.tweenType = "none";
		}
		function elementCallback(element) {
			trace(element.firstFrame)
		}

		Iterators.layers($dom.getTimeline(), layerCallback, frameCallback, elementCallback);
	} catch(err){ debug(err);}
//var collection = $$($selection);
//collection.list();

})()