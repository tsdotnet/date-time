/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
import { hours, milliseconds, minutes, seconds, ticks } from './howMany';
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
                value *= hours.per.day;
            case UnitType.Hours:
                value *= minutes.per.hour;
            case UnitType.Minutes:
                value *= seconds.per.minute;
            case UnitType.Seconds:
                value *= milliseconds.per.second;
            case UnitType.Milliseconds:
                return value;
            case UnitType.Ticks:
                return value / ticks.per.millisecond;
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
                return ms / milliseconds.per.day;
            case UnitType.Hours:
                return ms / milliseconds.per.hour;
            case UnitType.Minutes:
                return ms / milliseconds.per.minute;
            case UnitType.Seconds:
                return ms / milliseconds.per.second;
            case UnitType.Milliseconds:
                return ms;
            case UnitType.Ticks:
                return ms * ticks.per.millisecond;
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