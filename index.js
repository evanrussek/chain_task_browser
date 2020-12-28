
// this script constructs a 'timeline' - an array of structures where each
// structure references a 'plugin' that will be run, in that order

// which plugins we can call were loaded on the index.html page
// jspsych has lots of pre-defined plugins
// for this one, i made one called 'chain-episode-plugin', in the evan plugins folder
// this has the name 'evan-twostim-choice'

var timeline = [];

var full_screen = { // this plugin will prompt the full screen
  type: 'fullscreen',
  fullscreen_mode: true
};
timeline.push(full_screen)

/* define instructions trial */
// var instructions = {
  // there's multiple plugins for displaying instructions, for my task i use one where i show powerpoint slides
  //  it uses the jspsych instruction plugin
//  type: "html-keyboard-response",
//  stimulus: "<p>In this experiment, you'll choose between which of two slot machines " +
//      "to play.</p><p> Both slot machines have some chance at providing a reward. " +
//      "<p>Try to learn which slot machine is the most rewarding so you can get as many rewards as you can. </p> " +
//      "<div style='width: 700px;'>"+
//      "</div>"+
//      "<p>Press any key to begin.</p>",
//  post_trial_gap: 1000
//};
//timeline.push(instructions)


// give path to choice images
var state_images = ["Stimuli/Image_Stimuli/ball.png",
                  "Stimuli/Image_Stimuli/barrel.png",
                  "Stimuli/Image_Stimuli/binoculars.png",
                  "Stimuli/Image_Stimuli/butterfly.png",
                  "Stimuli/Image_Stimuli/car.png",
                  "Stimuli/Image_Stimuli/fence.png",
                  "Stimuli/Image_Stimuli/girl.png",
                  "Stimuli/Image_Stimuli/house.png",
                  "Stimuli/Image_Stimuli/key.png",
                  "Stimuli/Image_Stimuli/marbles.png",
                  "Stimuli/Image_Stimuli/pepper.png",
                  "Stimuli/Image_Stimuli/scissors.png"
                ];



 // define 10 of these trials and push them onto the array.
var n_choice_trials = 3;

var trial_start_states = [0, 1, 2, 3, 4, 5, 6, 7,  8, 9, 10, 11];
// states are defined 0 - 11
var next_state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];

// colors and categories for each state
var state_colors = ["Red", "Green", "Green", "Green", "Green", "Red", "Red", "Blue", "Green", "Red", "Blue", "Green"];
var state_categories = ["Face", "House", "Object", "Face", "House", "Object", "Face", "House", "Object", "Face", "House", "Object"];


// loop through each choice trial and push it to the array
for (var i = 0; i < n_choice_trials; i++){
  var choice_trial = { // this calls the plugin that i made in - jspsych-evan-explugin.js
    type: 'chain-episode',
    state_images: state_images,
    start_state_number: trial_start_states[i],//trial_start_states[i],
    next_state: next_state,
    current_reward_category: "Face",
    current_terminate_color: "Red",
    state_colors: state_colors,
    state_categories: state_categories,
    trial_number: i+1
  }
  timeline.push(choice_trial);
}

//  run the exmperiment, do a local save of the results.
jsPsych.init({
    timeline: timeline,
    show_preload_progress_bar: false,
    on_finish: function() {
      jsPsych.data.get().localSave('csv','results.csv');
  }
});
