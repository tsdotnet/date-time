/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import TimeQuantity from './TimeQuantity';
declare namespace TimeUnit {
    /**
     * A distinct unit of time measurement.
     */
    enum Value {
        Ticks = 0,
        Milliseconds = 1,
        Seconds = 2,
        Minutes = 3,
        Hours = 4,
        Days = 5
    }
    /**
     * Converts any TimeUnit value to it's respective millisecond quantity.
     * @param {number} value
     * @param {Value} units
     * @return {number} Number of milliseconds representing the specified units.
     */
    function toMilliseconds(value: number, units: Value): number;
    /**
     * Converts milliseconds to the specified TimeUnit quantity.
     * @param {number} ms
     * @param {Value} units
     * @return {number}
     */
    function fromMilliseconds(ms: number, units: Value): number;
    /**
     * Converts a TimeQuantity to the the TimeUnit requested..
     * @param {TimeQuantity} quantity
     * @param {Value} toUnits
     * @return {number}
     */
    function from(quantity: TimeQuantity, toUnits: Value): number;
    /**
     * Asserts if the time unit value is valid.
     * @param {Value} unit
     * @return {true}
     */
    function assertValid(unit: Value): true | never;
}
export default TimeUnit;
