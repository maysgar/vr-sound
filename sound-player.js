
console.log("In sound-player.js");

// This promise(?) allows the user to play the sound by looking at object.
// Otherwise, an the .play() function returns the promise's rejection handler, so it doesn'y play.
// the argument a is this.audio
async function playSound(a) {
    try {
        await a.play();
        a.className = "playing";
    }
    catch(err) {
        a.className = "";
    }
}

// This defines the audio-handler. It selects the first childNode of the audio-handler element. Any object that should play a sound
// needs to have an <audio> tag as a child.

AFRAME.registerComponent('audio-handler', {
    schema : {
        // audio_id: {type: "string", default: ""}
    },
    init: function() {
        this.playing = true;
        this.audio = this.el.childNodes[1];
        this.el.addEventListener('fusing', this.handlePlay.bind(this), false);
    },
    handlePlay: function() {
        // console.log("fusing...");
        // console.log('id: ' + this.data.audio_id);
        // console.log(this.audio);
        this.playing = false;
        if(!this.playing) {
            playSound(this.audio);
        } else {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.className="";
        }
        this.playing = !this.playing;
    }
});
