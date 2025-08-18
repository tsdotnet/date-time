import { ArgumentNullException } from '@tsdotnet/exceptions';
import { ClockTime } from './ClockTime.js';
import { TimeSpan } from './TimeSpan.js';
import { TimeStamp } from './TimeStamp.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * Based on .NET DateTime's interface.
 * @license MIT
 */
const VOID0 = void 0;
class DateTime {
    _value;
    _kind;
    _time;
    constructor(value = new Date(), kind = 1) {
        this._kind = kind;
        if (value instanceof DateTime) {
            this._value = value.toJsDate();
            if (kind === VOID0)
                this._kind = value._kind;
        }
        else {
            if (value instanceof Date)
                this._value = new Date(value.getTime());
            else
                this._value = value === VOID0
                    ? new Date()
                    : new Date(value);
        }
    }
    static get now() {
        return new DateTime();
    }
    static get today() {
        return DateTime.now.date;
    }
    static get tomorrow() {
        const today = DateTime.today;
        return today.addDays(1);
    }
    get kind() {
        return this._kind;
    }
    get year() {
        return this._value.getFullYear();
    }
    get month() {
        return this._value.getMonth();
    }
    get calendarMonth() {
        return this._value.getMonth() + 1;
    }
    get calendar() {
        return {
            year: this.year,
            month: this.calendarMonth,
            day: this.day
        };
    }
    get day() {
        return this._value.getDate();
    }
    get dayIndex() {
        return this._value.getDate() - 1;
    }
    get dayOfWeek() {
        return this._value.getDay();
    }
    get date() {
        const _ = this;
        return new DateTime(new Date(_.year, _.month, _.day), _._kind);
    }
    get timeOfDay() {
        const _ = this;
        let t = _._time;
        if (!t) {
            const d = this._value;
            _._time = t = new ClockTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        }
        return t;
    }
    static between(first, last) {
        const f = first instanceof DateTime ? first._value : first, l = last instanceof DateTime ? last._value : last;
        return TimeSpan.fromMilliseconds(l.getTime() - f.getTime());
    }
    static isLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }
    static daysInMonth(year, month) {
        return (new Date(year, month + 1, 0)).getDate();
    }
    static from(yearOrDate, month = 0, day = 1) {
        let year;
        if (typeof yearOrDate == 'object') {
            day = yearOrDate.day;
            month = yearOrDate.month;
            year = yearOrDate.year;
        }
        else {
            year = yearOrDate;
        }
        return new DateTime(new Date(year, month, day));
    }
    static fromCalendarDate(yearOrDate, month = 1, day = 1) {
        let year;
        if (typeof yearOrDate == 'object') {
            day = yearOrDate.day;
            month = yearOrDate.month;
            year = yearOrDate.year;
        }
        else {
            year = yearOrDate;
        }
        return new DateTime(new Date(year, month - 1, day));
    }
    toJsDate() {
        return new Date(this._value.getTime());
    }
    addMilliseconds(ms) {
        ms = ms || 0;
        return new DateTime(this._value.getTime() + ms, this._kind);
    }
    addSeconds(seconds) {
        seconds = seconds || 0;
        return this.addMilliseconds(seconds * 1000);
    }
    addMinutes(minutes) {
        minutes = minutes || 0;
        return this.addMilliseconds(minutes * 60000);
    }
    addHours(hours) {
        hours = hours || 0;
        return this.addMilliseconds(hours * 3600000);
    }
    addDays(days) {
        days = days || 0;
        return this.addMilliseconds(days * 86400000);
    }
    addMonths(months) {
        months = months || 0;
        const d = this.toJsDate();
        d.setMonth(d.getMonth() + months);
        return new DateTime(d, this._kind);
    }
    addYears(years) {
        years = years || 0;
        const d = this.toJsDate();
        d.setFullYear(d.getFullYear() + years);
        return new DateTime(d, this._kind);
    }
    add(time) {
        return this.addMilliseconds(time.getTotalMilliseconds());
    }
    subtract(time) {
        return this.addMilliseconds(-time.getTotalMilliseconds());
    }
    timePassedSince(previous) {
        return DateTime.between(previous, this);
    }
    toTimeStamp() {
        return TimeStamp.from(this);
    }
    toUniversalTime() {
        const _ = this;
        if (_._kind != 1)
            return new DateTime(_, _._kind);
        const d = _._value;
        return new DateTime(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()), 2);
    }
    equals(other, strict = false) {
        if (!other)
            return false;
        if (other == this)
            return true;
        if (other instanceof Date) {
            const v = this._value;
            return other == v || other.getTime() == v.getTime();
        }
        if (other instanceof DateTime) {
            if (strict) {
                const ok = other._kind;
                if (!ok && this._kind || ok != this._kind)
                    return false;
            }
            return this.equals(other._value);
        }
        else if (strict)
            return false;
        return this.equals(other.toJsDate());
    }
    compareTo(other) {
        if (!other)
            throw new ArgumentNullException('other');
        if (other == this)
            return 0;
        if (other instanceof DateTime) {
            other = other._value;
        }
        const ms = this._value.getTime();
        if (other instanceof Date) {
            return ms - other.getTime();
        }
        return ms - other.toJsDate().getTime();
    }
    equivalent(other) {
        if (!other)
            return false;
        if (other == this)
            return true;
        if (other instanceof Date) {
            const v = this._value;
            return v.toUTCString() == other.toUTCString();
        }
        if (this.equals(other, true))
            return true;
        return this.equivalent(other.toJsDate());
    }
}

export { DateTime as default };
//# sourceMappingURL=DateTime.js.map
