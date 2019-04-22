// A FeedbackDelay effect, repeating every eighth note with 80% feedback
const delay4 = new Tone.FeedbackDelay('8n', 0.0)
  // chained into a Volume set to -12dB then to the Master output
  .chain(new Tone.Volume(-10), Tone.Master)

// a highpass Filter with a frequency of 1000 Hz
const filter4 = new Tone.Filter(500, 'highpass')
  // the signal is sent to the Delay as well as Master
  .connect(delay4).toMaster()

// Synth 2
const synth4 = new Tone.Synth({
  volume: -12, // the oscillator volume set to -12dB
  oscillator: {
    type: 'sine' // set the oscillator type
  },
  envelope: {
    attack: 0.02, // set the envelope attack
    release: 2 // set the envelope release
  }
}).connect(filter4) // connect the synth's output to the filter

// Our customer synth component
AFRAME.registerComponent('synth4', {
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
    console.log('init synth 4')
    this.el.addEventListener('fusing', this.trigger.bind(this))
    //this.el.addEventListener('mousedown', this.test.bind(this))
  },
  trigger: function() {
    // trigger a note on the synth
    // this.data refers to the arguments defined
    //console.log("Playing synth 4 note : " + this.data.note);
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    synth4.triggerAttackRelease(this.data.note, this.data.duration);
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
