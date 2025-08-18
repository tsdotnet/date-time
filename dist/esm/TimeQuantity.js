import { compare, areEqual } from '@tsdotnet/compare';
import { ArgumentNullException } from '@tsdotnet/exceptions';
import { ResettableLazy } from '@tsdotnet/lazy';
import TimeUnit from './TimeUnit.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class TimeQuantity {
    _quantity;
    constructor(_quantity = 0) {
        this._quantity = _quantity;
        this._total = ResettableLazy.create(() => {
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
        return compare(this.getTotalMilliseconds(), 0);
    }
    _total;
    get total() {
        return this._total.value;
    }
    getTotalMilliseconds() {
        return this._quantity;
    }
    equals(other) {
        if (!other || !other.total)
            return false;
        return areEqual(this.getTotalMilliseconds(), other.total.milliseconds);
    }
    compareTo(other) {
        if (!other)
            throw new ArgumentNullException('other');
        if (!other.total)
            throw new ArgumentNullException('other.total');
        return compare(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
    }
    getTotal(units) {
        return TimeUnit.fromMilliseconds(this.getTotalMilliseconds(), units);
    }
}

export { TimeQuantity as default };
//# sourceMappingURL=TimeQuantity.js.map
