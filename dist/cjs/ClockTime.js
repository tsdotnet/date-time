"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockTime = void 0;
const tslib_1 = require("tslib");
const howMany = tslib_1.__importStar(require("./howMany"));
const TimeQuantity_1 = tslib_1.__importDefault(require("./TimeQuantity"));
var msPer = howMany.milliseconds.per;
class ClockTime extends TimeQuantity_1.default {
    constructor(...args) {
        super(args.length > 1
            ? ClockTime.millisecondsFromTime(args[0] || 0, args[1] || 0, args.length > 2 && args[2] || 0, args.length > 3 && args[3] || 0)
            : (args.length > 0 && args[0] || 0));
        const ms = Math.abs(this.getTotalMilliseconds());
        let msi = Math.floor(ms);
        this.tick = (ms - msi) * howMany.ticks.per.millisecond;
        this.day = (msi / msPer.day) | 0;
        msi -= this.day * howMany.milliseconds.per.day;
        this.hour = (msi / msPer.hour) | 0;
        msi -= this.hour * msPer.hour;
        this.minute = (msi / msPer.minute) | 0;
        msi -= this.minute * msPer.minute;
        this.second = (msi / msPer.second) | 0;
        msi -= this.second * msPer.second;
        this.millisecond = msi;
        Object.freeze(this);
    }
    // Static version for relative consistency.  Constructor does allow this format.
    static from(hours, minutes, seconds = 0, milliseconds = 0) {
        return new ClockTime(hours, minutes, seconds, milliseconds);
    }
    static millisecondsFromTime(hours, minutes, seconds = 0, milliseconds = 0) {
        let value = hours;
        value *= howMany.minutes.per.hour;
        value += minutes;
        value *= howMany.seconds.per.minute;
        value += seconds;
        value *= howMany.milliseconds.per.second;
        value += milliseconds;
        return value;
    }
    toString( /*format?:string, formatProvider?:IFormatProvider*/) {
        /* INSERT CUSTOM FORMATTING CODE HERE */
        const _ = this;
        const a = [];
        if (_.day)
            a.push(pluralize(_.day, 'day'));
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
exports.ClockTime = ClockTime;
// Temporary until the full TimeSpanFormat is available.
function pluralize(value, label) {
    if (Math.abs(value) !== 1)
        label += 's';
    return label;
}
exports.default = ClockTime;
//# sourceMappingURL=ClockTime.js.map