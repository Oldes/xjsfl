/**
 * Reset transformation points to 0x0 
 * @icon	{iconsURI}UI/icon/icon_update.png
 */
(function()
{
	
	 


	// -----------------------------------------------------------------------------------------------------------------------------------------
	// functions
	
	function resetTPoint(element, index, elements){
		trace(element);
		element.setTransformationPoint({x:0, y:0});
	}
	

	xjsfl.init(this);
	if(UI.selection)
	{
		var collection	= $(':selected');
		collection.each(resetTPoint, []);
	}
	
})()