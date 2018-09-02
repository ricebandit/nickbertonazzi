function Buttons(id, container, assets){
	var _this = this;

	var _data = {
"images": [
    "img/btns.png"
],

"framerate": 20,
"frames": [
    [1, 1, 302, 124, 0, -510, -858],
    [1, 1, 302, 124, 0, -510, -858],
    [305, 1, 206, 68, 0, -1022, -910],
    [1, 127, 277, 114, 0, -523, -861],
    [280, 127, 228, 113, 0, -222, -742],
    [280, 242, 228, 75, 0, -1011, -906],
    [1, 243, 276, 136, 0, -198, -733],
    [1, 243, 276, 136, 0, -198, -733],
    [279, 319, 224, 59, 0, -1437, -797],
    [279, 319, 224, 59, 0, -1437, -797],
    [279, 380, 217, 72, 0, -1017, -908],
    [279, 380, 217, 72, 0, -1017, -908],
    [1, 381, 264, 108, 0, -529, -863],
    [1, 381, 264, 108, 0, -529, -863],
    [267, 454, 242, 120, 0, -216, -737],
    [267, 454, 242, 120, 0, -216, -737],
    [1, 491, 255, 68, 0, -1421, -792],
    [1, 491, 255, 68, 0, -1421, -792],
    [1, 561, 253, 125, 0, -210, -736],
    [1, 688, 250, 103, 0, -536, -864],
    [256, 576, 249, 82, 0, -1000, -902],
    [256, 576, 249, 82, 0, -1000, -902],
    [256, 660, 235, 62, 0, -1431, -795],
    [253, 724, 213, 56, 0, -1441, -798]
],

"animations": {
    "idle/btn_animation": { "frames": [0, 1, 12, 13, 3] },
    "out/btn_animation": { "frames": [3] },
    "over/btn_animation": { "frames": [19] },
    "idle/btn_comics": { "frames": [20, 21, 10, 11, 5] },
    "out/btn_comics": { "frames": [5] },
    "over/btn_comics": { "frames": [2] },
    "idle/btn_director": { "frames": [6, 7, 14, 15, 18] },
    "out/btn_director": { "frames": [18] },
    "over/btn_director": { "frames": [4] },
    "idle/btn_contact": { "frames": [16, 17, 8, 9, 22] },
    "out/btn_contact": { "frames": [22] },
    "over/btn_contact": { "frames": [23] }
},

"texturepacker": [
        "SmartUpdateHash: $TexturePacker:SmartUpdate:fcd3ee8fa029384c9cf5982c4623e9e0:2daa44437805919abed5ab5d71f8003b:b4009c7a1a515ae53c92c1c8f25da5d6$",
        "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
]

	}

	var _sprite;
    var _hitArea;
    var _rolloverCall;
    var _rolloutCall;
    var _clickCall;
    var _selected = false;

	_this.enter = function(){
		_sprite.gotoAndPlay("idle/btn_" + id);
        _sprite.on("animationend", stopAnimation);
        _sprite.alpha = 1;

        _sprite.hitArea = _hitArea;

        _sprite.cursor = "pointer";

        _sprite.on("click", function(){
            clickHit();
        })


        _sprite.on("rollover", rollover);

        _sprite.on("rollout", rollout);
	}

    _this.playClick = function(){
        if(_selected === true){return;}
        _selected = true;
        _sprite.gotoAndStop("over/btn_" + id);
    }

    _this.playOver = function(){
        _sprite.gotoAndStop("over/btn_" + id);
    }

    _this.playOut = function(){
        if(_selected === false){
            _sprite.gotoAndStop("out/btn_" + id)
        }
        
    }

    _this.unselect = function(){
        _selected = false;
        _sprite.gotoAndStop("out/btn_" + id);
    }

    _this.setCallbacks = function(rolloverCallback, clickCallback, outCallback){

        _rolloverCall = rolloverCallback;
        _rolloutCall = outCallback;
        _clickCall = clickCallback;
    }

	function init(){
		var spritesheet = new createjs.SpriteSheet(_data);

		_sprite = new createjs.Sprite(spritesheet);
        _sprite.alpha = 0;
		container.addChild(_sprite);


		_sprite.stop();

		_sprite.x = 0;
		_sprite.y = 0;
		
        createHitArea();
	}

	function stopAnimation(){
		_sprite.stop();
	}

    function createHitArea(){
        _hitArea = new createjs.Shape();

        switch(id){
            case "animation":
                _hitArea.graphics.beginFill("red").drawRect(518, 856, 302, 118);
            break;
            case "director":
                _hitArea.graphics.beginFill("red").drawRect(208, 726, 208, 728);
            break;
            case "comics":
                _hitArea.graphics.beginFill("red").drawRect(1006, 895, 250, 98);
            break;
            case "contact":
                _hitArea.graphics.beginFill("red").drawRect(1418, 778, 274, 92);
            break;
        }
        
    }


    function clickHit(){
        _clickCall(id);
    }

    function rollover(){
        _rolloverCall(id);
    }

    function rollout(){
        _rolloutCall(id);
    }

	init();


	return this;
}