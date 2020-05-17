/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */
import TimeQuantity from './TimeQuantity';
export declare namespace TimeUnit {
    /**
     * A distinct unit of time measurement.
     */
    enum UnitType {
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
     * @param {UnitType} units
     * @return {number} Number of milliseconds representing the specified units.
     */
    function toMilliseconds(value: number, units: UnitType): number;
    /**
     * Converts milliseconds to the specified TimeUnit quantity.
     * @param {number} ms
     * @param {UnitType} units
     * @return {number}
     */
    function fromMilliseconds(ms: number, units: UnitType): number;
    /**
     * Converts a TimeQuantity to the the TimeUnit requested..
     * @param {TimeQuantity} quantity
     * @param {UnitType} toUnits
     * @return {number}
     */
    function from(quantity: TimeQuantity, toUnits: UnitType): number;
    /**
     * Asserts if the time unit value is valid.
     * @param {UnitType} unit
     * @return {true}
     */
    function assertValid(unit: UnitType): true | never;
}
export default TimeUnit;
