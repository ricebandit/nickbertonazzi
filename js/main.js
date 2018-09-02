(function(){
	var _stage;
	var _preloader;
	var _site;


	var _assets = [
		{id:"background", src:"img/bg.gif"},
		{id:"ground", src:"img/ground.png"},
		{id:"bat", src:"img/bat.png"},
		{id:"mountains-0", src:"img/mountains-0.png"},
		{id:"mountains-1", src:"img/mountains-1.png"},
		{id:"mountains-2", src:"img/mountains-2.png"},
		{id:"mountains-3", src:"img/mountains-3.png"},
		{id:"mountains-4", src:"img/mountains-4.png"},
		{id:"mountains-5", src:"img/mountains-5.png"},
		{id:"mountains-6", src:"img/mountains-6.png"},
		{id:"stalactites", src:"img/stalactites.png"},
		{id:"waterfall-1", src:"img/waterfall-1.png"},
		{id:"waterfall-2", src:"img/waterfall-2.png"},
		{id:"waterfall-3", src:"img/waterfall-3.png"},
		{id:"waterfall-4", src:"img/waterfall-4.png"},
		{id:"waterfall-5", src:"img/waterfall-5.png"},
		{id:"char-1-0", src:"img/char1-0.png"},
		{id:"char-1-1", src:"img/char1-1.png"},
		{id:"char-1-2", src:"img/char1-2.png"},
		{id:"char-2-0", src:"img/char2-0.png"},
		{id:"char-2-1", src:"img/char2-1.png"},
		{id:"char-2-2", src:"img/char2-2.png"},
		{id:"char-3-0", src:"img/char3-0.png"},
		{id:"char-3-1", src:"img/char3-1.png"},
		{id:"char-3-2", src:"img/char3-2.png"},
		{id:"char-3-3", src:"img/char3-3.png"},
		{id:"char-4-0", src:"img/char4-0.png"},
		{id:"char-4-1", src:"img/char4-1.png"},
		{id:"char-4-2", src:"img/char4-2.png"},
		{id:"cloud-0", src:"img/cloud-0.png"},
		{id:"cloud-1", src:"img/cloud-1.png"},
		{id:"logo", src:"img/logo.png"},
		{id:"gas1", src:"img/gas-0.png"},
		{id:"gas2", src:"img/gas-1.png"},
		{id:"buttons", src:"img/btns.png"}
	]

	var _audioManifest = [
	    { id:"stalactites", src:"stalactites.mp3", data:"1" },
	    { id:"burp1", src:"burp1.mp3", data:"1" },
	    { id:"burp2", src:"burp2.mp3", data:"1" },
	    { id:"burp3", src:"burp3.mp3", data:"1" },
	    { id:"burp4", src:"burp4.mp3", data:"1" },
	    { id:"pop1", src:"pop1.mp3", data:"1" },
	    { id:"pop2", src:"pop2.mp3", data:"1" },
	    { id:"pop3", src:"pop3.mp3", data:"1" },
	    { id:"pop4", src:"pop4.mp3", data:"1" }
	]

	_assets.concat(_audioManifest);

	$(document).ready(function(){

		initCanvas();

	})

	function initCanvas(){
		_stage = new createjs.Stage("canvas");
		_stage.enableMouseOver(20);

		createjs.Ticker.addEventListener("tick", _stage);

		resize();

		$(window).resize(function(){
			resize();
		});

		initPreloader();

	}

	function initPreloader(){
		_preloader = new Preloader(_assets, initAudio);

	}

	function initAudio(){
		document.audio = new AudioPlayer(_audioManifest, initSite);
	}

	function initSite(){
		_site = new Site(_stage, _preloader.getAssets() );


		resize();
	}

	function resize(){
		/* ============================== 
		RESIZE CANVAS ATTRIBUTES
		============================== */
		var origWidth = 1900;
		var origHeight = 1000;
		var ratio = origHeight / origWidth;
		
		var resizeWidth = $(window).width();
		var resizeHeight = resizeWidth * ratio;

		var maxHeight = $(window).height();

		if( maxHeight < resizeHeight){

			resizeHeight = maxHeight;
			ratio = origWidth /origHeight;
			resizeWidth = resizeHeight * ratio;
		}


		$("#canvas").attr("width", resizeWidth);
		$("#canvas").attr("height", resizeHeight);

		/* ============================== 
		RESIZE ELEMENTS
		============================== */
		var scale = resizeWidth / origWidth;
		if( _site ){
			_site.resize( scale )
		}

	}



})()