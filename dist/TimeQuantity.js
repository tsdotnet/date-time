"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const areEqual_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/compare/dist/areEqual"));
const compare_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/compare/dist/compare"));
const ArgumentNullException_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/exceptions/dist/ArgumentNullException"));
const ResettableLazy_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/lazy/dist/ResettableLazy"));
const TimeUnit_1 = (0, tslib_1.__importDefault)(require("./TimeUnit"));
/**
 * This class provides a simple means for storing and calculating time quantities.
 */
class TimeQuantity {
    constructor(_quantity = 0) {
        this._quantity = _quantity;
        this._total = ResettableLazy_1.default.create(() => {
            const ms = this.getTotalMilliseconds();
            return Object.freeze({
                ticks: ms * 10000 /* millisecond */,
                milliseconds: ms,
                seconds: ms / 1000 /* second */,
                minutes: ms / 60000 /* minute */,
                hours: ms / 3600000 /* hour */,
                days: ms / 86400000 /* day */
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
        return (values.days || 0) * 86400000 /* day */ +
            (values.hours || 0) * 3600000 /* hour */ +
            (values.minutes || 0) * 60000 /* minute */ +
            (values.seconds || 0) * 1000 /* second */ +
            (values.milliseconds || 0) +
            (values.ticks || 0) / 10000 /* millisecond */;
    }
    /**
     * +1, 0, or -1 depending on the time direction.
     * @returns {number}
     */
    get direction() {
        return (0, compare_1.default)(this.getTotalMilliseconds(), 0);
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
        return (0, areEqual_1.default)(this.getTotalMilliseconds(), other.total.milliseconds);
    }
    /**
     * Compares this instance against any other time quantity instance.
     * @param other
     * @returns {number}
     */
    compareTo(other) {
        if (!other)
            throw new ArgumentNullException_1.default('other');
        if (!other.total)
            throw new ArgumentNullException_1.default('other.total');
        return (0, compare_1.default)(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
    }
    /**
     * Returns the total amount of time measured in the requested TimeUnit.
     * @param units
     * @returns {number}
     */
    getTotal(units) {
        return TimeUnit_1.default.fromMilliseconds(this.getTotalMilliseconds(), units);
    }
}
exports.default = TimeQuantity;
//# sourceMappingURL=TimeQuantity.js.map