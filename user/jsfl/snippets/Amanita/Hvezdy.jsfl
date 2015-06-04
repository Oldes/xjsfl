/**
 * Hvezdy
 * @icon {iconsURI}Design/imaging/imaging_large_tiles.png
 */

xjsfl.init(this);
var dom			= $dom;
var lib			= $library;
var gameWidth  = 1920;
var gameHeight = 1080;
var itemName   = "Hvezda1";
if(lib.itemExists(itemName)) {
	trace("jo");
	for (n=0; n<90; n++){
		var x = Math.random() * gameWidth;
		var y = Math.random() * gameHeight;
		lib.addItemToDocument({x:x, y:y}, itemName);
	}
	
	function callback(element){
		var r = Math.random() * 360;
		var a = 0.3 + Math.random() * .7;
		var s = 0.2 + Math.random() * 0.8;
		var y = 0.6 + Math.random() * 0.4;
		var x = 1 + Math.random() * 0.4;
		trace(r + " "+ a +" "+ s);
		element.rotation = r;
		element.alpha = a;
		element.scaleX = element.scaleY = s;
		element.y = element.y * y;
		element.x = element.x * x;
	}
	$('*').each(callback);
	
} else {
	trace(itemName +" not found!");
}
//var name = 'item_' + Utils.pad(i + 1, 2);
//lib.addItemToDocument({x:x, y:y}, itemName);