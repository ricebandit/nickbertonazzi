function Preloader(itemList, callback){
	var _this = this;
	var _loadQueue;

	_this.getAssets = function(){
		return _loadQueue;
	}

	function init(){
		_loadQueue = new createjs.LoadQueue();
		_loadQueue.on("complete", loadComplete);
		_loadQueue.on("progress", loadProgress);
		_loadQueue.loadManifest(itemList);
	}

	function loadProgress(evt){
		var progressPercent = Math.ceil( evt.progress * 100 )
		$(".preloader .message").html("Loading..." + progressPercent + "%" );
	}

	function loadComplete(evt){
		$(".preloader .message").html("Loading Complete!");

		$(".preloader").addClass("out");
		
		setTimeout(function(){
			$(".preloader").remove();
			callback();
		}, 400);
		
	}

	init();

	return _this;
}