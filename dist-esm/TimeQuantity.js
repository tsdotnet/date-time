/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import areEqual from '@tsdotnet/compare/dist/areEqual';
import compare from '@tsdotnet/compare/dist/compare';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import ResettableLazy from '@tsdotnet/lazy/dist/ResettableLazy';
import TimeUnit from './TimeUnit';
/**
 * This class provides a simple means for storing and calculating time quantities.
 */
export default class TimeQuantity {
    constructor(_quantity = 0) {
        this._quantity = _quantity;
        this._total = ResettableLazy.create(() => {
            const ms = this.getTotalMilliseconds();
            return Object.freeze({
                ticks: ms * 10000 /* ticks.per.millisecond */,
                milliseconds: ms,
                seconds: ms / 1000 /* milliseconds.per.second */,
                minutes: ms / 60000 /* milliseconds.per.minute */,
                hours: ms / 3600000 /* milliseconds.per.hour */,
                days: ms / 86400000 /* milliseconds.per.day */
            });
        });
    }
    /**
     * Combine total values by time unit.
     * @param {Partial<TimeMeasurement>} values
     * @return {number}
     */
    static getTotalMillisecondsFrom(values) {
        if (!values)
            return 0;
        return (values.days || 0) * 86400000 /* milliseconds.per.day */ +
            (values.hours || 0) * 3600000 /* milliseconds.per.hour */ +
            (values.minutes || 0) * 60000 /* milliseconds.per.minute */ +
            (values.seconds || 0) * 1000 /* milliseconds.per.second */ +
            (values.milliseconds || 0) +
            (values.ticks || 0) / 10000 /* ticks.per.millisecond */;
    }
    /**
     * +1, 0, or -1 depending on the time direction.
     * @returns {number}
     */
    get direction() {
        return compare(this.getTotalMilliseconds(), 0);
    }
    /**
     * Returns an object with all units exposed as totals.
     * @returns {TimeMeasurement}
     */
    get total() {
        return this._total.value;
    }
    // Provides an overridable mechanism for extending this class.
    getTotalMilliseconds() {
        return this._quantity;
    }
    /**
     * Compares this instance against any other time quantity instance and return true if the amount of time is the same.
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        if (!other || !other.total)
            return false;
        return areEqual(this.getTotalMilliseconds(), other.total.milliseconds);
    }
    /**
     * Compares this instance against any other time quantity instance.
     * @param other
     * @returns {number}
     */
    compareTo(other) {
        if (!other)
            throw new ArgumentNullException('other');
        if (!other.total)
            throw new ArgumentNullException('other.total');
        return compare(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
    }
    /**
     * Returns the total amount of time measured in the requested TimeUnit.
     * @param units
     * @returns {number}
     */
    getTotal(units) {
        return TimeUnit.fromMilliseconds(this.getTotalMilliseconds(), units);
    }
}
//# sourceMappingURL=TimeQuantity.js.map