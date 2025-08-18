"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSpan = void 0;
const tslib_1 = require("tslib");
const lazy_1 = tslib_1.__importDefault(require("@tsdotnet/lazy"));
const type_1 = tslib_1.__importDefault(require("@tsdotnet/type"));
const ClockTime_1 = tslib_1.__importDefault(require("./ClockTime"));
const TimeQuantity_1 = tslib_1.__importDefault(require("./TimeQuantity"));
const TimeUnit_1 = tslib_1.__importDefault(require("./TimeUnit"));
class TimeSpan extends TimeQuantity_1.default {
    constructor(value, units = TimeUnit_1.default.UnitType.Milliseconds) {
        if (isNaN(value))
            throw Error('Cannot construct a TimeSpan from NaN value.');
        const ms = TimeUnit_1.default.toMilliseconds(value, units);
        super(ms);
        this.ticks = ms * 10000;
        this.milliseconds = ms;
        this.seconds = ms / 1000;
        this.minutes = ms / 60000;
        this.hours = ms / 3600000;
        this.days = ms / 86400000;
        this._time = lazy_1.default.create(() => new ClockTime_1.default(this.getTotalMilliseconds()));
        Object.freeze(this);
    }
    static get zero() {
        return timeSpanZero || (timeSpanZero = new TimeSpan(0));
    }
    get total() {
        return this;
    }
    get time() {
        return this._time.value;
    }
    static from(value, units) {
        if (!value)
            return TimeSpan.zero;
        if (typeof value === 'number') {
            if (units === undefined)
                throw new Error('A numerical value requires a TimeUnit.');
            return new TimeSpan(value, units);
        }
        const ms = TimeQuantity_1.default.getTotalMillisecondsFrom(value);
        return ms ? new TimeSpan(ms) : TimeSpan.zero;
    }
    static fromDays(value) {
        return value ? new TimeSpan(value, TimeUnit_1.default.UnitType.Days) : TimeSpan.zero;
    }
    static fromHours(value) {
        return value ? new TimeSpan(value, TimeUnit_1.default.UnitType.Hours) : TimeSpan.zero;
    }
    static fromMinutes(value) {
        return value ? new TimeSpan(value, TimeUnit_1.default.UnitType.Minutes) : TimeSpan.zero;
    }
    static fromSeconds(value) {
        return value ? new TimeSpan(value, TimeUnit_1.default.UnitType.Seconds) : TimeSpan.zero;
    }
    static fromMilliseconds(value) {
        return value ? new TimeSpan(value) : TimeSpan.zero;
    }
    static fromTicks(value) {
        return value ? new TimeSpan(value, TimeUnit_1.default.UnitType.Ticks) : TimeSpan.zero;
    }
    add(other) {
        if (!other)
            return this;
        if (type_1.default.isNumber(other))
            throw new Error('Use .addUnit(value:number, units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n' +
                '.add only supports quantifiable time values (TimeQuantity).');
        const otherMs = other instanceof TimeQuantity_1.default
            ? other.total.milliseconds
            : TimeQuantity_1.default.getTotalMillisecondsFrom(other);
        return new TimeSpan(this.getTotalMilliseconds() + otherMs);
    }
    addUnit(value, units = TimeUnit_1.default.UnitType.Milliseconds) {
        return value
            ? new TimeSpan(this.getTotalMilliseconds() + TimeUnit_1.default.toMilliseconds(value, units))
            : this;
    }
}
exports.TimeSpan = TimeSpan;
let timeSpanZero;
exports.default = TimeSpan;
//# sourceMappingURL=TimeSpan.js.map