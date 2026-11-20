(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/compare'), require('@tsdotnet/exceptions'), require('@tsdotnet/lazy'), require('@tsdotnet/type')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/compare', '@tsdotnet/exceptions', '@tsdotnet/lazy', '@tsdotnet/type'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.dateTime = global.tsdotnet.dateTime || {}), global.tsdotnet.compare, global.tsdotnet.exceptions, global.tsdotnet.lazy, global.tsdotnet.type));
})(this, (function (exports, compare, exceptions, Lazy, type) { 'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var Lazy__default = /*#__PURE__*/_interopDefault(Lazy);
    var type__default = /*#__PURE__*/_interopDefault(type);

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    var Month;
    (function (Month) {
        Month[Month["January"] = 1] = "January";
        Month[Month["February"] = 2] = "February";
        Month[Month["March"] = 3] = "March";
        Month[Month["April"] = 4] = "April";
        Month[Month["May"] = 5] = "May";
        Month[Month["June"] = 6] = "June";
        Month[Month["July"] = 7] = "July";
        Month[Month["August"] = 8] = "August";
        Month[Month["September"] = 9] = "September";
        Month[Month["October"] = 10] = "October";
        Month[Month["November"] = 11] = "November";
        Month[Month["December"] = 12] = "December";
    })(Month || (Month = {}));
    var DayOfWeek;
    (function (DayOfWeek) {
        DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
        DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
        DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
        DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
        DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
        DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
        DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
    })(DayOfWeek || (DayOfWeek = {}));

    var Gregorian = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DayOfWeek () { return DayOfWeek; },
        get Month () { return Month; }
    });

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Originally based upon .NET source but with many additions and improvements.
     * @license MIT
     */
    var TimeUnit;
    (function (TimeUnit) {
        let UnitType;
        (function (UnitType) {
            UnitType[UnitType["Ticks"] = 0] = "Ticks";
            UnitType[UnitType["Milliseconds"] = 1] = "Milliseconds";
            UnitType[UnitType["Seconds"] = 2] = "Seconds";
            UnitType[UnitType["Minutes"] = 3] = "Minutes";
            UnitType[UnitType["Hours"] = 4] = "Hours";
            UnitType[UnitType["Days"] = 5] = "Days";
        })(UnitType = TimeUnit.UnitType || (TimeUnit.UnitType = {}));
        function toMilliseconds(value, units) {
            switch (units) {
                case UnitType.Days:
                    value *= 24;
                case UnitType.Hours:
                    value *= 60;
                case UnitType.Minutes:
                    value *= 60;
                case UnitType.Seconds:
                    value *= 1000;
                case UnitType.Milliseconds:
                    return value;
                case UnitType.Ticks:
                    return value / 10000;
                default:
                    throw new Error('Invalid TimeUnit.');
            }
        }
        TimeUnit.toMilliseconds = toMilliseconds;
        function fromMilliseconds(ms, units) {
            switch (units) {
                case UnitType.Days:
                    return ms / 86400000;
                case UnitType.Hours:
                    return ms / 3600000;
                case UnitType.Minutes:
                    return ms / 60000;
                case UnitType.Seconds:
                    return ms / 1000;
                case UnitType.Milliseconds:
                    return ms;
                case UnitType.Ticks:
                    return ms * 10000;
                default:
                    throw new Error('Invalid TimeUnit.');
            }
        }
        TimeUnit.fromMilliseconds = fromMilliseconds;
        function from(quantity, toUnits) {
            return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), toUnits);
        }
        TimeUnit.from = from;
        function assertValid(unit) {
            if (isNaN(unit) || unit > UnitType.Days || unit < UnitType.Ticks || Math.floor(unit) !== unit)
                throw new Error('Invalid TimeUnit.');
            return true;
        }
        TimeUnit.assertValid = assertValid;
    })(TimeUnit || (TimeUnit = {}));
    Object.freeze(TimeUnit.UnitType);
    Object.freeze(TimeUnit);
    var TimeUnit$1 = TimeUnit;

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class TimeQuantity {
        _quantity;
        constructor(_quantity = 0) {
            this._quantity = _quantity;
            this._total = Lazy.ResettableLazy.create(() => {
                const ms = this.getTotalMilliseconds();
                return Object.freeze({
                    ticks: ms * 10000,
                    milliseconds: ms,
                    seconds: ms / 1000,
                    minutes: ms / 60000,
                    hours: ms / 3600000,
                    days: ms / 86400000
                });
            });
        }
        static getTotalMillisecondsFrom(values) {
            if (!values)
                return 0;
            return (values.days || 0) * 86400000 +
                (values.hours || 0) * 3600000 +
                (values.minutes || 0) * 60000 +
                (values.seconds || 0) * 1000 +
                (values.milliseconds || 0) +
                (values.ticks || 0) / 10000;
        }
        get direction() {
            return compare.compare(this.getTotalMilliseconds(), 0);
        }
        _total;
        get total() {
            return this._total.value;
        }
        getTotalMilliseconds() {
            return this._quantity;
        }
        equals(other) {
            if (!other || !other.total)
                return false;
            return compare.areEqual(this.getTotalMilliseconds(), other.total.milliseconds);
        }
        compareTo(other) {
            if (!other)
                throw new exceptions.ArgumentNullException('other');
            if (!other.total)
                throw new exceptions.ArgumentNullException('other.total');
            return compare.compare(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
        }
        getTotal(units) {
            return TimeUnit$1.fromMilliseconds(this.getTotalMilliseconds(), units);
        }
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class ClockTime extends TimeQuantity {
        day;
        hour;
        minute;
        second;
        millisecond;
        tick;
        constructor(...args) {
            super(args.length > 1
                ? ClockTime.millisecondsFromTime(args[0] || 0, args[1] || 0, args.length > 2 && args[2] || 0, args.length > 3 && args[3] || 0)
                : (args.length > 0 && args[0] || 0));
            const ms = Math.abs(this.getTotalMilliseconds());
            let msi = Math.floor(ms);
            this.tick = (ms - msi) * 10000;
            this.day = (msi / 86400000) | 0;
            msi -= this.day * 86400000;
            this.hour = (msi / 3600000) | 0;
            msi -= this.hour * 3600000;
            this.minute = (msi / 60000) | 0;
            msi -= this.minute * 60000;
            this.second = (msi / 1000) | 0;
            msi -= this.second * 1000;
            this.millisecond = msi;
            Object.freeze(this);
        }
        static from(hours, minutes, seconds = 0, milliseconds = 0) {
            return new ClockTime(hours, minutes, seconds, milliseconds);
        }
        static millisecondsFromTime(hours, minutes, seconds = 0, milliseconds = 0) {
            let value = hours;
            value *= 60;
            value += minutes;
            value *= 60;
            value += seconds;
            value *= 1000;
            value += milliseconds;
            return value;
        }
        toString() {
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
    function pluralize(value, label) {
        if (Math.abs(value) !== 1)
            label += 's';
        return label;
    }

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
        constructor(value, units = TimeUnit$1.UnitType.Milliseconds) {
            if (isNaN(value))
                throw Error('Cannot construct a TimeSpan from NaN value.');
            const ms = TimeUnit$1.toMilliseconds(value, units);
            super(ms);
            this.ticks = ms * 10000;
            this.milliseconds = ms;
            this.seconds = ms / 1000;
            this.minutes = ms / 60000;
            this.hours = ms / 3600000;
            this.days = ms / 86400000;
            this._time = Lazy__default.default.create(() => new ClockTime(this.getTotalMilliseconds()));
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
            return value ? new TimeSpan(value, TimeUnit$1.UnitType.Days) : TimeSpan.zero;
        }
        static fromHours(value) {
            return value ? new TimeSpan(value, TimeUnit$1.UnitType.Hours) : TimeSpan.zero;
        }
        static fromMinutes(value) {
            return value ? new TimeSpan(value, TimeUnit$1.UnitType.Minutes) : TimeSpan.zero;
        }
        static fromSeconds(value) {
            return value ? new TimeSpan(value, TimeUnit$1.UnitType.Seconds) : TimeSpan.zero;
        }
        static fromMilliseconds(value) {
            return value ? new TimeSpan(value) : TimeSpan.zero;
        }
        static fromTicks(value) {
            return value ? new TimeSpan(value, TimeUnit$1.UnitType.Ticks) : TimeSpan.zero;
        }
        add(other) {
            if (!other)
                return this;
            if (type__default.default.isNumber(other))
                throw new Error('Use .addUnit(value:number, units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n' +
                    '.add only supports quantifiable time values (TimeQuantity).');
            const otherMs = other instanceof TimeQuantity
                ? other.total.milliseconds
                : TimeQuantity.getTotalMillisecondsFrom(other);
            return new TimeSpan(this.getTotalMilliseconds() + otherMs);
        }
        addUnit(value, units = TimeUnit$1.UnitType.Milliseconds) {
            return value
                ? new TimeSpan(this.getTotalMilliseconds() + TimeUnit$1.toMilliseconds(value, units))
                : this;
        }
    }
    let timeSpanZero;

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
            if (!(d instanceof Date) && type__default.default.hasMember(d, 'toJsDate'))
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
                throw new exceptions.ArgumentNullException('other');
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

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    var DateTimeKindValue;
    (function (DateTimeKindValue) {
        DateTimeKindValue[DateTimeKindValue["Unspecified"] = 0] = "Unspecified";
        DateTimeKindValue[DateTimeKindValue["Local"] = 1] = "Local";
        DateTimeKindValue[DateTimeKindValue["Utc"] = 2] = "Utc";
    })(DateTimeKindValue || (DateTimeKindValue = {}));
    var DateTimeKind;
    (function (DateTimeKind) {
        DateTimeKind[DateTimeKind["Unspecified"] = 0] = "Unspecified";
        DateTimeKind[DateTimeKind["Local"] = 1] = "Local";
        DateTimeKind[DateTimeKind["Utc"] = 2] = "Utc";
    })(DateTimeKind || (DateTimeKind = {}));
    var DateTimeKind_default = DateTimeKind;

    var hours;
    (function (hours) {
        hours.per = Object.freeze({
            day: 24
        });
    })(hours || (hours = {}));
    Object.freeze(hours.per);
    var minutes;
    (function (minutes) {
        minutes.per = Object.freeze({
            hour: 60,
            day: 1440
        });
    })(minutes || (minutes = {}));
    Object.freeze(minutes.per);
    var seconds;
    (function (seconds) {
        seconds.per = Object.freeze({
            minute: 60,
            hour: 3600,
            day: 86400
        });
    })(seconds || (seconds = {}));
    Object.freeze(seconds.per);
    var milliseconds;
    (function (milliseconds) {
        milliseconds.per = Object.freeze({
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 86400000
        });
    })(milliseconds || (milliseconds = {}));
    Object.freeze(milliseconds.per);
    var ticks;
    (function (ticks) {
        ticks.per = Object.freeze({
            millisecond: 10000,
            second: 10000000,
            minute: 600000000,
            hour: 36000000000,
            day: 864000000000
        });
    })(ticks || (ticks = {}));
    Object.freeze(ticks.per);

    var howMany = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get hours () { return hours; },
        get milliseconds () { return milliseconds; },
        get minutes () { return minutes; },
        get seconds () { return seconds; },
        get ticks () { return ticks; }
    });

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class TimeUnitValue extends TimeQuantity {
        _units;
        constructor(value, _units) {
            super(typeof value == 'number'
                ? value
                : getUnitQuantityFrom(value, _units));
            this._units = _units;
            TimeUnit$1.assertValid(_units);
        }
        get value() {
            return this._quantity;
        }
        set value(v) {
            this._quantity = v;
            if (!this._total.tryReset())
                throw new Error('Unable to update underlying value.');
        }
        get units() {
            return this._units;
        }
        static from(value, units = TimeUnit$1.UnitType.Milliseconds) {
            return new TimeUnitValue(value, units);
        }
        getTotalMilliseconds() {
            return TimeUnit$1.toMilliseconds(this._quantity, this._units);
        }
        to(units = this.units) {
            return TimeUnitValue.from(this, units);
        }
    }
    function getUnitQuantityFrom(q, units) {
        return TimeUnit$1.fromMilliseconds(q.getTotalMilliseconds(), units);
    }

    exports.ClockTime = ClockTime;
    exports.DateTime = DateTime;
    exports.DateTimeKind = DateTimeKind_default;
    exports.Gregorian = Gregorian;
    exports.TimeQuantity = TimeQuantity;
    exports.TimeSpan = TimeSpan;
    exports.TimeStamp = TimeStamp;
    exports.TimeUnit = TimeUnit$1;
    exports.TimeUnitValue = TimeUnitValue;
    exports.howMany = howMany;

}));
//# sourceMappingURL=date-time.js.map
