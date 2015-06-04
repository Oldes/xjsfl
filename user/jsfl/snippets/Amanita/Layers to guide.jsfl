/**
 * Layers to guide
 * @icon	{iconsURI}actions/wrench/wrench.png
 */
 
(function()
{
	xjsfl.init(this);
	clear();
	
	function layerCallback(layer, index) {
		if(layer.layerType == "normal") layer.layerType = "guide";
	}
	
	var context = Context.create();


	Iterators.layers($dom.getTimeline(), layerCallback, null, null);
		
	context.goto();

})()