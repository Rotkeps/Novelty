﻿////////////////////////////// Frame_divider.jsx// An InDesign JavaScript// Version 0.1 Beta// Bruno Herfst 2012//////////////////////////////Wishlist //// Add gutter functionality// offset pictures//global variablesvar set = new Object();var myObjectList = new Array;main();////////////////////////// F U N C T I O N S //////////////////////////function main(){	//Make certain that user interaction (display of dialogs, etc.) is turned on.	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;	if (app.documents.length != 0){		if (app.selection.length != 0){			for(var myCounter = 0;myCounter < app.selection.length; myCounter++){				switch (app.selection[myCounter].constructor.name){					case "Rectangle":					case "TextFrame":					myObjectList.push(app.selection[myCounter]);					break;				}			}            if (myObjectList.length != 0){				displayDialog(myObjectList);            }            else{				alert ("Select a rectangle or text frame and try again.");			}		}		else{			alert ("Select a frame and try again.");		}	}	else{		alert ("Open a document, select a frame and try again.");	}}function displayDialog(myObjectList){	//dialog	var myWindow = new Window ("dialog","Frame divider");	myWindow.orientation = "row";	myWindow.alignChildren = "top";		var td00 = myWindow.add ("group");			td00.orientation = "column";			td00.alignChildren = "right";			var tr00 = td00.add ("statictext", undefined, "Devision:");				tr00.minimumSize = [0,20];			var tr01 = td00.add ("statictext", undefined, "Horizontal");				tr01.minimumSize = [0,20];			var tr02 = td00.add ("statictext", undefined, "Vertical");				tr02.minimumSize = [0,20];		//	var tr03 = td00.add ("statictext", undefined, "Size:");		//		tr03.minimumSize = [0,20];		//	var tr04 = td00.add ("statictext", undefined, "Horizontal");		//		tr04.minimumSize = [0,20];		//	var tr05 = td00.add ("statictext", undefined, "Vertical");		//		tr05.minimumSize = [0,20];				var td20 = myWindow.add ("group");			td20.orientation = "column";			var tr20 = td20.add ("statictext", undefined, "Max");			var hmax = td20.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );				hmax.characters = 4;			var vmax = td20.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );				vmax.characters = 4;		//	var tr23 = td20.add ("statictext", undefined, "Max");		//	var hsmax = td20.add ("edittext", undefined, 0);		//		hsmax.characters = 4;		//	var vsmax = td20.add ("edittext", undefined, 0);		//		vsmax.characters = 4;		var td10 = myWindow.add ("group");			td10.orientation = "column";			var tr10 = td10.add ("statictext", undefined, "Min");			var hmin = td10.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );				hmin.characters = 4;			var vmin = td10.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );				vmin.characters = 4;		//	var tr13 = td10.add ("statictext", undefined, "Min");		//	var hsmin = td10.add ("edittext", undefined, 0);		//		hsmin.characters = 4;		//	var vsmin = td10.add ("edittext", undefined, 0);		//		vsmin.characters = 4;		var td30 = myWindow.add ("group");			td30.orientation = "column";			td30.alignChildren = "left";			var tr30 = td30.add ("statictext", undefined, "Noise");				tr30.minimumSize = [0,20];			var slideH31 = td30.add ("slider", undefined, 0, 0, 100);				slideH31.minimumSize = [0,20];			var slideV32 = td30.add ("slider", undefined, 0, 0, 100);				slideV32.minimumSize = [0,20];			var checkShuffle = td30.add ("checkbox", undefined, "Shuffle");			checkShuffle.value = true;		var td40 = myWindow.add ("group");			td40.orientation = "column";			var tr40 = td40.add ("statictext", undefined, " ");				tr40.minimumSize = [0,20];			var tr41 = td40.add ("statictext", undefined, "0%");				tr41.characters = 4;			var tr42 = td40.add ("statictext", undefined, "0%");				tr42.characters = 4;		var td50 = myWindow.add ("group");			td50.orientation = "column";			td50.add ("button", undefined, "OK");			td50.add ("button", undefined, "Cancel");		//dialog functions		slideH31.onChanging = function () {tr41.text = slideH31.value + "%";}		slideV32.onChanging = function () {tr42.text = slideV32.value + "%";}		tr41.onChanging = function() {			if(parseInt(tr41.text) > 99){				tr41.text = "99%";			} else {				tr41.text = parseInt(tr41.text) + "%";			}			slideH31.value = parseInt(tr41.text);		}		tr42.onChanging = function() {			if(parseInt(tr42.text) > 99){				tr42.text = "99%";			} else {				tr42.text = parseInt(tr42.text) + "%";			}			slideV32.value = parseInt(tr42.text);		}		hmin.onChanging = function() {			var a = parseInt(hmin.text);			var b = parseInt(hmax.text);			//turn values arround if necessary			if (a >= b) { 				hmin.text = b;				hmax.text = a;			}			else {				hmin.text = parseInt(hmin.text);			}		}		hmax.onChanging = reverse();	function reverse(){		a = parseInt(hmin.text);		b = parseInt(hmax.text);		//turn values arround if necessary		if (a >= b) { 			hmin.text = b;			hmax.text = a;		} else {			hmax.text = parseInt(hmax.text);		}	}	reverse();	var myReturn = myWindow.show();		if (myReturn == true){		//Get the values from the dialog box.		var minHdivide = parseInt(hmin.text),			maxHdivide = parseInt(hmax.text),			minVdivide = parseInt(vmin.text),			maxVdivide = parseInt(vmax.text),			shuffle = checkShuffle.value;		set.noiH = slideH31.value;		set.noiV = slideV32.value;		set.vDev = randomXToY(minVdivide,maxVdivide);		set.hDev = randomXToY(minHdivide,maxHdivide);		//Store the current measurement units.		var myOldXUnits = app.activeDocument.viewPreferences.horizontalMeasurementUnits;		var myOldYUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits;		var myOldOrigin = app.activeDocument.viewPreferences.rulerOrigin;		app.activeDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;		app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;		app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;		//let’s do it!		var total = myObjectList.length-1;		for(var t=total; t>=0; t--){			var VertSlices = divide(getDetails(myObjectList[t]),set,true);			//Before we start cutting vertically, lets calculate the cuts			var cuts = divide(getDetails(myObjectList[t]),set,false);			var slicecount = VertSlices.length-1;			for(var sc=slicecount; sc>=0; sc--){				slice(getDetails(VertSlices[sc]), cuts, false, shuffle);			}		}		//Reset the measurement units.		app.activeDocument.viewPreferences.horizontalMeasurementUnits = myOldXUnits;		app.activeDocument.viewPreferences.verticalMeasurementUnits = myOldYUnits;		app.activeDocument.viewPreferences.rulerOrigin = myOldOrigin;	}}function divide(item, set, cutHorizontal){	if(cutHorizontal === true){		var myBounds1 = 0,			myBounds2 = 2,			myItemLength = item.h,			mydivide = set.vDev,			myNoise = set.noiV;	}else{ //false //cut vertical		var myBounds1 = 1;			myBounds2 = 3;			myItemLength = item.w,			mydivide = set.hDev,			myNoise = set.noiH;	}	//start with deviding vertically	var cuts = new Array;	var neatcut = myItemLength/mydivide;	cuts.push(item.bounds[myBounds1]);	cuts.push(item.bounds[myBounds2]);	len = mydivide-1	for(var i=len; i>=1; i--){		var noise = percentOf(neatcut, myNoise)/2;		var cut = randomXToY(neatcut-noise,neatcut+noise);		//always cut from the biggest piece		var bigCut = getBigCut(cuts);		if(bigCut-cut > item.bounds[myBounds1] && bigCut-cut < item.bounds[myBounds2]){			cuts.push(bigCut-cut);		} else if(bigCut+cut > item.bounds[myBounds1] && bigCut+cut < item.bounds[myBounds2]){			cuts.push(bigCut+cut);		}	}	//make sure cuts are sorted! *important* makes sure cuts[0] && cuts[-1] are the outer edges	cuts.sort(function(a,b){return a - b});	//cut or not but return the slices	if(cutHorizontal === true){		cuts = juggleCuts(cuts);		return slice(item,cuts,cutHorizontal, true);	}else{		cuts = juggleCuts(cuts);		return(cuts); //only calculate so we can cut them all the same or not	}}function slice(item, cuts, cutHorizontal, shufflenow){	if(shufflenow == true){		cuts = juggleCuts(cuts);	}	var cake = new Array(),		TLy = item.bounds[0], //top left y		TLx = item.bounds[1], //top left x		BRy = item.bounds[2], //bottom right y		BRx = item.bounds[3]; //bottom right x	//do first one	if(cutHorizontal === true){		var myArray = [TLy,TLx,doRound(cuts[1],3),BRx];	} else {		var myArray = [TLy,TLx,BRy,doRound(cuts[1],3)];	}	item.obj.geometricBounds = myArray; // Coordinates of the top-left and bottom-right corners of the bounding box.		cake.push(item.obj); //push first slice to cake	var cutCount = cuts.length-2;	for(var i=cutCount; i>=1; i--){		var slice = item.obj.duplicate();		if( doRound(cuts[i],3) != doRound(cuts[i+1],3) ){			if(cutHorizontal === true){				myArray = [doRound(cuts[i],3),doRound(TLx,3),doRound(cuts[i+1],3),doRound(BRx,3)];			} else { //cut vertical				myArray = [doRound(TLy,3),doRound(cuts[i],3),doRound(BRy,3),doRound(cuts[i+1],3)];			}			try{				slice.geometricBounds = myArray;			} catch(e){				alert(e.description);				alert(myArray);			}		}		cake.push(slice);	}	return cake;}function getBigCut(cuts){	//returns the endmarker of the biggest slice	cuts.sort(function(a,b){return a - b});	len = cuts.length-1;	var piece = 0;	var sliceEnd = 0;	for(var i=len; i>0; i--){		var sliceStart = cuts[i];		var sliceEnds = cuts[i-1];		var dist = sliceStart - sliceEnds;		if(dist > piece){ piece = dist; sliceEnd = sliceStart}	}	if(piece < cuts[1]-cuts[0]){ //don’t forget to include the first one		return cuts[1];	} else {		return sliceEnd;	}}function getDetails(myObject){	item = new Object();	item.obj = myObject;	item.bounds = item.obj.geometricBounds; 	//[y1, x1, y2, x2] Coordinates of the top-left and bottom-right corners of the bounding box.	item.w = item.bounds[3]-item.bounds[1];	item.h = item.bounds[2]-item.bounds[0];	item.x = item.bounds[1];	item.y = item.bounds[0];	return item;}function juggleCuts(cuts){	//normalise cuts then juggle then normalise and return	var cutCount = cuts.length;	if(cutCount > 4){		//get widthvalues		var slices = new Array();		for(var i = 0; i <= cutCount-2; i++){			slices.push(cuts[i+1]-cuts[i]);		}		shuffle(slices);		//let’s recalculate the cuts		var juggledCuts = new Array();				var keypoint = cuts[0];		juggledCuts.push(keypoint); //first one (edge)		for(var i = 1; i <= cutCount-2; i++){			keypoint += slices[i];			juggledCuts.push(keypoint);		}		juggledCuts.push(cuts[cutCount-1]); //last one (edge)		juggledCuts.sort(function(a,b){return a - b});		return juggledCuts;	}	return cuts;}//-------------------- TRANSFORMfunction shuffle(array) {    var tmp, current, top = array.length;    if(top) while(--top) {        current = Math.floor(Math.random() * (top + 1));        tmp = array[current];        array[current] = array[top];        array[top] = tmp;    }    return array;}//------------------- MATHfunction doRound(myNum, roundDec) {	var roundMulit = Math.pow(10,roundDec);	return Math.round(myNum*roundMulit)/roundMulit;}function randomXToY(minVal,maxVal,floatVal) {  var randVal = minVal+(Math.random()*(maxVal-minVal));  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);}function percentOf(num, percentage){  return (percentage / 100) * num;}