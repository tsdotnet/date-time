"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeStamp = void 0;
const tslib_1 = require("tslib");
const type_1 = tslib_1.__importDefault(require("@tsdotnet/type"));
const howMany_1 = require("./howMany");
/**
 * An alternative to Date or DateTime.  Is a model representing the exact date and time.
 */
class TimeStamp {
    constructor(year, month, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0, tick = 0) {
        // Add validation or properly carry out of range values?
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
        this.tick = tick;
        Object.freeze(this);
    }
    static from(d) {
        if (!(d instanceof Date) && type_1.default.hasMember(d, 'toJsDate'))
            d = d.toJsDate();
        if (d instanceof Date) {
            return new TimeStamp(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        }
        else {
            throw Error('Invalid date type.');
        }
    }
    static now() {
        return TimeStamp.from(new Date());
    }
    toJsDate() {
        const _ = this;
        return new Date(_.year, _.month, _.day, _.hour, _.minute, _.second, _.millisecond + _.tick / howMany_1.ticks.per.millisecond);
    }
}
exports.TimeStamp = TimeStamp;
exports.default = TimeStamp;
//# sourceMappingURL=TimeStamp.js.map