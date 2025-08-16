/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@tsdotnet/compare", "@tsdotnet/exceptions", "@tsdotnet/lazy", "./howMany", "./TimeUnit"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const compare_1 = require("@tsdotnet/compare");
    const exceptions_1 = require("@tsdotnet/exceptions");
    const lazy_1 = require("@tsdotnet/lazy");
    const howMany_1 = require("./howMany");
    const TimeUnit_1 = tslib_1.__importDefault(require("./TimeUnit"));
    /**
     * This class provides a simple means for storing and calculating time quantities.
     */
    class TimeQuantity {
        _quantity;
        constructor(_quantity = 0) {
            this._quantity = _quantity;
            this._total = lazy_1.ResettableLazy.create(() => {
                const ms = this.getTotalMilliseconds();
                return Object.freeze({
                    ticks: ms * howMany_1.ticks.per.millisecond,
                    milliseconds: ms,
                    seconds: ms / howMany_1.milliseconds.per.second,
                    minutes: ms / howMany_1.milliseconds.per.minute,
                    hours: ms / howMany_1.milliseconds.per.hour,
                    days: ms / howMany_1.milliseconds.per.day
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
            return (values.days || 0) * howMany_1.milliseconds.per.day +
                (values.hours || 0) * howMany_1.milliseconds.per.hour +
                (values.minutes || 0) * howMany_1.milliseconds.per.minute +
                (values.seconds || 0) * howMany_1.milliseconds.per.second +
                (values.milliseconds || 0) +
                (values.ticks || 0) / howMany_1.ticks.per.millisecond;
        }
        /**
         * +1, 0, or -1 depending on the time direction.
         * @returns {number}
         */
        get direction() {
            return (0, compare_1.compare)(this.getTotalMilliseconds(), 0);
        }
        _total;
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
            return (0, compare_1.areEqual)(this.getTotalMilliseconds(), other.total.milliseconds);
        }
        /**
         * Compares this instance against any other time quantity instance.
         * @param other
         * @returns {number}
         */
        compareTo(other) {
            if (!other)
                throw new exceptions_1.ArgumentNullException('other');
            if (!other.total)
                throw new exceptions_1.ArgumentNullException('other.total');
            return (0, compare_1.compare)(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
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
});
//# sourceMappingURL=TimeQuantity.js.map