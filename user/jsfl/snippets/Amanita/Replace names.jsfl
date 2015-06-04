/**
 * Replace names in the library
 * @icon {iconsURI}Design/image/image.png
 */
(function()
{
	// setup
		xjsfl.init(this);
		var path = "";
		var oldName = "";
		var newName = "";

	// callback
		function replaceInName(str) {
		  return str.replace(/Bitmap /, 'Bk');
		}
		function onCamelize(element, index, elements) {
			if(element.itemType == "folder") return;
			var path = element.name.split('/');
			var oldName = path.pop();
			path = path.join('/');
			var newName = replaceInName(oldName);
			trace(path+"/"+oldName+" => "+newName);
			element.name = newName;
		}
		
	// =============
	var context = Context.create();
		var collection = $$(':selected');
		collection.reach(onCamelize);
	context.goto();
})()
