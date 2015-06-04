/**
 * Reset sounds volume
 * @icon	{iconsURI}media\volume\volume.png
 * @author David 'Oldes' Oliva
 * oldes@amanita-design.net
 */
 

fl.outputPanel.clear();
var dom = fl.getDocumentDOM();
fl.trace('Reseting sounds in ' + dom.name);
fl.trace('----------------------------------------------');

var libItems = dom.library.items;
var n = libItems.length;
while(n-->0){
	var item = libItems[n];
	if(item.itemType == "movie clip" || item.itemType == "graphic"){
		fl.trace("Processing: "+item.name);
		var timeline = item.timeline;
		var layerNum=timeline.layers.length;
		while(layerNum-->0){
			var tLayer = timeline.layers[layerNum];
			for(var j=0; j < tLayer.frameCount; j++){
				var tFrame = tLayer.frames[j];
				if(tFrame == undefined) {
					break;
				}
				if(tFrame.startFrame == j) { //only run on keyframes
					if(tFrame.soundLibraryItem != null) {
						var seconds = j * dom.frameRate;
						tFrame.soundEffect = "none";
						fl.trace('layer: ' + tLayer.name +" frame: "+j);
					}
				} else { //skip to next keyframe
					j = tFrame.startFrame + tFrame.duration - 1;
					continue;
				}
			}
		}
	}
}

