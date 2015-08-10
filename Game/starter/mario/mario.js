/* mario.js */
// Starts everything.

function FullScreenMario() {
  var time_start = Date.now();
  
  // Thanks, Obama...
  ensureLocalStorage();
  
  // I keep this cute little mini-library for some handy functions
  TonedJS(true);
  
  // It's useful to keep references to the body
  window.body = document.body;
  window.bodystyle = body.style;
  
  // Know when to shut up
  window.verbosity = {Maps: false,
                      Sounds: false,
                      };
  
  window.requestAnimationFrame = window.requestAnimationFrame
                           || window.mozRequestAnimationFrame
                           || window.webkitRequestAnimationFrame
                           || window.msRequestAnimationFrame
                           || function(func) { setTimeout(func, timer); };
  window.cancelAnimationFrame = window.cancelAnimationFrame
                           || window.webkitCancelRequestAnimationFrame
                           || window.mozCancelRequestAnimationFrame
                           || window.oCancelRequestAnimationFrame
                           || window.msCancelRequestAnimationFrame
                           || clearTimeout;

  window.Uint8ClampedArray = window.Uint8ClampedArray
                          || window.Uint8Array
                          || Array;

  // Resetting everything may take a while
  resetMeasurements();
  resetLibrary();
  resetEvents();
  resetCanvas();
  resetMaps();
  resetScenery();
  resetTriggers();
  resetSeed();
  resetSounds();

  window.luigi = (localStorage && localStorage.luigi == "true");

  // With that all set, set the map to World11.
  window.gameon = true;
  setMap(1,1);
  
  log("It took " + (Date.now() - time_start) + " milliseconds to start.");
}

// To do: add in a real polyfill
function ensureLocalStorage() {
  var ls_ok = false;
  try {
  if(!window.hasOwnProperty("localStorage"))
    window.localStorage = { crappy: true };
  
  // Some browsers (mainly IE) won't allow it on a local machine anyway
  if(window.localStorage) ls_ok = true;
 }
 catch(err) {
    ls_ok = false;
  }
  if(!ls_ok) {
    var nope = document.body.innerText = "It seems your browser does not allow localStorage!";
    throw nope;
  }
}

/* Basic reset operations */
function resetMeasurements() {
  resetUnitsize(4);
  resetTimer(1000 / 60);
  
  window.jumplev1 = 32;
  window.jumplev2 = 64;
  window.ceillev  = 88; // The floor is 88 spaces (11 blocks) below the yloc = 0 level
  window.ceilmax  = 104; // The floor is 104 spaces (13 blocks) below the top of the screen (yloc = -16)
  window.castlev  = -48;
  window.paused   = true;
  
  resetGameScreen();
  if(!window.parentwindow) window.parentwindow = false;
}

// Unitsize is kept as a measure of how much to expand (typically 4)
function resetUnitsize(num) {
  window.unitsize = num;
  for(var i = 2; i <= 64; ++i) {
    window["unitsizet" + i] = unitsize * i;
    window["unitsized" + i] = unitsize / i;
  }
  window.scale = unitsized2; // Typically 2
  window.gravity = round(12 * unitsize) / 100; // Typically .48
}

function resetTimer(num) {
  num = roundDigit(num, .001);
  window.timer = window.timernorm = num;
  window.timert2 = num * 2;
  window.timerd2 = num / 2;
  window.fps = window.fps_target = roundDigit(1000 / num, .001);
  window.time_prev = Date.now();
}

function resetGameScreen() {
  window.gamescreen = new getGameScreen();
}
function getGameScreen() {
  resetGameScreenPosition(this);
  // Middlex is static and only used for scrolling to the right
  this.middlex = (this.left + this.right) / 2;
  // this.middlex = (this.left + this.right) / 3;
  
  // This is the bottom of the screen - water, pipes, etc. go until here
  window.botmax = this.height - ceilmax;
  if(botmax < unitsize) {
    body.innerHTML = "<div><br>Your screen isn't high enough. Make it taller, then refresh.</div>";
  }
  
  // The distance at which Things die from falling
  this.deathheight = this.bottom + 48;
}
function resetGameScreenPosition(me) {
  me = me || window.gamescreen;
  me.left = me.top = 0;
  me.bottom = innerHeight;
  me.right = innerWidth;
  me.height = innerHeight / unitsize;
  me.width = innerWidth / unitsize;
  me.unitheight = innerHeight;
  me.unitwidth = innerWidth;
}

