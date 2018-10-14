// Scene that contains the slotmachine game
module scenes {
    export class Play extends objects.Scene {
        // Private instance variables
        // backgrounds
        private _playBackground: objects.Background;
        private _slotMachine: objects.Background;
        // labels
        private _lblmoney: objects.Label;
        private _lblbet: objects.Label;
        private _lbljackpot: objects.Label;

        // buttons
        private _btnReset: objects.Button;
        private _btnSpin: objects.Button;
        private _btnQuit: objects.Button;

        // numbers
        private _playerMoney: number;
        private _playerBet: number;
        private _winnings: number;
        private _jackpot: number;
        private _spinResult: string[];
        private _grapes: number;
        private _bananas: number;
        private _oranges: number;
        private _cherries: number;
        private _bars: number;
        private _lemons: number;
        private _sevens: number;
        private _blanks: number;
        // x value for the reel images
        private _reelObjXLocation: number[];
        // reel images
        private _reels: objects.Reel[];

        // public variables

        // constructor
        constructor() {
            super();
            this.Start();
        }
        // private methods

        // Play Methods (spin)

        // Displays results on the reels
        private DisplayResults(): void {
            this.RemoveOldResult();
            for (let index = 0; index < this._spinResult.length; index++) {
                let result: string = this._spinResult[index];
                this._reels[index] = new objects.Reel(result);
                this._reels[index].x = this._reelObjXLocation[index];
                this.addChild(this._reels[index]);
            }
        }

        // Removes the images from the previous spin
        private RemoveOldResult() {
            for (let index = 0; index < this._reels.length; index++) {
                this.removeChild(this._reels[index]);
            }
        }

        // Spins each reel to get the spin result
        private Reels(): string[] {
            {
                var betLine = [" ", " ", " "];
                var outCome = [0, 0, 0];

                for (var spin = 0; spin < 3; spin++) {
                    outCome[spin] = Math.floor((Math.random() * 65) + 1);
                    switch (outCome[spin]) {
                        case this.checkRange(outCome[spin], 1, 27):  // 41.5% probability
                            betLine[spin] = "blank";
                            this._blanks++;
                            break;
                        case this.checkRange(outCome[spin], 28, 37): // 15.4% probability
                            betLine[spin] = "grapes";
                            this._grapes++;
                            break;
                        case this.checkRange(outCome[spin], 38, 46): // 13.8% probability
                            betLine[spin] = "banana";
                            this._bananas++;
                            break;
                        case this.checkRange(outCome[spin], 47, 54): // 12.3% probability
                            betLine[spin] = "orange";
                            this._oranges++;
                            break;
                        case this.checkRange(outCome[spin], 55, 59): //  7.7% probability
                            betLine[spin] = "cherry";
                            this._cherries++;
                            break;
                        case this.checkRange(outCome[spin], 60, 62): //  4.6% probability
                            betLine[spin] = "bar";
                            this._bars++;
                            break;
                        case this.checkRange(outCome[spin], 63, 64): //  3.1% probability
                            betLine[spin] = "lemon";
                            this._lemons++;
                            break;
                        case this.checkRange(outCome[spin], 65, 65): //  1.5% probability
                            betLine[spin] = "seven";
                            this._sevens++;
                            break;
                    }
                }
                return betLine;
            }
        }

        /* This function calculates the player's winnings, if any */
        private DetermineWinnings() {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._bars == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._lemons == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._grapes == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._oranges == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._bars == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._lemons == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._sevens == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._sevens == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                this.showWinMessage();
            }
            else {
                this.showLossMessage();
            }

        }

