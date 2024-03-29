/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import Gregorian from './Calendars/Gregorian';
import JsDateConvertible from './JsDateConvertible';
import TimeStampValue from './TimeStampValue';
/**
 * An alternative to Date or DateTime.  Is a model representing the exact date and time.
 */
export declare class TimeStamp implements Required<TimeStampValue>, JsDateConvertible {
    readonly year: number;
    readonly month: Gregorian.Month;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly tick: number;
    constructor(year: number, month: Gregorian.Month, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, tick?: number);
    static from(d: Date | JsDateConvertible): TimeStamp;
    static now(): TimeStamp;
    toJsDate(): Date;
}
export default TimeStamp;
