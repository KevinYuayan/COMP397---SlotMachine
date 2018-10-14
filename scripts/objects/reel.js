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
var objects;
(function (objects) {
    // Reel object to hold the different reel images
    var Reel = /** @class */ (function (_super) {
        __extends(Reel, _super);
        // private instance variables
        // public properties
        // constructor
        function Reel(imageString) {
            var _this = _super.call(this, imageString) || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        Reel.prototype.Start = function () {
            this.y = 180;
        };
        Reel.prototype.Update = function () {
        };
        Reel.prototype.Reset = function () {
        };
        Reel.prototype.Destroy = function () {
        };
        return Reel;
    }(objects.GameObject));
    objects.Reel = Reel;
})(objects || (objects = {}));
//# sourceMappingURL=reel.js.map