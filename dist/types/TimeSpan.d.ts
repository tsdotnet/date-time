/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
import ClockTime from './ClockTime';
import TimeMeasurement from './TimeMeasurement';
import TimeQuantity from './TimeQuantity';
import TimeUnit from './TimeUnit';
export declare class TimeSpan extends TimeQuantity implements TimeMeasurement {
    readonly ticks: number;
    readonly milliseconds: number;
    readonly seconds: number;
    readonly minutes: number;
    readonly hours: number;
    readonly days: number;
    protected constructor(value: number, units?: TimeUnit.UnitType);
    static get zero(): TimeSpan;
    get total(): TimeSpan;
    private _time;
    get time(): ClockTime;
    static from(values: Partial<TimeMeasurement>): TimeSpan;
    static from(value: number, units: TimeUnit.UnitType): TimeSpan;
    static fromDays(value: number): TimeSpan;
    static fromHours(value: number): TimeSpan;
    static fromMinutes(value: number): TimeSpan;
    static fromSeconds(value: number): TimeSpan;
    static fromMilliseconds(value: number): TimeSpan;
    static fromTicks(value: number): TimeSpan;
    add(other: TimeSpan | TimeQuantity | Partial<TimeMeasurement>): TimeSpan;
    addUnit(value: number, units?: TimeUnit.UnitType): TimeSpan;
}
export default TimeSpan;
