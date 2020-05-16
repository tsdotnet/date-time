"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-fallthrough */
var TimeUnit;
(function (TimeUnit) {
    /**
     * A distinct unit of time measurement.
     */
    let Value;
    (function (Value) {
        Value[Value["Ticks"] = 0] = "Ticks";
        Value[Value["Milliseconds"] = 1] = "Milliseconds";
        Value[Value["Seconds"] = 2] = "Seconds";
        Value[Value["Minutes"] = 3] = "Minutes";
        Value[Value["Hours"] = 4] = "Hours";
        Value[Value["Days"] = 5] = "Days";
    })(Value = TimeUnit.Value || (TimeUnit.Value = {})); // Earth Days
    /**
     * Converts any TimeUnit value to it's respective millisecond quantity.
     * @param {number} value
     * @param {Value} units
     * @return {number} Number of milliseconds representing the specified units.
     */
    function toMilliseconds(value, units) {
        // noinspection FallThroughInSwitchStatementJS
        switch (units) {
            case Value.Days:
                value *= 24 /* day */;
            case Value.Hours:
                value *= 60 /* hour */;
            case Value.Minutes:
                value *= 60 /* minute */;
            case Value.Seconds:
                value *= 1000 /* second */;
            case Value.Milliseconds:
                return value;
            case Value.Ticks:
                return value / 10000 /* millisecond */;
            default:
                throw new Error('Invalid TimeUnit.');
        }
    }
    TimeUnit.toMilliseconds = toMilliseconds;
    /**
     * Converts milliseconds to the specified TimeUnit quantity.
     * @param {number} ms
     * @param {Value} units
     * @return {number}
     */
    function fromMilliseconds(ms, units) {
        switch (units) {
            case Value.Days:
                return ms / 86400000 /* day */;
            case Value.Hours:
                return ms / 3600000 /* hour */;
            case Value.Minutes:
                return ms / 60000 /* minute */;
            case Value.Seconds:
                return ms / 1000 /* second */;
            case Value.Milliseconds:
                return ms;
            case Value.Ticks:
                return ms * 10000 /* millisecond */;
            default:
                throw new Error('Invalid TimeUnit.');
        }
    }
    TimeUnit.fromMilliseconds = fromMilliseconds;
    /**
     * Converts a TimeQuantity to the the TimeUnit requested..
     * @param {TimeQuantity} quantity
     * @param {Value} toUnits
     * @return {number}
     */
    function from(quantity, toUnits) {
        return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), toUnits);
    }
    TimeUnit.from = from;
    /**
     * Asserts if the time unit value is valid.
     * @param {Value} unit
     * @return {true}
     */
    function assertValid(unit) {
        if (isNaN(unit) || unit > Value.Days || unit < Value.Ticks || Math.floor(unit) !== unit)
            throw new Error('Invalid TimeUnit.');
        return true;
    }
    TimeUnit.assertValid = assertValid;
})(TimeUnit || (TimeUnit = {}));
Object.freeze(TimeUnit.Value);
Object.freeze(TimeUnit);
exports.default = TimeUnit;
//# sourceMappingURL=TimeUnit.js.map