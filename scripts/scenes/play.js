var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // public variables
        // constructor
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // private methods
        Play.prototype.Quit = function (event) {
            managers.Game.currentState = config.Scene.OVER;
            this.Destroy();
        };
        /* When the player clicks the spin button the game kicks off */
        Play.prototype.Spin = function (event) {
            if (this._playerMoney == 0) {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    this.Reset();
                }
            }
            else if (this._playerBet > this._playerMoney) {
                alert("You don't have enough Money to place that bet.");
            }
            else if (this._playerBet < 0) {
                alert("All bets must be a positive $ amount.");
            }
            else if (this._playerBet <= this._playerMoney) {
                this._spinResult = this.Reels();
                // method to display results on reel
                this.DisplayResults();
                this.DetermineWinnings();
                this._turn++;
            }
            else {
                alert("Please enter a valid bet amount");
            }
        };
        // Displays results on the reels
        Play.prototype.DisplayResults = function () {
            for (var index = 0; index < this._spinResult.length; index++) {
                var result = this._spinResult[index];
                this._reels[index] = new objects.Reel(result);
                this._reels[index].x = this._reelObjXLocation[index];
                this.stage.addChild(this._reels[index]);
            }
        };
        // Spins each reel to get the spin result
        Play.prototype.Reels = function () {
            {
                var betLine = [" ", " ", " "];
                var outCome = [0, 0, 0];
                for (var spin = 0; spin < 3; spin++) {
                    outCome[spin] = Math.floor((Math.random() * 65) + 1);
                    switch (outCome[spin]) {
                        case this.checkRange(outCome[spin], 1, 27): // 41.5% probability
                            betLine[spin] = "blank";
                            this._blanks++;
                            break;
                        case this.checkRange(outCome[spin], 28, 37): // 15.4% probability
                            betLine[spin] = "Grapes";
                            this._grapes++;
                            break;
                        case this.checkRange(outCome[spin], 38, 46): // 13.8% probability
                            betLine[spin] = "Banana";
                            this._bananas++;
                            break;
                        case this.checkRange(outCome[spin], 47, 54): // 12.3% probability
                            betLine[spin] = "Orange";
                            this._oranges++;
                            break;
                        case this.checkRange(outCome[spin], 55, 59): //  7.7% probability
                            betLine[spin] = "Cherry";
                            this._cherries++;
                            break;
                        case this.checkRange(outCome[spin], 60, 62): //  4.6% probability
                            betLine[spin] = "Bar";
                            this._bars++;
                            break;
                        case this.checkRange(outCome[spin], 63, 64): //  3.1% probability
                            betLine[spin] = "Lemon";
                            this._lemons++;
                            break;
                        case this.checkRange(outCome[spin], 65, 65): //  1.5% probability
                            betLine[spin] = "Seven";
                            this._sevens++;
                            break;
                    }
                }
                return betLine;
            }
        };
        /* This function calculates the player's winnings, if any */
        Play.prototype.DetermineWinnings = function () {
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
                this._winNumber++;
                this.showWinMessage();
            }
            else {
                this._lossNumber++;
                this.showLossMessage();
            }
        };
        /* Check to see if the player won the jackpot */
        Play.prototype.checkJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this._jackpot + " Jackpot!!");
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
        };
        /* Utility function to reset the player stats */
        Play.prototype.resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._lemons = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        /* Utility function to show a win message and increase player money */
        Play.prototype.showWinMessage = function () {
            this._playerMoney += this._winnings;
            //$("div#winOrLose>p").text("You Won: $" + winnings);
            this.resetFruitTally();
            this.checkJackPot();
        };
        /* Utility function to show a loss message and reduce player money */
        Play.prototype.showLossMessage = function () {
            this._playerMoney -= this._playerBet;
            //$("div#winOrLose>p").text("You Lost!");
            this.resetFruitTally();
        };
        /* Utility function to check if a value falls within a range of bounds */
        Play.prototype.checkRange = function (value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        };
        // public methods
        // places the objects in the scene
        Play.prototype.Main = function () {
            this.addChild(this._playBackground);
            this.addChild(this._slotMachine);
            this.addChild(this._lblbet);
            this.addChild(this._lbljackpot);
            this.addChild(this._lblmoney);
            this.addChild(this._btnQuit);
            this.addChild(this._btnReset);
            this.addChild(this._btnSpin);
        };
        // instatniates the objects
        Play.prototype.Start = function () {
            this._playBackground = new objects.Background("playBackground");
            this._slotMachine = new objects.Background("slotMachine");
            this._lblbet = new objects.Label("Bet:" + this._playerBet, "15", "Consolas", "#FFFFFF", 320, 240, true);
            this._lbljackpot = new objects.Label("Jackpot:" + this._jackpot, "15", "Consolas", "#FFFFFF", 300, 240, true);
            this._lblmoney = new objects.Label("Money:" + this._playerMoney, "15", "Consolas", "#FFFFFF", 340, 240, true);
            this._btnQuit = new objects.Button("quitButton");
            this._btnReset = new objects.Button("resetButton");
            this._btnSpin = new objects.Button("spinButton");
            // individual reels are created after a spin
            this._reels = new Array();
            // instantiates the x coordinates for the reels
            this._reelObjXLocation = new Array();
            this._reelObjXLocation[0] = 100;
            this._reelObjXLocation[1] = 200;
            this._reelObjXLocation[2] = 300;
            this._btnQuit.on("click", this.Quit);
            this._btnReset.on("click", this.Reset);
            this._btnSpin.on("click", this.Spin);
            this.Reset();
            this.Main();
        };
        Play.prototype.Update = function () {
        };
        Play.prototype.Reset = function () {
            this.resetFruitTally();
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._turn = 0;
            this._playerBet = 0;
            this._winNumber = 0;
            this._lossNumber = 0;
            this._winRatio = 0;
        };
        Play.prototype.Destroy = function () {
            _super.prototype.Destroy.call(this);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map