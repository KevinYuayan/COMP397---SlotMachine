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
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // private instance variables
        // public properties
        // constructor
        /**
         *Creates an instance of Background.
         * @param {string} imageString
         * @memberof Background
         */
        function Background(imageString) {
            return _super.call(this, imageString) || this;
        }
        // private methods
        // public methods
        Background.prototype.Start = function () {
        };
        Background.prototype.Update = function () {
        };
        Background.prototype.Reset = function () {
        };
        Background.prototype.Destroy = function () {
        };
        return Background;
    }(objects.GameObject));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map