        /* Check to see if the player won the jackpot */
        private checkJackPot() {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this._jackpot + " Jackpot!!");
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
        }

        /* Utility function to show a win message and increase player money */
        private showWinMessage() {
            createjs.Sound.play("dingSound");
            this._playerMoney += this._winnings;
            this.ResetFruitTally();
            this.checkJackPot();
        }

        /* Utility function to show a loss message and reduce player money */
        private showLossMessage() {
            createjs.Sound.play("slipSound");
            this._playerMoney -= this._playerBet;
            this.ResetFruitTally();
        }

        /* Utility function to check if a value falls within a range of bounds */
        private checkRange(value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        }
        
        // event handlers

        public ResetEvent(event: createjs.MouseEvent): void {
            this.Reset();
        }
        
        private Quit(event: createjs.MouseEvent = null): void {
            managers.Game.currentState = config.Scene.OVER;
            this.Destroy();
        }

        /* When the player clicks the spin button the game kicks off */
        private Spin(event: createjs.MouseEvent): void {
            this._spinResult = this.Reels();
            // method to display results on reel
            this.DisplayResults();
            this.DetermineWinnings();
        }
        
        //Update Methods

        // Changes to over scene if money is 0 or below
        private CheckMoney() {
            if (this._playerMoney <= 0) {
                this.Quit();
            }
        }

        // Checks and updates the bet amount
        // Hides spin button if invalid bet
        private CheckInput(): void {
            if (!isNaN(Number(managers.Game.playerBet.value))) {
                this._playerBet = parseInt(managers.Game.playerBet.value);
                if (this._playerBet <= this._playerMoney && this._playerBet > 0) {
                    if (!this._btnSpin.IsEnabled) {
                        this._btnSpin.IsEnabled = true;
                        this._btnSpin.addEventListener("click", this.Spin);
                    }
                }
                else {
                    this._btnSpin.IsEnabled = false;
                    this._btnSpin.off("click", this.Spin);
                }
            }
            else {
                this._btnSpin.IsEnabled = false;
                this._btnSpin.off("click", this.Spin);
            }
        }
 
        // public methods

        /* Utility function to reset the player stats */
        public ResetFruitTally() {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._lemons = 0;
            this._sevens = 0;
            this._blanks = 0;
        }

        // places the objects in the play scene
        public Main(): void {
            this.addChild(this._playBackground);
            this.addChild(this._slotMachine);

            this.addChild(this._lblbet);
            this.addChild(this._lbljackpot);
            this.addChild(this._lblmoney);

            this.addChild(this._btnQuit);
            this.addChild(this._btnReset);
            this.addChild(this._btnSpin);
        }

        // instatniates the Play scene
        public Start(): void {
            // resets the bet input field
            managers.Game.playerBet.value = "";
            managers.Game.playerBet.style.display = "inline";
            // Background objs
            this._playBackground = new objects.Background("playBackground");
            this._slotMachine = new objects.Background("slotMachine");
            // Label objs
            this._lblbet = new objects.Label("Bet:", "30px", "Consolas", "#000000", 200, 340, false)
            this._lbljackpot = new objects.Label("Jackpot:", "30px", "Consolas", "#000000", 200, 55, false)
            this._lblmoney = new objects.Label("Money:", "30px", "Consolas", "#000000", 200, 290, false)
            // Button objs
            this._btnQuit = new objects.Button("quitButton", 530, 30, true);
            this._btnReset = new objects.Button("resetButton", 530, 80, true);
            this._btnSpin = new objects.Button("spinButton", 530, 300, true);
            // Reel array. The individual reels are created after each spin
            this._reels = new Array<objects.Reel>();
            // instantiates the x coordinates for the reels
            this._reelObjXLocation = new Array<number>();
            this._reelObjXLocation[0] = 210;
            this._reelObjXLocation[1] = 286;
            this._reelObjXLocation[2] = 362;
            // Places the slot machine in the center of the canvas
            this._slotMachine.x = 150;
            // Binding event handlers to the play scene
            this.Quit = this.Quit.bind(this);
            this.ResetEvent = this.ResetEvent.bind(this);
            this.Spin = this.Spin.bind(this);
            // event listeners
            this._btnQuit.addEventListener("click", this.Quit);
            this._btnReset.addEventListener("click", this.ResetEvent);

            this.Main();
            this.Reset();
        }

        public Update(): void {
            this.CheckInput();
            this._lbljackpot.text = "Jackpot: $" + this._jackpot;
            this._lblmoney.text = "Money: $" + this._playerMoney;
            this.CheckMoney();
        }

        public Reset(): void {
            this._spinResult = ["spin", "spin", "spin"];
            this.DisplayResults();
            this.ResetFruitTally();
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
        }
        public Destroy(): void {
            super.Destroy();
        }
    }
}