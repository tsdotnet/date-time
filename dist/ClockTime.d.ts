/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import ClockTimeValue from './ClockTimeValue';
import TimeQuantity from './TimeQuantity';
export declare class ClockTime extends TimeQuantity implements Required<ClockTimeValue> {
    readonly days: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly tick: number;
    constructor(milliseconds: number);
    constructor(hours: number, minutes: number, seconds?: number, milliseconds?: number);
    static from(hours: number, minutes: number, seconds?: number, milliseconds?: number): ClockTime;
    static millisecondsFromTime(hours: number, minutes: number, seconds?: number, milliseconds?: number): number;
    toString(): string;
}
export default ClockTime;
