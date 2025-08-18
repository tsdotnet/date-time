import Lazy from '@tsdotnet/lazy';
import type from '@tsdotnet/type';
import { ClockTime } from './ClockTime.js';
import TimeQuantity from './TimeQuantity.js';
import TimeUnit from './TimeUnit.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
class TimeSpan extends TimeQuantity {
    ticks;
    milliseconds;
    seconds;
    minutes;
    hours;
    days;
    constructor(value, units = TimeUnit.UnitType.Milliseconds) {
        if (isNaN(value))
            throw Error('Cannot construct a TimeSpan from NaN value.');
        const ms = TimeUnit.toMilliseconds(value, units);
        super(ms);
        this.ticks = ms * 10000;
        this.milliseconds = ms;
        this.seconds = ms / 1000;
        this.minutes = ms / 60000;
        this.hours = ms / 3600000;
        this.days = ms / 86400000;
        this._time = Lazy.create(() => new ClockTime(this.getTotalMilliseconds()));
        Object.freeze(this);
    }
    static get zero() {
        return timeSpanZero || (timeSpanZero = new TimeSpan(0));
    }
    get total() {
        return this;
    }
    _time;
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
    addUnit(value, units = TimeUnit.UnitType.Milliseconds) {
        return value
            ? new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units))
            : this;
    }
}
let timeSpanZero;

export { TimeSpan, TimeSpan as default };
//# sourceMappingURL=TimeSpan.js.map
