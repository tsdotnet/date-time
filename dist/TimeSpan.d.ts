/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
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
    constructor(value: number, units?: TimeUnit.Value);
    static get zero(): TimeSpan;
    /**
     * Provides an standard interface for acquiring the total time.
     * @returns {TimeSpan}
     */
    get total(): TimeSpan;
    private _time;
    get time(): ClockTime;
    static from(value: number, units: TimeUnit.Value): TimeSpan;
    static fromDays(value: number): TimeSpan;
    static fromHours(value: number): TimeSpan;
    static fromMinutes(value: number): TimeSpan;
    static fromSeconds(value: number): TimeSpan;
    static fromMilliseconds(value: number): TimeSpan;
    static fromTicks(value: number): TimeSpan;
    add(other: TimeQuantity): TimeSpan;
    addUnit(value: number, units?: TimeUnit.Value): TimeSpan;
}
export default TimeSpan;
