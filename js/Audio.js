function AudioPlayer(manifest, callback){
    var _audioManifest = manifest;
    var audio = new Object();
    audio.music;
    
    audio.muted = false; // Mute setting
    audio.interrupted = false; // Focus/Unfocus window
    
    audio.audioPath = "audio/";
    
    audio.numberLoaded = 0;
    
    audio.init = function(){
        createjs.Sound.alternateExtensions = ["ogg"];

        createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, (this)) );
        createjs.Sound.registerSounds(_audioManifest, this.audioPath);
        
    }
    
    audio.loadHandler = function(evt){
        this.numberLoaded ++;
        if(this.numberLoaded == _audioManifest.length){

            //audioPlayerReady(); // main.js

            callback();
        }
        
    }
    
    audio.startNextSong = function(id, volume){
        var scope = this;
        var songID = id;
        
        var musicVol = volume;
        if(volume == false || volume == "undefined" || volume == undefined){
            musicVol = 1;
        }
        
        
        // Check if there is already music playing
        if(this.music){
            // Tween volume down before starting next song

			createjs.Tween.get(this.music).to({volume:0}, 1000).call(function(){
				scope.music.stop();
				scope.playSong(songID, musicVol);
			});
        }else{
            // Play initial song
            this.playSong(id, musicVol);
        }
    }
    
    audio.playSong = function(id, musicVol){
        this.music = createjs.Sound.play(id, {loop:-1, volume:0});
        
		createjs.Tween.get(this.music).to({volume:musicVol}, 1000);
        
    }
    
    audio.quietMusic = function(delay){
        createjs.Tween.get(this.music).to({volume:0}, 100);
        
        var scope = this;
        
        setTimeout(function(){scope.fadeIn();}, delay);
    }
    audio.fadeIn = function(){
        createjs.Tween.get(this.music).to({volume:1}, 1000);
    }
    
    audio.playIncidental = function(id, volume){
        // Play indicated sound effect, no looping
        if(this.muted){ return; }
        
        var sfxVol = volume;
        if(volume == false || volume == "undefined" || volume == undefined){
            sfxVol = 1;
        }
        
        createjs.Sound.play(id, {volume: sfxVol});
    }
    
    audio.muteAudio = function(bool){
        if(bool){
            createjs.Sound.setMute(true);
            this.muted = true;
        }else{
            createjs.Sound.setMute(false);
            this.muted = false;
        }
    }
    
    audio.getMuted = function(){
        return this.muted;
    }
    
    audio.interrupt = function(){
        createjs.Sound.setMute(true);
        
        this.interrupted = true;
    }
    
    audio.uninterrupt = function(){
        if(this.muted == false){
            createjs.Sound.setMute(false);
        }
        
        this.interrupted = false;
    }
    
    audio.getProgress = function(){
        var loaded = this.numberLoaded / _audioManifest.length;
        return loaded;
    }
    
    audio.init();
    
    return audio;
}