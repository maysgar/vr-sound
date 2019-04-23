// A FeedbackDelay effect, repeating every eighth note with 80% feedback
const delay2 = new Tone.FeedbackDelay('4n', 0.3)
  // chained into a Volume set to -12dB then to the Master output
  .chain(new Tone.Volume(-12), Tone.Master)

// a lowpass Filter with a frequency of 1500 Hz
const filter2 = new Tone.Filter(1000, 'lowpass')
  // the signal is sent to the Delay as well as Master
  .connect(delay2).toMaster()

// Synth 2
const synth2 = new Tone.PolySynth({
  volume: -5, // the oscillator volume set to -12dB
  oscillator: {
    type: 'square' // oscillator type to sin wave
  },
  envelope: {
    attack: 0.02, // envelope attack set to 20ms
    release: 0.1 // envelope release set to 1s
  }
}).connect(filter2) // connect the synth's output to the filter

// Our customer synth component
AFRAME.registerComponent('synth2', {
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
    console.log('init synth 2')
    this.el.addEventListener('fusing', this.trigger.bind(this))
    //this.el.addEventListener('mousedown', this.test.bind(this))
  },
  trigger: function() {
    // trigger a note on the synth
    // this.data refers to the arguments defined
    //console.log("Playing synth 2 note : " + this.data.note);

    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    synth2.triggerAttackRelease(this.data.note, this.data.duration);
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
