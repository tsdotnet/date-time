/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ResettableLazy from '@tsdotnet/lazy/dist/ResettableLazy';
import TimeMeasurement from './TimeMeasurement';
import TimeUnit from './TimeUnit';
/**
 * This class provides a simple means for storing and calculating time quantities.
 */
export default class TimeQuantity {
    protected _quantity: number;
    constructor(_quantity?: number);
    /**
     * Combine total values by time unit.
     * @param {Partial<TimeMeasurement>} values
     * @return {number}
     */
    static getTotalMillisecondsFrom(values: Partial<TimeMeasurement>): number;
    /**
     * +1, 0, or -1 depending on the time direction.
     * @returns {number}
     */
    get direction(): number;
    protected _total: ResettableLazy<Readonly<TimeMeasurement>>;
    /**
     * Returns an object with all units exposed as totals.
     * @returns {TimeMeasurement}
     */
    get total(): Readonly<TimeMeasurement>;
    getTotalMilliseconds(): number;
    /**
     * Compares this instance against any other time quantity instance and return true if the amount of time is the same.
     * @param other
     * @returns {boolean}
     */
    equals(other: TimeQuantity): boolean;
    /**
     * Compares this instance against any other time quantity instance.
     * @param other
     * @returns {number}
     */
    compareTo(other: TimeQuantity): number;
    /**
     * Returns the total amount of time measured in the requested TimeUnit.
     * @param units
     * @returns {number}
     */
    getTotal(units: TimeUnit.UnitType): number;
}
