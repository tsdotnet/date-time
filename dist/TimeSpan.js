"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSpan = void 0;
const tslib_1 = require("tslib");
const type_1 = tslib_1.__importDefault(require("@tsdotnet/compare/dist/type"));
const lazy_1 = tslib_1.__importDefault(require("@tsdotnet/lazy"));
const ClockTime_1 = tslib_1.__importDefault(require("./ClockTime"));
const TimeQuantity_1 = tslib_1.__importDefault(require("./TimeQuantity"));
const TimeUnit_1 = tslib_1.__importDefault(require("./TimeUnit"));
/**
 * TimeSpan expands on TimeQuantity to provide an class that is similar to .NET's TimeSpan including many useful static methods.
 */
class TimeSpan extends TimeQuantity_1.default {
    // In .NET the default type is Ticks, but for JavaScript, we will use Milliseconds.
    constructor(value, units = TimeUnit_1.default.Value.Milliseconds) {
        const ms = TimeUnit_1.default.toMilliseconds(value, units);
        super(ms);
        this.ticks = ms * 10000 /* millisecond */;
        this.milliseconds = ms;
        this.seconds = ms / 1000 /* second */;
        this.minutes = ms / 60000 /* minute */;
        this.hours = ms / 3600000 /* hour */;
        this.days = ms / 86400000 /* day */;
        this._time = lazy_1.default.create(() => new ClockTime_1.default(this.getTotalMilliseconds()));
        Object.freeze(this);
    }
    static get zero() {
        return timeSpanZero || (timeSpanZero = new TimeSpan(0));
    }
    /**
     * Provides an standard interface for acquiring the total time.
     * @returns {TimeSpan}
     */
    get total() {
        return this;
    }
    // Instead of the confusing getTotal versus unit name, expose a 'ClockTime' value which reports the individual components.
    get time() {
        return this._time.value;
    }
    static from(value, units) {
        return new TimeSpan(value, units);
    }
    static fromDays(value) {
        return new TimeSpan(value, TimeUnit_1.default.Value.Days);
    }
    static fromHours(value) {
        return new TimeSpan(value, TimeUnit_1.default.Value.Hours);
    }
    static fromMinutes(value) {
        return new TimeSpan(value, TimeUnit_1.default.Value.Minutes);
    }
    static fromSeconds(value) {
        return new TimeSpan(value, TimeUnit_1.default.Value.Seconds);
    }
    static fromMilliseconds(value) {
        return new TimeSpan(value, TimeUnit_1.default.Value.Milliseconds);
    }
    static fromTicks(value) {
        return new TimeSpan(value, TimeUnit_1.default.Value.Ticks);
    }
    add(other) {
        if (type_1.default.isNumber(other))
            throw new Error('Use .addUnit(value:number,units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n' +
                '.add only supports quantifiable time values (ITimeTotal).');
        return new TimeSpan(this.getTotalMilliseconds() + other.total.milliseconds);
    }
    addUnit(value, units = TimeUnit_1.default.Value.Milliseconds) {
        return new TimeSpan(this.getTotalMilliseconds() + TimeUnit_1.default.toMilliseconds(value, units));
    }
}
exports.TimeSpan = TimeSpan;
let timeSpanZero;
exports.default = TimeSpan;
//# sourceMappingURL=TimeSpan.js.map