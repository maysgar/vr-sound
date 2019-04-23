// A FeedbackDelay effect, repeating every eighth note with 80% feedback
const delay3 = new Tone.FeedbackDelay('4n', 0.1)
  // chained into a Volume set to -12dB then to the Master output
  .chain(new Tone.Volume(-12), Tone.Master)

// a highpass Filter with a frequency of 1000 Hz
const filter3 = new Tone.Filter(100, 'highpass')
  // the signal is sent to the Delay as well as Master
  .connect(delay3).toMaster()

// Synth 2
const synth3 = new Tone.Synth({
  volume: -12, // the oscillator volume set to -12dB
  oscillator: {
    type: 'triangle' // set the oscillator type
  },
  envelope: {
    attack: 0.25, // set the envelope attack
    release: 5 // set the envelope release
  }
}).connect(filter3) // connect the synth's output to the filter

// Our customer synth component
AFRAME.registerComponent('synth3', {
  // The schema defines arguments accepted by this component
  schema: {
    // The note / octave
    note: {
      type: 'string',
      default: 'C4'
    },
    // The duration: 8n describes an eighth note
    duration: {
      type: 'string',
      default: '4n'
    }
  },
  init: function() {
    // setup the fusing/hover event listener
    // this.el refers to the entity
    console.log('init synth 3')
    this.el.addEventListener('fusing', this.trigger.bind(this))
    //this.el.addEventListener('mousedown', this.test.bind(this))
  },
  trigger: function() {
    // trigger a note on the synth
    // this.data refers to the arguments defined
    //console.log("Playing synth 3 note : " + this.data.note);
    
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    synth3.triggerAttackRelease(this.data.note, this.data.duration);
  },
  test: function() {
   // console.log("yeet");
  },
  update: function() {},
  tick: function() {},
  remove: function() {},
  pause: function() {},
  play: function() {}
})
