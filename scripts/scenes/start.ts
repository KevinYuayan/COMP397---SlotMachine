module scenes{
    // Starting Screen
    export class Start extends objects.Scene{
        // private instance variables
        
        private _background:objects.Background;
        private _playButton:objects.Button;

        // public properties

        // constructors

        constructor() {
            super();

            this.Start();
        }

        // private methods


        // public methods

        public Main(): void {
            
            // adds background to the stage
            this.addChild(this._background);

            // adds play button to the stage
            this.addChild(this._playButton);

            // event listeners

            // starts the play scene after playButton is clicked
            this._playButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.PLAY;
            })
        }        
        public Start(): void {
            // Instantiates objects
            this._playButton = new objects.Button("playButton", 320, 420, true);
            this._background = new objects.Background("startBackground");

            this.Main();
        }
        public Update(): void {

        }
        public Reset(): void {
            
        }
        public Destroy(): void {
            super.Destroy();
        }
    }
}