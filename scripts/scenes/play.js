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
        // Private instance variables
        // private _slotMachine:objects.SlotMachine;
        // public variables
        // constructor
        function Play() {
            return _super.call(this) || this;
        }
        // private methods
        // public methods
        Play.prototype.Main = function () {
            throw new Error("Method not implemented.");
        };
        Play.prototype.Start = function () {
            throw new Error("Method not implemented.");
        };
        Play.prototype.Update = function () {
            throw new Error("Method not implemented.");
        };
        Play.prototype.Reset = function () {
            throw new Error("Method not implemented.");
        };
        Play.prototype.Destroy = function () {
            throw new Error("Method not implemented.");
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map