/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
/* eslint-disable no-fallthrough */
export var TimeUnit;
(function (TimeUnit) {
    /**
     * A distinct unit of time measurement.
     */
    let UnitType;
    (function (UnitType) {
        UnitType[UnitType["Ticks"] = 0] = "Ticks";
        UnitType[UnitType["Milliseconds"] = 1] = "Milliseconds";
        UnitType[UnitType["Seconds"] = 2] = "Seconds";
        UnitType[UnitType["Minutes"] = 3] = "Minutes";
        UnitType[UnitType["Hours"] = 4] = "Hours";
        UnitType[UnitType["Days"] = 5] = "Days";
    })(UnitType = TimeUnit.UnitType || (TimeUnit.UnitType = {})); // Earth Days
    /**
     * Converts any TimeUnit value to it's respective millisecond quantity.
     * @param {number} value
     * @param {UnitType} units
     * @return {number} Number of milliseconds representing the specified units.
     */
    function toMilliseconds(value, units) {
        // noinspection FallThroughInSwitchStatementJS
        switch (units) {
            case UnitType.Days:
                value *= 24 /* hours.per.day */;
            case UnitType.Hours:
                value *= 60 /* minutes.per.hour */;
            case UnitType.Minutes:
                value *= 60 /* seconds.per.minute */;
            case UnitType.Seconds:
                value *= 1000 /* milliseconds.per.second */;
            case UnitType.Milliseconds:
                return value;
            case UnitType.Ticks:
                return value / 10000 /* ticks.per.millisecond */;
            default:
                throw new Error('Invalid TimeUnit.');
        }
    }
    TimeUnit.toMilliseconds = toMilliseconds;
    /**
     * Converts milliseconds to the specified TimeUnit quantity.
     * @param {number} ms
     * @param {UnitType} units
     * @return {number}
     */
    function fromMilliseconds(ms, units) {
        switch (units) {
            case UnitType.Days:
                return ms / 86400000 /* milliseconds.per.day */;
            case UnitType.Hours:
                return ms / 3600000 /* milliseconds.per.hour */;
            case UnitType.Minutes:
                return ms / 60000 /* milliseconds.per.minute */;
            case UnitType.Seconds:
                return ms / 1000 /* milliseconds.per.second */;
            case UnitType.Milliseconds:
                return ms;
            case UnitType.Ticks:
                return ms * 10000 /* ticks.per.millisecond */;
            default:
                throw new Error('Invalid TimeUnit.');
        }
    }
    TimeUnit.fromMilliseconds = fromMilliseconds;
    /**
     * Converts a TimeQuantity to the the TimeUnit requested..
     * @param {TimeQuantity} quantity
     * @param {UnitType} toUnits
     * @return {number}
     */
    function from(quantity, toUnits) {
        return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), toUnits);
    }
    TimeUnit.from = from;
    /**
     * Asserts if the time unit value is valid.
     * @param {UnitType} unit
     * @return {true}
     */
    function assertValid(unit) {
        if (isNaN(unit) || unit > UnitType.Days || unit < UnitType.Ticks || Math.floor(unit) !== unit)
            throw new Error('Invalid TimeUnit.');
        return true;
    }
    TimeUnit.assertValid = assertValid;
})(TimeUnit || (TimeUnit = {}));
Object.freeze(TimeUnit.UnitType);
Object.freeze(TimeUnit);
export default TimeUnit;
//# sourceMappingURL=TimeUnit.js.map