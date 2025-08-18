"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUnit = void 0;
var TimeUnit;
(function (TimeUnit) {
    let UnitType;
    (function (UnitType) {
        UnitType[UnitType["Ticks"] = 0] = "Ticks";
        UnitType[UnitType["Milliseconds"] = 1] = "Milliseconds";
        UnitType[UnitType["Seconds"] = 2] = "Seconds";
        UnitType[UnitType["Minutes"] = 3] = "Minutes";
        UnitType[UnitType["Hours"] = 4] = "Hours";
        UnitType[UnitType["Days"] = 5] = "Days";
    })(UnitType = TimeUnit.UnitType || (TimeUnit.UnitType = {}));
    function toMilliseconds(value, units) {
        switch (units) {
            case UnitType.Days:
                value *= 24;
            case UnitType.Hours:
                value *= 60;
            case UnitType.Minutes:
                value *= 60;
            case UnitType.Seconds:
                value *= 1000;
            case UnitType.Milliseconds:
                return value;
            case UnitType.Ticks:
                return value / 10000;
            default:
                throw new Error('Invalid TimeUnit.');
        }
    }
    TimeUnit.toMilliseconds = toMilliseconds;
    function fromMilliseconds(ms, units) {
        switch (units) {
            case UnitType.Days:
                return ms / 86400000;
            case UnitType.Hours:
                return ms / 3600000;
            case UnitType.Minutes:
                return ms / 60000;
            case UnitType.Seconds:
                return ms / 1000;
            case UnitType.Milliseconds:
                return ms;
            case UnitType.Ticks:
                return ms * 10000;
            default:
                throw new Error('Invalid TimeUnit.');
        }
    }
    TimeUnit.fromMilliseconds = fromMilliseconds;
    function from(quantity, toUnits) {
        return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), toUnits);
    }
    TimeUnit.from = from;
    function assertValid(unit) {
        if (isNaN(unit) || unit > UnitType.Days || unit < UnitType.Ticks || Math.floor(unit) !== unit)
            throw new Error('Invalid TimeUnit.');
        return true;
    }
    TimeUnit.assertValid = assertValid;
})(TimeUnit || (exports.TimeUnit = TimeUnit = {}));
Object.freeze(TimeUnit.UnitType);
Object.freeze(TimeUnit);
exports.default = TimeUnit;
//# sourceMappingURL=TimeUnit.js.map