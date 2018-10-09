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
    var SlotMachine = /** @class */ (function (_super) {
        __extends(SlotMachine, _super);
        function SlotMachine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SlotMachine.prototype.Start = function () {
        };
        SlotMachine.prototype.Update = function () {
        };
        SlotMachine.prototype.Reset = function () {
        };
        SlotMachine.prototype.Destroy = function () {
        };
        return SlotMachine;
    }(objects.gameObject));
    objects.SlotMachine = SlotMachine;
})(objects || (objects = {}));
//# sourceMappingURL=slotMachine.js.map