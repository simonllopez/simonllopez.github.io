var stage = new createjs.Stage("demoCanvas");

goalContainer = new createjs.Container();
gridContainer = new createjs.Container();

var grid;
var goal;

var imageGoal;
var imageRotor;
var imageGrid;

genericplot("chart", "rgb(54, 153, 95)", "rgb(54, 133, 153)");

Goalpos = 50;

var bitmap;
var bitmapBg;
const dimensions = {
  x: 500,
  y: 500,
};

dimensions.centerX = dimensions.x / 2;
dimensions.centerY = dimensions.y / 2;

const setPosition = (shape, x, y) => {
  if (x === undefined) console.error("no x on setPosition");
  if (y === undefined) console.error("no y on setPosition");

  shape.x = dimensions.centerX + x;
  shape.y = dimensions.centerY - y;
};

const reversePosition = (shape, x, y) => {
  shape.x = x - dimensions.centerX;
  shape.y = -y + dimensions.centerY;
};

class Imagen {
  constructor(imageUrl, regx, regy) {
    this.bitmap;
    this.imageUrl = imageUrl;

    this.regx = regx;
    this.regy = regy;

    this.bitmap;
  }

  load(container, options) {
    var image = new Image();
    image.src = this.imageUrl;
    image.onload = (event) => {
      var image = event.target;
      this.bitmap = new createjs.Bitmap(image);
      container.addChild(this.bitmap);

      if (this.regx && this.regy) {
        this.bitmap.regX = this.regx;
        this.bitmap.regY = this.regy;

        setPosition(this.bitmap, 0, 0);

        if (options && options.rotation) {
          this.rotate(options.rotation);
        } else this.rotate(0);
      }

      if (options && options.hide === true) {
        this.bitmap.visible = false;
      }
    };
  }

  hide() {
    this.bitmap.visible = false;
  }

  show() {
    this.bitmap.visible = true;
  }

  rotate(angle) {
    this.bitmap.rotation = 90 - angle;
  }
}

const init = () => {
  // var image = new Image();
  // image.src = "assets/img.svg";
  // image.onload = handleImageLoad;

  // var image = new Image();
  // image.src = "assets/imgGoal.svg";
  // image.onload = (event) => {
  //   var image = event.target;
  //   goal = new createjs.Bitmap(image);
  //   goalContainer.addChild(goal);
  //   const ancho = 70;
  //   const largo = 209;
  //   goalContainer.regX = ancho / 2;
  //   goalContainer.regY = largo - ancho / 2;
  //   setPosition(goalContainer, 0, 0);
  // };

  const ancho = 70;
  const largo = 209;

  // TestImg = new Imagen("assets/imgGoal.svg", ancho / 2, largo - ancho / 2);
  // TestImg.load(stage, { hide: false });

  imageBackgroud = new Imagen("assets/fondo.svg");
  imageBackgroud.load(stage);

  imageRotor = new Imagen("assets/img.svg", 70 / 2, 209 - 70 / 2);
  imageRotor.load(stage);

  imageGoal = new Imagen("assets/imgGoal.svg", 70 / 2, 209 - 70 / 2);
  imageGoal.load(stage, { rotation: 45 });

  imageGrid = new Imagen("assets/fondo2.svg");
  imageGrid.load(stage, { hide: true });

  /*   var imageBg = new Image();
  imageBg.src = "assets/fondo.svg";
  imageBg.onload = handleImageBgLoad; */

  // var imageGrid = new Image();
  // imageGrid.src = "assets/fondo2.svg";

  // imageGrid.onload = (event) => {
  //   var image = event.target;
  //   grid = new createjs.Bitmap(image);
  // };

  // stage.addChild(gridContainer);
  // stage.addChild(shipContainer);
  // stage.addChild(goalContainer);

  stage.update();
};

init();

const time0 = Date.now();

let speed = 0;
let last_speed = 0;
actionSpeed = 0;

let pos = 0;

