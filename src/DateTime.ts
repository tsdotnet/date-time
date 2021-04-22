/*!
 * @author electricessence / https://github.com/electricessence/
 * Based on .NET DateTime's interface.
 * @license MIT
 */

import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import CalendarDate from './CalendarDate';
import Gregorian from './Calendars/Gregorian';
import ClockTime from './ClockTime';
import DateTimeKind from './DateTimeKind';
import {milliseconds} from './howMany';
import JsDateConvertible from './JsDateConvertable';
import TimeQuantity from './TimeQuantity';
import TimeSpan from './TimeSpan';
import TimeStamp from './TimeStamp';

const VOID0: undefined = void 0;

export default class DateTime
	implements CalendarDate, JsDateConvertible
{
	private readonly _value: Date;
	private readonly _kind: DateTimeKind;
	private _time: ClockTime | undefined;

	constructor ();

	constructor (dateString: string, kind?: DateTimeKind);

	constructor (milliseconds: number, kind?: DateTimeKind);

	constructor (source: Date, kind?: DateTimeKind);

	constructor (source: DateTime, kind?: DateTimeKind);

	constructor (value: any = new Date(), kind: DateTimeKind = DateTimeKind.Local)
	{
		this._kind = kind;
		if(value instanceof DateTime)
		{
			this._value = value.toJsDate();
			if(kind===VOID0) this._kind = value._kind;
		}
		else
		{ // noinspection SuspiciousInstanceOfGuard
			if(value instanceof Date)
				this._value = new Date(value.getTime());
			else
				this._value = value===VOID0
					? new Date()
					: new Date(value);
		}
	}

	/**
	 * Returns the now local time.
	 * @returns {DateTime}
	 */
	static get now (): DateTime
	{
		return new DateTime();
	}

	/**
	 * The date component for now.
	 * @returns {DateTime}
	 */
	static get today (): DateTime
	{
		return DateTime.now.date;
	}

	/**
	 * Midnight tomorrow.
	 * @returns {DateTime}
	 */
	static get tomorrow (): DateTime
	{
		const today: DateTime = DateTime.today;
		return today.addDays(1);
	}

	get kind (): DateTimeKind
	{
		return this._kind;
	}

	get year (): number
	{
		return this._value.getFullYear();
	}

	/**
	 * Returns the Gregorian Month (zero indexed).
	 * @returns {number}
	 */
	get month (): Gregorian.Month
	{
		return this._value.getMonth();
	}

	/**
	 * Returns the month number (1-12).
	 * @returns {number}
	 */
	get calendarMonth (): number
	{
		return this._value.getMonth() + 1;
	}

	get calendar (): CalendarDate
	{
		return {
			year: this.year,
			month: this.calendarMonth,
			day: this.day
		};
	}

	/**
	 * Returns the day of the month.  An integer between 1 and 31.
	 * @returns {number}
	 */
	get day (): number
	{
		return this._value.getDate();
	}

	/**
	 * Returns the day of the month indexed starting at zero.
	 * @returns {number}
	 */
	get dayIndex (): number
	{
		return this._value.getDate() - 1;
	}

	/**
	 * Returns the zero indexed day of the week. (Sunday == 0)
	 * @returns {number}
	 */
	get dayOfWeek (): Gregorian.DayOfWeek
	{
		return this._value.getDay();
	}

	/**
	 * Returns a DateTime object for 00:00 of this date.
	 */
	get date (): DateTime
	{
		const _ = this;
		return new DateTime(
			new Date(
				_.year,
				_.month,
				_.day
			)
			, _._kind
		);
	}

	/**
	 * Returns the time of day represented by a ClockTime object.
	 * @returns {ClockTime}
	 */
	get timeOfDay (): ClockTime
	{
		const _ = this;
		let t = _._time;
		if(!t)
		{
			const d = this._value;
			_._time = t = new ClockTime(
				d.getHours(),
				d.getMinutes(),
				d.getSeconds(),
				d.getMilliseconds());
		}
		return t;
	}

	/**
	 * Measures the difference between two dates as a TimeSpan.
	 * @param first
	 * @param last
	 */
	static between (first: Date | DateTime, last: Date | DateTime): TimeSpan
	{
		const
			f: Date = first instanceof DateTime ? first._value : first,
			l: Date = last instanceof DateTime ? last._value : last;

		return TimeSpan.fromMilliseconds(l.getTime() - f.getTime());
	}

	/**
	 * Calculates if the given year is a leap year using the formula:
	 * ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
	 * @param year
	 * @returns {boolean}
	 */
	static isLeapYear (year: number): boolean
	{
		return ((year%4==0) && (year%100!=0)) || (year%400==0);
	}

	/**
	 * Returns the number of days for the specific year and month.
	 * @param year
	 * @param month
	 * @returns {any}
	 */
	static daysInMonth (year: number, month: Gregorian.Month): number
	{
		// Basically, add 1 month, subtract a day... What's the date?
		return (new Date(year, month + 1, 0)).getDate();
	}

	static from (calendarDate: CalendarDate): DateTime;

	static from (year: number, month: Gregorian.Month, day: number): DateTime;

	static from (
		yearOrDate: number | CalendarDate,
		month: number = 0,
		day: number   = 1): DateTime
	{
		let year: number;
		if(typeof yearOrDate=='object')
		{
			day = yearOrDate.day;
			month = yearOrDate.month;
			year = yearOrDate.year;
		}
		else
		{
			year = yearOrDate;
		}

		return new DateTime(new Date(year, month, day));

	}

	static fromCalendarDate (calendarDate: CalendarDate): DateTime;

	static fromCalendarDate (year: number, month: number, day: number): DateTime;

	static fromCalendarDate (
		yearOrDate: number | CalendarDate,
		month: number = 1,
		day: number   = 1): DateTime
	{
		let year: number;
		if(typeof yearOrDate=='object')
		{
			day = yearOrDate.day;
			month = yearOrDate.month;
			year = yearOrDate.year;
		}
		else
		{
			year = yearOrDate;
		}

		return new DateTime(new Date(year, month - 1, day));

	}

	toJsDate (): Date
	{
		return new Date(this._value.getTime()); // return a clone.
	}

	addMilliseconds (ms: number): DateTime
	{
		ms = ms || 0;
		return new DateTime(this._value.getTime() + ms, this._kind);
	}

	addSeconds (seconds: number): DateTime
	{
		seconds = seconds || 0;
		return this.addMilliseconds(seconds*milliseconds.per.second);
	}

	addMinutes (minutes: number): DateTime
	{
		minutes = minutes || 0;
		return this.addMilliseconds(minutes*milliseconds.per.minute);
	}

	addHours (hours: number): DateTime
	{
		hours = hours || 0;
		return this.addMilliseconds(hours*milliseconds.per.hour);
	}

	addDays (days: number): DateTime
	{
		days = days || 0;
		return this.addMilliseconds(days*milliseconds.per.day);
	}

	addMonths (months: number): DateTime
	{
		months = months || 0;
		const d = this.toJsDate();
		d.setMonth(d.getMonth() + months);
		return new DateTime(d, this._kind);
	}

	addYears (years: number): DateTime
	{
		years = years || 0;
		const d = this.toJsDate();
		d.setFullYear(d.getFullYear() + years);
		return new DateTime(d, this._kind);
	}

	/**
	 * Receives an TimeQuantity value and adds based on the total milliseconds.
	 * @param {TimeQuantity} time
	 * @returns {DateTime}
	 */
	add (time: TimeQuantity): DateTime
	{
		return this.addMilliseconds(time.getTotalMilliseconds());
	}

	/**
	 * Receives an TimeQuantity value and subtracts based on the total milliseconds.
	 * @param {TimeQuantity} time
	 * @returns {DateTime}
	 */
	subtract (time: TimeQuantity): DateTime
	{
		return this.addMilliseconds(-time.getTotalMilliseconds());
	}

	/**
	 * Returns a TimeSpan representing the amount of time between two dates.
	 * @param previous
	 * @returns {TimeSpan}
	 */
	timePassedSince (previous: Date | DateTime): TimeSpan
	{
		return DateTime.between(previous, this);
	}

	/**
	 * Returns a readonly object which contains all the date and time components.
	 */
	toTimeStamp (): TimeStamp
	{
		return TimeStamp.from(this);
	}

	/**
	 * Returns a UTC version of this date if its kind is local.
	 * @returns {DateTime}
	 */
	toUniversalTime (): DateTime
	{
		const _ = this;
		if(_._kind!=DateTimeKind.Local)
			return new DateTime(_, _._kind);

		const d = _._value;
		return new DateTime(
			new Date(
				d.getUTCFullYear(),
				d.getUTCMonth(),
				d.getUTCDate(),
				d.getUTCHours(),
				d.getUTCMinutes(),
				d.getUTCSeconds(),
				d.getUTCMilliseconds()
			),
			DateTimeKind.Utc
		);
	}

	/**
	 * Compares a JS Date with the current instance.  Does not evaluate the kind.
	 * @param other
	 * @returns {boolean}
	 */
	equals (other: Date): boolean

	/**
	 * Compares another JsDateConvertible object and returns true if they or their value are equal.
	 * @param other The other JsDateConvertible object.
	 * @param strict When strict is true, the 'kind' also must match.
	 * @returns {boolean}
	 */
	equals (other: JsDateConvertible, strict?: boolean): boolean

	equals (other: Date | JsDateConvertible, strict: boolean = false): boolean
	{
		if(!other) return false;
		if(other==this) return true;

		if(other instanceof Date)
		{
			const v = this._value;
			return other==v || other.getTime()==v.getTime();
		}

		if(other instanceof DateTime)
		{
			if(strict)
			{
				const ok = other._kind;
				if(!ok && this._kind || ok!=this._kind) return false;
			}

			return this.equals(other._value);
		}
		else if(strict)
			return false;

		return this.equals(other.toJsDate());

	}

	// https://msdn.microsoft.com/en-us/library/System.IComparable.CompareTo(v=vs.110).aspx
	compareTo (other: Date | JsDateConvertible): number
	{
		if(!other) throw new ArgumentNullException('other');
		if(other==this) return 0;

		if(other instanceof DateTime)
		{
			other = other._value;
		}

		const ms = this._value.getTime();

		if(other instanceof Date)
		{
			return ms - other.getTime();
		}

		return ms - other.toJsDate().getTime();
	}

	/**
	 * Returns true if the value is the same UTC time.
	 * @param {Date | JsDateConvertible} other
	 * @return {boolean}
	 */
	equivalent (other: Date | JsDateConvertible): boolean
	{
		if(!other) return false;
		if(other==this) return true;

		if(other instanceof Date)
		{
			const v = this._value;
			// TODO: What is the best way to handle this when kinds match or don't?
			return v.toUTCString()==other.toUTCString();
		}

		if(this.equals(other, true)) return true;

		return this.equivalent(other.toJsDate());
	}

}
