/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */
import ClockTime from './ClockTime';
import TimeMeasurement from './TimeMeasurement';
import TimeQuantity from './TimeQuantity';
import TimeUnit from './TimeUnit';
/**
 * TimeSpan expands on TimeQuantity to provide an class that is similar to .NET's TimeSpan including many useful static methods.
 */
export declare class TimeSpan extends TimeQuantity implements TimeMeasurement {
    /**
     * The total number of ticks that represent this amount of time.
     */
    readonly ticks: number;
    /**
     * The total number of ticks that milliseconds this amount of time.
     */
    readonly milliseconds: number;
    /**
     * The total number of ticks that seconds this amount of time.
     */
    readonly seconds: number;
    /**
     * The total number of ticks that minutes this amount of time.
     */
    readonly minutes: number;
    /**
     * The total number of ticks that hours this amount of time.
     */
    readonly hours: number;
    /**
     * The total number of ticks that days this amount of time.
     */
    readonly days: number;
    protected constructor(value: number, units?: TimeUnit.UnitType);
    static get zero(): TimeSpan;
    /**
     * Provides an standard interface for acquiring the total time.
     * @returns {TimeSpan}
     */
    get total(): TimeSpan;
    private _time;
    /**
     * The value of this TimeSpan reduced to the clock and calendar.
     * @return {ClockTime}
     */
    get time(): ClockTime;
    static from(values: Partial<TimeMeasurement>): TimeSpan;
    static from(value: number, units: TimeUnit.UnitType): TimeSpan;
    static fromDays(value: number): TimeSpan;
    static fromHours(value: number): TimeSpan;
    static fromMinutes(value: number): TimeSpan;
    static fromSeconds(value: number): TimeSpan;
    static fromMilliseconds(value: number): TimeSpan;
    static fromTicks(value: number): TimeSpan;
    /**
     * Sum the value of this TimeSpan with another time quantity.
     * @param {TimeQuantity | Partial<TimeMeasurement>} other
     * @return {TimeSpan}
     */
    add(other: TimeSpan | TimeQuantity | Partial<TimeMeasurement>): TimeSpan;
    /**
     * Sum the value of this TimeSpan with another unit value.
     * @param {number} value
     * @param {TimeUnit.UnitType} units
     * @return {TimeSpan}
     */
    addUnit(value: number, units?: TimeUnit.UnitType): TimeSpan;
}
export default TimeSpan;
