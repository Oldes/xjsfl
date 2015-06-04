/**
 * Collect Bitmaps to folder
 * @icon	{iconsURI}Design/picture/picture_go.png
 */
 
(function()
{
/*

$dom; // same as fl.getDocumentDOM()

context.layer;        // access the actual Flash layer object
context.frame;        // access the context's frame object
context.keyframes;    // access the keyframes from within the current context's layer
context.elements;     // access the elements within the context's frame

context.setLayer(3);  // update the context layer
context.update();     // update the context to the current IDE context
context.goto();       // force Flash to change the window and timeline to the supplied context
*/

	// ----------------------------------------------------------------------------------------------------
	// variables
	
	var targetFolder = "Bitmaps/Temp";
	
	
	
	// ----------------------------------------------------------------------------------------------------
	// functions
	var patt = /^Bitmaps\//;

    function elementCallback(element) {
	    try {
			//trace("ELEMENT: "+element.name + " "+element.elementType +" "+element.instanceType);
			switch(element.instanceType){
				case "bitmap":
					var name = element.libraryItem.name;
				    trace("Moving: "+name +" -> "+ $library.moveToFolder(targetFolder, name));
					break;
				case "symbol":
					//inspect(element);
				    Iterators.layers(element.libraryItem.timeline, null, null, elementCallback);
					break;
			}
		}catch(error){
			debug(error);
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// code
	xjsfl.init(this);
	clear();
	var context = Context.create();
	
	if(!$library.itemExists("Bitmaps")) $library.newFolder("Bitmaps");
	if(!$library.itemExists(targetFolder)) $library.newFolder(targetFolder);
	
   // Iterators.layers($dom.getTimeline(), layerCallback, null, elementCallback);

	var elements = $(":selected").elements;

	for each(var element in elements){
		elementCallback(element);
	}
    context.goto(); 
   // var temp = xjsfl.uri + 'user/temp/';
	//var file = new File(temp + 'test.bat', 'echo hello').open();

})()