const innerciaRatio = 0.5;

let isGridOn = false;
let isGoalOn = false;
let isManualMode = false;

$("#button-grid").addEventListener("click", (ev) => changeGrid());
$("#button-manual-move").addEventListener("click", (ev) => changeManualMode());
$("#button-goal-mode").addEventListener("click", (ev) =>
  changeGoalMode(!isGoalMode)
);
$("#button-goal").addEventListener("click", (ev) => changeGoalView(!isGoal));

keyboardMode = false;

document.addEventListener("keydown", (event) => {
  if (!keyboardMode) return;

  if (event.key === "ArrowDown") {
    changeActionSpeed(actionSpeed - 1);
  }
  if (event.key === "ArrowUp") {
    changeActionSpeed(actionSpeed + 1);
  }
  if (event.key === " ") {
    changeActionSpeed(0);
  }
});

const changeGrid = () => {
  isGridOn = !isGridOn;
  if (isGridOn) {
    gridContainer.addChild(grid);
    $("#button-grid").classList.add("active");
  } else {
    gridContainer.removeChild(grid);
    $("#button-grid").classList.remove("active");
  }
};

isGoal = false;

const changeGoalView = (Newgoal) => {
  isGoal = Newgoal;

  if (isGoal) {
    goalContainer.addChild(goal);
    // goal.visible = true;
    $("#button-goal").classList.add("active");
  } else {
    // goal.visible = false;
    // goalContainer.removeChild(goal);
    $("#button-goal").classList.remove("active");
  }
};

const changeManualMode = () => {
  isManualMode = !isManualMode;

  isManualMode
    ? $("#button-manual-move").classList.add("active")
    : $("#button-manual-move").classList.remove("active");
};

let isGoalMode = false;

const changeGoalMode = (mode) => {
  isGoalMode = mode;
  if (isGoalMode) {
    $("#button-goal-mode").classList.add("active");
    // changeGoalView(true);
  } else {
    $("#button-goal-mode").classList.remove("active");
  }
};

const changeActionSpeed = (speed) => {
  actionSpeed = speed;
};

const tick = (event) => {
  const timeNow = Date.now();
  const t = (timeNow - time0) / 1000.0; // en segundos

  if (!isManualMode) {
    if (innerciaRatio > 1) innerciaRatio = 1;
    if (innerciaRatio < 0) innerciaRatio = 0;
    speed = actionSpeed * (1 - innerciaRatio) + last_speed * innerciaRatio;

    if (Math.abs(speed) < 0.01) speed = 0;

    pos = pos + speed;
  }

  imageRotor.rotate(pos);

  imageGoal.rotate(Goalpos);

  // goalContainer.rotation = -Goalpos + 90;

  Plotly.extendTraces("chart", { y: [[speed]] }, [0], 200);
  Plotly.extendTraces("chart", { y: [[actionSpeed]] }, [1], 200);

  last_speed = speed;
  stage.update(event);
};

let isMouseMove = false;

stage.on("stagemousemove", (ev) => {
  onMoveCalc(ev);
});

const onMoveCalc = (ev) => {
  if (!isMouseMove) return;

  if (isManualMode) {
    newPose = {};
    reversePosition(newPose, ev.stageX, ev.stageY);

    angle = Math.atan2(newPose.y, newPose.x);
    pos = (angle * 180) / Math.PI;
    // console.log(pos);
  }
  if (isGoalMode) {
    newPose = {};
    reversePosition(newPose, ev.stageX, ev.stageY);

    angle = Math.atan2(newPose.y, newPose.x);
    Goalpos = (angle * 180) / Math.PI;
  }
};

stage.on("stagemousedown", (ev) => {
  isMouseMove = true;
  onMoveCalc(ev);
});
stage.on("stagemouseup", () => (isMouseMove = false));

createjs.Ticker.addEventListener("tick", tick);
createjs.Ticker.setFPS(20);

//-----------------------
