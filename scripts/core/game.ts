//IIFE - Immediately Invoked Function Expression
/*  
    COMP397 - F2018 - SlotMachine Game
    By: John Yuayan
*/
(function(){
    // game variables
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;
    let assetManager:createjs.LoadQueue;

    // State Objects
    let currentScene:objects.Scene;
    let currentState:config.Scene;

    // Path Variables
    let imagePath:string = "./assets/images/";
    let soundPath:string = "./assets/sounds/";

    let assetManifest = [
        {id: "slotMachine", src: imagePath + "slotMachine.png"},
        {id: "startBackground", src: imagePath + "startBackground.jpg"},
        {id: "playBackground", src: imagePath + "playBackground.jpg"},

        {id: "restartButton", src: imagePath + "button_restart.png"},
        {id: "quitButton", src: imagePath + "button_quit.png"},
        {id: "resetButton", src: imagePath + "button_reset.png"},
        {id: "spinButton", src: imagePath + "button_spin.png"},
        {id: "playButton", src: imagePath + "button_play.png"},

        {id: "banana", src: imagePath + "banana.png"},
        {id: "bar", src: imagePath + "bar.png"},
        {id: "cherry", src: imagePath + "cherry.png"},
        {id: "grapes", src: imagePath + "grapes.png"},
        {id: "lemon", src: imagePath + "lemon.png"},
        {id: "orange", src: imagePath + "orange.png"},
        {id: "spin", src: imagePath + "spin.png"},
        {id: "seven", src: imagePath + "seven.png"},
        {id: "blank", src: imagePath + "blank.png"},

        {id: "dingSound", src: soundPath + "ding.wav"},
        {id: "slipSound", src: soundPath + "slip.mp3"}
    ]


    function Init():void {
        assetManager = new createjs.LoadQueue();
        managers.Game.assetManager = assetManager;// creates a reference to the global assetManager
        assetManager.installPlugin(createjs.Sound) // enable sound preloading
        assetManager.loadManifest(assetManifest); // preloads all assets in the assetManifest
        assetManager.on("complete", Start); // Calls start when assets are finished loading
    }

    function Start():void {
        console.log(`%c Game Started...`,"color: blue; font-size: 20px;");
        canvas = document.getElementsByTagName("canvas")[0];
        managers.Game.playerBet = document.getElementsByTagName("input")[0];
        stage = new createjs.Stage(canvas);
        managers.Game.stage = stage;
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // game will run at 60fps
        createjs.Ticker.on("tick", Update);

        currentState = config.Scene.START;
        managers.Game.currentState = config.Scene.START;
        Main();
    }

    // this is the main game loop
    function Update():void {
        
        if(currentState != managers.Game.currentState){
            currentState = managers.Game.currentState;
            Main();
        }

        stage.update();
        currentScene.Update();

    }

    // This functions changes the state of the game
    function Main():void {
        if(currentScene != null){
            currentScene.Destroy();
            stage.removeAllChildren();
        }
        // hides the input field when changing scenes
        managers.Game.playerBet.style.display = "none";

        switch(currentState) {
            case config.Scene.START:
            currentScene = new scenes.Start;
            break;
            case config.Scene.PLAY:
            currentScene = new scenes.Play;
            break;
            case config.Scene.OVER:
            currentScene = new scenes.Over;
            break;
        }
        stage.addChild(currentScene);
    }

    window.addEventListener("load", Init);
})();