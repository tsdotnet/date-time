/*!
 * @author electricessence / https://github.com/electricessence/
 * Based on .NET DateTime's interface.
 * @license MIT
 */
import CalendarDate from './CalendarDate';
import Gregorian from './Calendars/Gregorian';
import ClockTime from './ClockTime';
import DateTimeKind from './DateTimeKind';
import type JsDateConvertible from './JsDateConvertible';
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
    static get now(): DateTime;
    static get today(): DateTime;
    static get tomorrow(): DateTime;
    get kind(): DateTimeKind;
    get year(): number;
    get month(): Gregorian.Month;
    get calendarMonth(): number;
    get calendar(): CalendarDate;
    get day(): number;
    get dayIndex(): number;
    get dayOfWeek(): Gregorian.DayOfWeek;
    get date(): DateTime;
    get timeOfDay(): ClockTime;
    static between(first: Date | DateTime, last: Date | DateTime): TimeSpan;
    static isLeapYear(year: number): boolean;
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
    add(time: TimeQuantity): DateTime;
    subtract(time: TimeQuantity): DateTime;
    timePassedSince(previous: Date | DateTime): TimeSpan;
    toTimeStamp(): TimeStamp;
    toUniversalTime(): DateTime;
    equals(other: Date): boolean;
    equals(other: JsDateConvertible, strict?: boolean): boolean;
    compareTo(other: Date | JsDateConvertible): number;
    equivalent(other: Date | JsDateConvertible): boolean;
}
