/**
 * Export sounds
 * @icon	{iconsURI}Design/picture/picture_go.png
 */
 
(function()
{
	// ----------------------------------------------------------------------------------------------------
	// functions
	var FlaURI = new URI($dom.path);
	var SoundsDir = FlaURI.folder +"../"
	trace("OUTPUT DIR: "+SoundsDir);
	
	var rHasWavExt = /\.wav$/i;
	var rInSoundsFolder = /^Sounds/;
	
    function exportSound(item) {
	    try {
			if(item.itemType == "sound"){
				var soundName = item.name;
				//Exporting only sounds which are inside /Sounds folder
				if(rInSoundsFolder.test(soundName)){
					if(!rHasWavExt.test(soundName)) soundName+=".wav";
					var uri       = URI.asURI(SoundsDir + soundName); 
					var folderURI = URI.getFolder(uri);
					var folder    = new Folder(folderURI, true);
					
					if(item.exportToFile(uri, 100)){
						trace("SOUND EXPORTED: " + soundName);
					} else {
						throw new Error("Unable to export sound: "+soundName);
					}
				}
			}
		}catch(error){
			debug(error);
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// code
	xjsfl.init(this);
	clear();

	$$(':selected').each(exportSound);

})()