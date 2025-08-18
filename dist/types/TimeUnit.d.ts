/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
import TimeQuantity from './TimeQuantity';
export declare namespace TimeUnit {
    enum UnitType {
        Ticks = 0,
        Milliseconds = 1,
        Seconds = 2,
        Minutes = 3,
        Hours = 4,
        Days = 5
    }
    function toMilliseconds(value: number, units: UnitType): number;
    function fromMilliseconds(ms: number, units: UnitType): number;
    function from(quantity: TimeQuantity, toUnits: UnitType): number;
    function assertValid(unit: UnitType): true | never;
}
export default TimeUnit;