// Events are done with TimeHandlr.js
// This helps make timing obey pauses, and makes class cycles much easier
function resetEvents() {
  window.TimeHandler = new TimeHandlr({
    onSpriteCycleStart: "onadding",
    doSpriteCycleStart: "placed",
    cycleCheckValidity: "alive",
    timingDefault: 9
  });
}

// Sounds are done with AudioPlayr.js
function resetSounds() {
  window.sounds = {};
  window.theme = false;
  window.muted = (localStorage && localStorage.muted == "true");
  
  window.AudioPlayer = new AudioPlayr({
    directory: "Sounds",
    getVolumeLocal: function() { return .49; },
    getThemeDefault: function() { return area.theme; }, 
    library: {
      Sounds: [
        "Bowser Falls",
        "Bowser Fires",
        "Break Block",
        "Bump",
        "Coin",
        "Ending",
        "Fireball",
        "Firework",
        "Flagpole",
        "Gain Life",
        "Game Over 2",
        "Game Over",
        "Hurry",
        "Into the Tunnel",
        "Jump Small",
        "Jump Super",
        "Kick",
        "Level Complete",
        "Player Dies",
        "Pause",
        "Pipe",
        "Power Down",
        "Powerup Appears",
        "Powerup",
        "Stage Clear",
        "Vine Emerging",
        "World Clear",
        "You Dead"
      ],
      Themes: [
        "Castle",
        "Overworld",
        "Underwater",
        "Underworld",
        "Star",
        "Sky",
        "Hurry Castle",
        "Hurry Overworld",
        "Hurry Underwater",
        "Hurry Underworld",
        "Hurry Star",
        "Hurry Sky"
      ]
    }
  });
}

// Quadrants are done with QuadsKeepr.js
// This starts off with 7 cols and 6 rows (each has 1 on each side for padding)
function resetQuadrants() {
  window.QuadsKeeper = new QuadsKeepr({
    num_rows: 5,
    num_cols: 6,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    tolerance: unitsized2,
    onUpdate: spawnMap,
    onCollide: false
  });
}

// Variables regarding the state of the game
// This is called in setMap to reset everything
function resetGameState(nocount) {
  // HTML is reset here
  clearAllTimeouts();
  // Also reset data
  resetData();
  window.nokeys = window.spawning = window.spawnon =
    window.notime = window.editing = window.qcount = window.lastscroll = 0;
  window.paused = window.gameon = window.speed = 1;
  // Shifting location shouldn't wipe the gamecount (for key histories)
  if(!nocount) window.gamecount = 0;
  // And quadrants
  resetQuadrants();
  // Keep a history of pressed keys
  window.gamehistory = [];
  // Clear audio
  AudioPlayer.pause();
}

function scrollWindow(x, y) {
  x = x || 0; y = y || 0;
  var xinv = -x, yinv = -y;
  
  gamescreen.left += x; gamescreen.right += x;
  gamescreen.top += y; gamescreen.bottom += y;
  
  shiftAll(characters, xinv, yinv);
  shiftAll(solids, xinv, yinv);
  shiftAll(scenery, xinv, yinv);
  shiftAll(QuadsKeeper.getQuadrants(), xinv, yinv);
  shiftElements(texts, xinv, yinv);
  QuadsKeeper.updateQuadrants(xinv);
  
  if(window.playediting) scrollEditor(x, y);
}
function shiftAll(stuff, x, y) {
  for(var i = stuff.length - 1; i >= 0; --i)
      shiftBoth(stuff[i], x, y);
}
function shiftElements(stuff, x, y) {
  for(var i = stuff.length - 1, elem; i >= 0; --i) {
    elem = stuff[i];
    elementShiftLeft(elem, x);
    elementShiftTop(elem, y);
  }
}

// Similar to scrollWindow, but saves the player's x-loc
function scrollPlayer(x, y, see) {
  var saveleft = player.left,
      savetop = player.top;
  y = y || 0;
  scrollWindow(x,y);
  setLeft(player, saveleft, see);
  setTop(player, savetop + y * unitsize, see);
  QuadsKeeper.updateQuadrants();
}

// Calls log if window.verbosity has the type enabled
function mlog(type) {
  if(verbosity[type]) {
    log.apply(console, arguments);
  }
}
