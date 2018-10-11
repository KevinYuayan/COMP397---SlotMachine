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
            _this._fruits = "";
            _this.Main();
            return _this;
        }
        // private methods
        Play.prototype.Quit = function (event) {
            managers.Game.currentState = config.Scene.OVER;
            this.Destroy();
        };
        /* When the player clicks the spin button the game kicks off */
        Play.prototype.Spin = function (event) {
            this._playerBetString = managers.Game.playerBet.value;
            if (!isNaN(Number(this._playerBetString))) {
                this._playerBet = parseInt(this._playerBetString);
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
                    this._fruits = this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2];
                    //$("div#result>p").text(this._fruits);
                    this.determineWinnings();
                    this._turn++;
                }
                else {
                    alert("Please enter a valid bet amount");
                }
            }
            else {
                alert(this._playerBetString + " is not an Integer");
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
                            betLine[spin] = "Bell";
                            this._bells++;
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
        Play.prototype.determineWinnings = function () {
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
                else if (this._bells == 3) {
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
                else if (this._bells == 2) {
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
            this._bells = 0;
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
        //instatniates the objects
        Play.prototype.Main = function () {
            managers.Game.playerBet.style.display = "inline";
            this._playBackground = new objects.Background("slotMachine");
            this._btnQuit = new objects.Button("quitButton");
            this._btnReset = new objects.Button("resetButton");
            this._btnSpin = new objects.Button("spinButton");
            this._btnQuit.on("click", this.Quit);
            this._btnReset.on("click", this.Reset);
            this._btnSpin.on("click", this.Spin);
            this.Reset();
        };
        // places the objects in the scene
        Play.prototype.Start = function () {
        };
        Play.prototype.Update = function () {
            this._playBackground.Update();
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