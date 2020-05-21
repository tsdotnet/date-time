/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */
import Lazy from '@tsdotnet/lazy';
import type from '@tsdotnet/type';
import ClockTime from './ClockTime';
import TimeQuantity from './TimeQuantity';
import TimeUnit from './TimeUnit';
/**
 * TimeSpan expands on TimeQuantity to provide an class that is similar to .NET's TimeSpan including many useful static methods.
 */
export class TimeSpan extends TimeQuantity {
    // In .NET the default type is Ticks, but for JavaScript, we will use Milliseconds.
    constructor(value, units = TimeUnit.UnitType.Milliseconds) {
        if (isNaN(value))
            throw Error('Cannot construct a TimeSpan from NaN value.');
        const ms = TimeUnit.toMilliseconds(value, units);
        super(ms);
        this.ticks = ms * 10000 /* millisecond */;
        this.milliseconds = ms;
        this.seconds = ms / 1000 /* second */;
        this.minutes = ms / 60000 /* minute */;
        this.hours = ms / 3600000 /* hour */;
        this.days = ms / 86400000 /* day */;
        this._time = Lazy.create(() => new ClockTime(this.getTotalMilliseconds()));
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
    /**
     * The value of this TimeSpan reduced to the clock and calendar.
     * @return {ClockTime}
     */
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
        const ms = TimeQuantity.getTotalMillisecondsFrom(value);
        return ms ? new TimeSpan(ms) : TimeSpan.zero;
    }
    static fromDays(value) {
        return value ? new TimeSpan(value, TimeUnit.UnitType.Days) : TimeSpan.zero;
    }
    static fromHours(value) {
        return value ? new TimeSpan(value, TimeUnit.UnitType.Hours) : TimeSpan.zero;
    }
    static fromMinutes(value) {
        return value ? new TimeSpan(value, TimeUnit.UnitType.Minutes) : TimeSpan.zero;
    }
    static fromSeconds(value) {
        return value ? new TimeSpan(value, TimeUnit.UnitType.Seconds) : TimeSpan.zero;
    }
    static fromMilliseconds(value) {
        return value ? new TimeSpan(value) : TimeSpan.zero;
    }
    static fromTicks(value) {
        return value ? new TimeSpan(value, TimeUnit.UnitType.Ticks) : TimeSpan.zero;
    }
    /**
     * Sum the value of this TimeSpan with another time quantity.
     * @param {TimeQuantity | Partial<TimeMeasurement>} other
     * @return {TimeSpan}
     */
    add(other) {
        if (!other)
            return this;
        if (type.isNumber(other))
            throw new Error('Use .addUnit(value:number, units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n' +
                '.add only supports quantifiable time values (TimeQuantity).');
        const otherMs = other instanceof TimeQuantity
            ? other.total.milliseconds
            : TimeQuantity.getTotalMillisecondsFrom(other);
        return new TimeSpan(this.getTotalMilliseconds() + otherMs);
    }
    /**
     * Sum the value of this TimeSpan with another unit value.
     * @param {number} value
     * @param {TimeUnit.UnitType} units
     * @return {TimeSpan}
     */
    addUnit(value, units = TimeUnit.UnitType.Milliseconds) {
        return value
            ? new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units))
            : this;
    }
}
let timeSpanZero;
export default TimeSpan;
//# sourceMappingURL=TimeSpan.js.map