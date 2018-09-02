function Site(stage, assets){
	var _this = this;
	var _instance;

	// ELEMENTS
	var _ground;
	var _mountains;
	var _stalactites;
	var _waterfall1;
	var _waterfall2;
	var _waterfall3;
	var _waterfall4;
	var _waterfall5;
	var _char1;
	var _char2;
	var _char3;
	var _char4;
	var _bat;
	var _logo;
	var _gas;
	var _btnDirector;
	var _btnAnimation;
	var _btnComics;
	var _btnContact;
	var _prevSection;

	var _comicsIndex = 0;
	var _comicsMax;

	_this.resize = function(scale){
		_instance.scaleX = _instance.scaleY = scale;
	}

	_this.getInstance = function(){ return _instance;}

	function init(){
		_instance = new createjs.Container();

		stage.addChild(_instance);


		addElements();

		choreographEntry();

		initMobile();

		initDesktop();
	}

	function initDesktop(){
		_comicsMax = $("#desktop-container #comics .items .item").length;

		$("#desktop-container #comics .arrow.prev").on("click", gotoPrevComicsDesktop);
		$("#desktop-container #comics .arrow.next").on("click", gotoNextComicsDesktop);
	}

	function gotoPrevComicsDesktop(){
		$("#desktop-container #comics .items .item.in").removeClass("in");
		$("#desktop-container #comics .items .item.displayed").removeClass("displayed");

		_comicsIndex --;

		if( _comicsIndex < 0){
			_comicsIndex = _comicsMax -1;
		}

		$( $("#desktop-container #comics .items .item")[_comicsIndex] ).addClass( "displayed" );

		setTimeout(function(){
			$( $("#desktop-container #comics .items .item")[_comicsIndex] ).addClass( "in" );
		}, 100);
	}

	function gotoNextComicsDesktop(){
		$("#desktop-container #comics .items .item.in").removeClass("in");
		$("#desktop-container #comics .items .item.displayed").removeClass("displayed");

		_comicsIndex ++;

		if( _comicsIndex == _comicsMax ){
			_comicsIndex = 0;
		}

		$( $("#desktop-container #comics .items .item")[_comicsIndex] ).addClass( "displayed" );

		setTimeout(function(){
			$( $("#desktop-container #comics .items .item")[_comicsIndex] ).addClass( "in" );
		}, 100);


	}

	function initMobile(){
		$("#mobile-container .navigation .button").on("click", function(){
			console.log("button", $(this).data("id") )

			switch( $(this).data("id") ){
				case "director-reel":
					gotoMobileSection("director");
				break;
				case "animation-reel":
					gotoMobileSection("animation");
				break;
				case "comics":
					gotoMobileSection("comics");
				break;
				case "contact":
					gotoMobileSection("contact");
				break;
			}
		})

		$("#mobile-container #content #close").on("click", function(){
			$("#mobile-container #content").removeClass("show");

			$("#mobile-container #content #director").html("");
			$("#mobile-container #content #animation").html("");
		})


		// Two-frame animation for mobnile navigation
		var animationFrameToggle = true;

		setInterval(function(){
			if(animationFrameToggle === true){
				animationFrameToggle = false;

				$("#mobile-container").removeClass("last-frame-animation");
			}else{
				animationFrameToggle = true;

				$("#mobile-container").addClass("last-frame-animation");
			}
		}, 500);


	}

	function addElements(){
		// Background
		var bg = new createjs.Bitmap(assets.getResult("background") );
		_instance.addChild(bg);

		// Waterfall3
		_waterfall3 = new Waterfall3(_instance, assets);

		// Waterfall4
		_waterfall4 = new Waterfall4(_instance, assets);

		// Mountains
		_mountains = new Mountains(_instance, assets);

		// Waterfall2
		_waterfall2 = new Waterfall2(_instance, assets);

		// Ground
		_ground = new Ground(_instance, assets);

		// Stalactites
		_stalactites = new Stalactites(_instance, assets);

		// Logo
		_logo = new Logo(_instance, assets);

		// Bat
		_bat = new Bat(_instance, assets);

		// Bat
		_gas = new Gas(_instance, assets);

		// Char
		_char1 = new Char1(_instance, assets);
		_char1.setCallbacks( rolloverSection, gotoSection, rolloutSection, showSection );

		// Char
		_char2 = new Char2(_instance, assets);
		_char2.setCallbacks( rolloverSection, gotoSection, rolloutSection, showSection );

		// Char
		_char3 = new Char3(_instance, assets);
		_char3.setCallbacks( rolloverSection, gotoSection, rolloutSection, showSection );

		// Char
		_char4 = new Char4(_instance, assets);
		_char4.setCallbacks( rolloverSection, gotoSection, rolloutSection, showSection );

		// Waterfall1
		_waterfall1 = new Waterfall1(_instance, assets);

		// Waterfall5
		_waterfall5 = new Waterfall5(_instance, assets);

		_btnDirector = new Buttons("director", _instance, assets);
		_btnDirector.setCallbacks( rolloverSection, gotoSection, rolloutSection );

		_btnAnimation = new Buttons( "animation", _instance, assets);
		_btnAnimation.setCallbacks( rolloverSection, gotoSection, rolloutSection );

		_btnComics = new Buttons("comics", _instance, assets);
		_btnComics.setCallbacks( rolloverSection, gotoSection, rolloutSection );

		_btnContact = new Buttons("contact", _instance, assets);
		_btnContact.setCallbacks( rolloverSection, gotoSection, rolloutSection );
	}

	function choreographEntry(){

		// Waterfall3
		setTimeout(_waterfall3.enter, 2400);

		// Waterfall4
		setTimeout(_waterfall4.enter, 2200);

		// Ground
		setTimeout(_ground.enter, 800);
		setTimeout(function(){

			if( $(window).width() >= 769 ){
				document.audio.playIncidental("stalactites", 0.5);
			}
			
		}, 400);

		// Mountains
		setTimeout(_mountains.enter, 1200);

		// Waterfall2
		setTimeout(_waterfall2.enter, 2200);

		// Stalactites
		setTimeout(_stalactites.enter, 1400);

		// Bat
		setTimeout(_bat.enter, 1400);

		// Char1
		setTimeout(_char1.enter, 3000);
		setTimeout(function(){

			if( $(window).width() >= 769 ){
				document.audio.playIncidental("pop1", 0.5);
			}
			
		}, 3000);

		// Button
		setTimeout(_btnDirector.enter, 3000);

		// Char2
		setTimeout(_char2.enter, 3800);
		setTimeout(function(){

			if( $(window).width() >= 769 ){
				document.audio.playIncidental("pop2", 0.5);
			}
			
		}, 3000);

		// Button
		setTimeout(_btnAnimation.enter, 3800);

		// Char3
		setTimeout(_char3.enter, 3400);
		setTimeout(function(){

			if( $(window).width() >= 769 ){
				document.audio.playIncidental("pop3", 0.5);
			}
			
		}, 3400);

		// Button
		setTimeout(_btnComics.enter, 3400);

		// Char4
		setTimeout(_char4.enter, 4800);
		setTimeout(function(){

			if( $(window).width() >= 769 ){
				document.audio.playIncidental("pop4", 0.5);
			}
			
		}, 4800);

		// Button
		setTimeout(_btnContact.enter, 4800);

		// Logo
		setTimeout(_logo.enter, 1400);

		// Waterfall1
		setTimeout(_waterfall1.enter, 0);

		// Waterfall5
		setTimeout(_waterfall5.enter, 0);

		// Gas
		//setTimeout(_gas.show, 0);
	}

	function rolloverSection(id){
		switch(id){
			case "director":
				_char1.playOver();
				_btnDirector.playOver();
			break;
			case "animation":
				_char2.playOver();
				_btnAnimation.playOver();
			break;
			case "comics":
				_char3.playOver();
				_btnComics.playOver();
			break;
			case "contact":
				_char4.playOver();
				_btnContact.playOver();
			break;
		}
	}

	function rolloutSection(id){
		switch(id){
			case "director":
				_char1.playOut();
				_btnDirector.playOut();
			break;
			case "animation":
				_char2.playOut();
				_btnAnimation.playOut();
			break;
			case "comics":
				_char3.playOut();
				_btnComics.playOut();
			break;
			case "contact":
				_char4.playOut();
				_btnContact.playOut();
			break;
		}
	}

	var sectionLoadTimeout;

	function gotoSection(id){
		hidePreviousSection(id);

		$("#desktop-container #content #director").html("");
		$("#desktop-container #content #animation").html("");
		$("#desktop-container #content").removeClass("in");
		$("#desktop-container #content .section#comics .items .item.displayed").removeClass("displayed");
		$("#desktop-container #content .section#comics .items .item.in").removeClass("in");
		
		clearTimeout( sectionLoadTimeout );

		setTimeout(function(){
			switch(id){
				case "director":
					_char1.playClick();
					_btnDirector.playClick();
					_prevSection = [_char1, _btnDirector, id ];
				
					$("#desktop-container #content").addClass("show");

					$("#desktop-container #content .display").removeClass("display");

					$("#desktop-container #content #" + id).addClass("display");


					var dirString = '<iframe src="https://player.vimeo.com/video/281849833" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

					sectionLoadTimeout = setTimeout(function(){
						$("#desktop-container #content #" + id).html(dirString);
					}, 1000);
				break;
				case "animation":
					_char2.playClick();
					_btnAnimation.playClick();
					_prevSection = [_char2, _btnAnimation, id ];
				
					$("#desktop-container #content").addClass("show");

					$("#desktop-container #content .display").removeClass("display");

					$("#desktop-container #content #" + id).addClass("display");


					var animString = '<iframe src="https://player.vimeo.com/video/281849802" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

					sectionLoadTimeout = setTimeout(function(){
						$("#desktop-container #content #" + id).html(animString);
					}, 1500);

				break;
				case "comics":
					_char3.playClick();
					_btnComics.playClick();
					_prevSection = [_char3, _btnComics, id ];
				
					$("#desktop-container #content").addClass("show");

					$("#desktop-container #content .display").removeClass("display");

					$("#desktop-container #content #" + id).addClass("display");


					sectionLoadTimeout = setTimeout(function(){
						$("#desktop-container #content").addClass("in");
						$("#desktop-container #content .section#comics .items .item#bumbleblog").addClass("displayed");

						sectionLoadTimeout = setTimeout(function(){
							$("#desktop-container #content .section#comics .items .item#bumbleblog").addClass("in");
						}, 100)
					}, 1500);

				break;
				case "contact":
					_char4.playClick();
					_btnContact.playClick();
					_prevSection = [_char4, _btnContact, id ];
				
					$("#desktop-container #content").addClass("show");

					$("#desktop-container #content .display").removeClass("display");

					$("#desktop-container #content #" + id).addClass("display");

					sectionLoadTimeout = setTimeout(function(){
						$("#desktop-container #content").addClass("in");
					}, 1500);

				break;
			}
		}, 200);

	}

	function gotoMobileSection(id){
		$(document).scrollTop(0);
		
		// Remove director and animation content
		$("#mobile-container #content #director").html("");
		$("#mobile-container #content #animation").html("");


		// Add/Switch to new content
		switch(id){
			case "director":
				_prevSection = [_char1, _btnDirector, id ];

				var animString = '<iframe src="https://player.vimeo.com/video/281849833" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

				$("#mobile-container #content #" + id).html(animString);
			break;
			case "animation":
				_prevSection = [_char2, _btnAnimation, id ];

				var animString = '<iframe src="https://player.vimeo.com/video/281849802" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

				$("#mobile-container #content #" + id).html(animString);

			break;
			case "comics":
				_prevSection = [_char3, _btnComics, id ];

			break;
			case "contact":
				_prevSection = [_char4, _btnContact, id ];
			break;
		}
				
		$("#mobile-container #content").addClass("show");

		$("#mobile-container #content .display").removeClass("display");

		$("#mobile-container #content #" + id).addClass("display");
	}

	function hidePreviousSection(id){

		if(_prevSection && _prevSection[2] == id){return;}

		unselectPrevSection(id);

		_gas.hide();
	}

	function unselectPrevSection(id){
		if(_prevSection){
			_prevSection[0].unselect();
			_prevSection[1].unselect();
		}
	}

	function showSection(){
		_gas.show();
	}

	init();


	return this;
}