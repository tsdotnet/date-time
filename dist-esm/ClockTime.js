/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import TimeQuantity from './TimeQuantity';
export class ClockTime extends TimeQuantity {
    constructor(...args) {
        super(args.length > 1
            ? ClockTime.millisecondsFromTime(args[0] || 0, args[1] || 0, args.length > 2 && args[2] || 0, args.length > 3 && args[3] || 0)
            : (args.length > 0 && args[0] || 0));
        const ms = Math.abs(this.getTotalMilliseconds());
        let msi = Math.floor(ms);
        this.tick = (ms - msi) * 10000 /* millisecond */;
        this.days = (msi / 86400000 /* day */) | 0;
        msi -= this.days * 86400000 /* day */;
        this.hour = (msi / 3600000 /* hour */) | 0;
        msi -= this.hour * 3600000 /* hour */;
        this.minute = (msi / 60000 /* minute */) | 0;
        msi -= this.minute * 60000 /* minute */;
        this.second = (msi / 1000 /* second */) | 0;
        msi -= this.second * 1000 /* second */;
        this.millisecond = msi;
        Object.freeze(this);
    }
    // Static version for relative consistency.  Constructor does allow this format.
    static from(hours, minutes, seconds = 0, milliseconds = 0) {
        return new ClockTime(hours, minutes, seconds, milliseconds);
    }
    static millisecondsFromTime(hours, minutes, seconds = 0, milliseconds = 0) {
        let value = hours;
        value *= 60 /* hour */;
        value += minutes;
        value *= 60 /* minute */;
        value += seconds;
        value *= 1000 /* second */;
        value += milliseconds;
        return value;
    }
    toString( /*format?:string, formatProvider?:IFormatProvider*/) {
        /* INSERT CUSTOM FORMATTING CODE HERE */
        const _ = this;
        const a = [];
        if (_.days)
            a.push(pluralize(_.days, 'day'));
        if (_.hour)
            a.push(pluralize(_.hour, 'hour'));
        if (_.minute)
            a.push(pluralize(_.minute, 'minute'));
        if (_.second)
            a.push(pluralize(_.second, 'second'));
        if (a.length > 1)
            a.splice(a.length - 1, 0, 'and');
        return a.join(', ').replace(', and, ', ' and ');
    }
}
// Temporary until the full TimeSpanFormat is available.
function pluralize(value, label) {
    if (Math.abs(value) !== 1)
        label += 's';
    return label;
}
export default ClockTime;
//# sourceMappingURL=ClockTime.js.map