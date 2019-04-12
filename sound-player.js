
console.log("In sound-player.js");

var playing = false;
var audio;

// This promise(?) allows the user to play the sound by looking at object. 
// Otherwise, an the .play() function returns the promise's rejection handler, so it doesn'y play. 
async function playSound() {
    try {
        await audio.play();
        audio.className = "playing";
    }
    catch(err) {
        audio.className = "";
    }
}

AFRAME.registerComponent('audiohandler', {
    schema : {
        audio_id: {type: "string", default: ""}
    },
    init: function() {
       playing = true;
       audio = document.getElementById(this.data.audio_id);
       this.el.addEventListener('fusing', this.handlePlay.bind(this), false);
    },
    handlePlay: function() {
        console.log("fusing...");
        console.log('id: ' + this.data.audio_id);
        console.log(audio);
        if(!playing) {
            playSound();
        } else {
            audio.pause();
            audio.currentTime = 0;
            audio.className="";
        }
         playing = !playing;
    }
});