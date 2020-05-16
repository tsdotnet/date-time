/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import type from '@tsdotnet/compare/dist/type';
import Lazy from '@tsdotnet/lazy';
import TimeUnit from './TimeUnit';
import ClockTime from './ClockTime';
import TimeQuantity from './TimeQuantity';
/**
 * TimeSpan expands on TimeQuantity to provide an class that is similar to .NET's TimeSpan including many useful static methods.
 */
export class TimeSpan extends TimeQuantity {
    // In .NET the default type is Ticks, but for JavaScript, we will use Milliseconds.
    constructor(value, units = TimeUnit.Value.Milliseconds) {
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
    get time() {
        return this._time.value;
    }
    static from(value, units) {
        return new TimeSpan(value, units);
    }
    static fromDays(value) {
        return new TimeSpan(value, TimeUnit.Value.Days);
    }
    static fromHours(value) {
        return new TimeSpan(value, TimeUnit.Value.Hours);
    }
    static fromMinutes(value) {
        return new TimeSpan(value, TimeUnit.Value.Minutes);
    }
    static fromSeconds(value) {
        return new TimeSpan(value, TimeUnit.Value.Seconds);
    }
    static fromMilliseconds(value) {
        return new TimeSpan(value, TimeUnit.Value.Milliseconds);
    }
    static fromTicks(value) {
        return new TimeSpan(value, TimeUnit.Value.Ticks);
    }
    add(other) {
        if (type.isNumber(other))
            throw new Error('Use .addUnit(value:number,units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n' +
                '.add only supports quantifiable time values (ITimeTotal).');
        return new TimeSpan(this.getTotalMilliseconds() + other.total.milliseconds);
    }
    addUnit(value, units = TimeUnit.Value.Milliseconds) {
        return new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units));
    }
}
let timeSpanZero;
export default TimeSpan;
//# sourceMappingURL=TimeSpan.js.map