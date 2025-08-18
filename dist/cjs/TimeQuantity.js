"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compare_1 = require("@tsdotnet/compare");
const exceptions_1 = require("@tsdotnet/exceptions");
const lazy_1 = require("@tsdotnet/lazy");
const TimeUnit_1 = tslib_1.__importDefault(require("./TimeUnit"));
class TimeQuantity {
    constructor(_quantity = 0) {
        this._quantity = _quantity;
        this._total = lazy_1.ResettableLazy.create(() => {
            const ms = this.getTotalMilliseconds();
            return Object.freeze({
                ticks: ms * 10000,
                milliseconds: ms,
                seconds: ms / 1000,
                minutes: ms / 60000,
                hours: ms / 3600000,
                days: ms / 86400000
            });
        });
    }
    static getTotalMillisecondsFrom(values) {
        if (!values)
            return 0;
        return (values.days || 0) * 86400000 +
            (values.hours || 0) * 3600000 +
            (values.minutes || 0) * 60000 +
            (values.seconds || 0) * 1000 +
            (values.milliseconds || 0) +
            (values.ticks || 0) / 10000;
    }
    get direction() {
        return (0, compare_1.compare)(this.getTotalMilliseconds(), 0);
    }
    get total() {
        return this._total.value;
    }
    getTotalMilliseconds() {
        return this._quantity;
    }
    equals(other) {
        if (!other || !other.total)
            return false;
        return (0, compare_1.areEqual)(this.getTotalMilliseconds(), other.total.milliseconds);
    }
    compareTo(other) {
        if (!other)
            throw new exceptions_1.ArgumentNullException('other');
        if (!other.total)
            throw new exceptions_1.ArgumentNullException('other.total');
        return (0, compare_1.compare)(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
    }
    getTotal(units) {
        return TimeUnit_1.default.fromMilliseconds(this.getTotalMilliseconds(), units);
    }
}
exports.default = TimeQuantity;
//# sourceMappingURL=TimeQuantity.js.map