/*!
 * @author electricessence / https://github.com/electricessence/
 * Based on .NET DateTime's interface.
 * @license MIT
 */
import CalendarDate from './CalendarDate';
import Gregorian from './Calendars/Gregorian';
import ClockTime from './ClockTime';
import DateTimeKind from './DateTimeKind';
import JsDateConvertible from './JsDateConvertable';
import TimeQuantity from './TimeQuantity';
import TimeSpan from './TimeSpan';
import TimeStamp from './TimeStamp';
export default class DateTime implements CalendarDate, JsDateConvertible {
    private readonly _value;
    private readonly _kind;
    private _time;
    constructor();
    constructor(dateString: string, kind?: DateTimeKind);
    constructor(milliseconds: number, kind?: DateTimeKind);
    constructor(source: Date, kind?: DateTimeKind);
    constructor(source: DateTime, kind?: DateTimeKind);
    /**
     * Returns the now local time.
     * @returns {DateTime}
     */
    static get now(): DateTime;
    /**
     * The date component for now.
     * @returns {DateTime}
     */
    static get today(): DateTime;
    /**
     * Midnight tomorrow.
     * @returns {DateTime}
     */
    static get tomorrow(): DateTime;
    get kind(): DateTimeKind;
    get year(): number;
    /**
     * Returns the Gregorian Month (zero indexed).
     * @returns {number}
     */
    get month(): Gregorian.Month;
    /**
     * Returns the month number (1-12).
     * @returns {number}
     */
    get calendarMonth(): number;
    get calendar(): CalendarDate;
    /**
     * Returns the day of the month.  An integer between 1 and 31.
     * @returns {number}
     */
    get day(): number;
    /**
     * Returns the day of the month indexed starting at zero.
     * @returns {number}
     */
    get dayIndex(): number;
    /**
     * Returns the zero indexed day of the week. (Sunday == 0)
     * @returns {number}
     */
    get dayOfWeek(): Gregorian.DayOfWeek;
    /**
     * Returns a DateTime object for 00:00 of this date.
     */
    get date(): DateTime;
    /**
     * Returns the time of day represented by a ClockTime object.
     * @returns {ClockTime}
     */
    get timeOfDay(): ClockTime;
    /**
     * Measures the difference between two dates as a TimeSpan.
     * @param first
     * @param last
     */
    static between(first: Date | DateTime, last: Date | DateTime): TimeSpan;
    /**
     * Calculates if the given year is a leap year using the formula:
     * ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
     * @param year
     * @returns {boolean}
     */
    static isLeapYear(year: number): boolean;
    /**
     * Returns the number of days for the specific year and month.
     * @param year
     * @param month
     * @returns {any}
     */
    static daysInMonth(year: number, month: Gregorian.Month): number;
    static from(calendarDate: CalendarDate): DateTime;
    static from(year: number, month: Gregorian.Month, day: number): DateTime;
    static fromCalendarDate(calendarDate: CalendarDate): DateTime;
    static fromCalendarDate(year: number, month: number, day: number): DateTime;
    toJsDate(): Date;
    addMilliseconds(ms: number): DateTime;
    addSeconds(seconds: number): DateTime;
    addMinutes(minutes: number): DateTime;
    addHours(hours: number): DateTime;
    addDays(days: number): DateTime;
    addMonths(months: number): DateTime;
    addYears(years: number): DateTime;
    /**
     * Receives an TimeQuantity value and adds based on the total milliseconds.
     * @param {TimeQuantity} time
     * @returns {DateTime}
     */
    add(time: TimeQuantity): DateTime;
    /**
     * Receives an TimeQuantity value and subtracts based on the total milliseconds.
     * @param {TimeQuantity} time
     * @returns {DateTime}
     */
    subtract(time: TimeQuantity): DateTime;
    /**
     * Returns a TimeSpan representing the amount of time between two dates.
     * @param previous
     * @returns {TimeSpan}
     */
    timePassedSince(previous: Date | DateTime): TimeSpan;
    /**
     * Returns a readonly object which contains all the date and time components.
     */
    toTimeStamp(): TimeStamp;
    /**
     * Returns a UTC version of this date if its kind is local.
     * @returns {DateTime}
     */
    toUniversalTime(): DateTime;
    /**
     * Compares a JS Date with the current instance.  Does not evaluate the kind.
     * @param other
     * @returns {boolean}
     */
    equals(other: Date): boolean;
    /**
     * Compares another JsDateConvertible object and returns true if they or their value are equal.
     * @param other The other JsDateConvertible object.
     * @param strict When strict is true, the 'kind' also must match.
     * @returns {boolean}
     */
    equals(other: JsDateConvertible, strict?: boolean): boolean;
    compareTo(other: Date | JsDateConvertible): number;
    /**
     * Returns true if the value is the same UTC time.
     * @param {Date | JsDateConvertible} other
     * @return {boolean}
     */
    equivalent(other: Date | JsDateConvertible): boolean;
}
