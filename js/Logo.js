function Logo(container, assets){
	var _this = this;
	var _logo;

	_this.enter = function(){
		$(_logo).animate({y:12}, {duration:1200});
        _logo.alpha = 1;
	}

	function init(){
		_logo = new createjs.Bitmap(assets.getResult("logo"));
        _logo.alpha = 0;

		_logo.x = 350;
		_logo.y = -102;
		

		container.addChild(_logo);
	}

	init();


	return this;
}