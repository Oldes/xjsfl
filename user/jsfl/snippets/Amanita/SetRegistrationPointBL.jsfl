/**
 * Set Registration Point Bottom-Left
 * @icon	{iconsURI}Design/picture/picture_go.png
 */
 
(function()
{
	var width, height;
	
	// ----------------------------------------------------------------------------------------------------
	// functions
	
    function moveElement(item) {
	    try {
		    trace("moving "+item.libraryItem.name+" "+width+" "+height);
			//item.x -= width;
			item.y -= height;
		}catch(error){
			debug(error);
		}
	}

	// handlers
	
		/**
		 * Summary
		 * @param	{XULEvent}	event	Description
		 */
		function onApplyClick(event)
		{
			try {
				var context = Context.create();
			// control values
				var operation	= event.xul.controls.operation.value;
				trace(operation);
						// set up mementos so we can reset the elements after
				var collection =  $selection;
				for each(var element in collection)
				{
					
					width  = element.width;
					height = element.height;
					if(operation=="Top Left") {
						trace("topleft");
						height = -height;
					}
					trace("processing: "+element.libraryItem.name+" "+element.width + " "+element.height);
					$library.selectItem(element.libraryItem.name);
					$library.editItem();
					$(':selected').each(moveElement);
					//element.x += width;
					element.y += height;
					
	
				}
				context.goto(); 
			}catch(error){
				debug(error);
			}
		}
	// ----------------------------------------------------------------------------------------------------
	// code
	xjsfl.init(this);
	clear();
	
	if(selection = UI.selection)
	{
		// variables
		
		
		
		var controls =
			<xml>
				radio:Operation=[Top Left,Bottom Left],
				button:Apply
			</xml>
		
		var xul = XUL
			.factory()
			.setTitle('Set Registration Point')
			.add(controls)
			.addEvent('apply', 'click', onApplyClick)
			.show();

	}
	


})()