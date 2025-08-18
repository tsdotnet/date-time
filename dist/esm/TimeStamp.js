import type from '@tsdotnet/type';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class TimeStamp {
    year;
    month;
    day;
    hour;
    minute;
    second;
    millisecond;
    tick;
    constructor(year, month, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0, tick = 0) {
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
        if (!(d instanceof Date) && type.hasMember(d, 'toJsDate'))
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
        return new Date(_.year, _.month, _.day, _.hour, _.minute, _.second, _.millisecond + _.tick / 10000);
    }
}

export { TimeStamp, TimeStamp as default };
//# sourceMappingURL=TimeStamp.js.map
