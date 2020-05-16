/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import TimeQuantity from './TimeQuantity';
import TimeUnit from './TimeUnit';
/**
 * TimeUnitValue allows for passing around a reference to a mutable measure of time coerced by its unit type.
 */
export default class TimeUnitValue extends TimeQuantity {
    constructor(value, _units) {
        super(typeof value == 'number'
            ? value
            : getUnitQuantityFrom(value, _units));
        this._units = _units;
        TimeUnit.assertValid(_units);
    }
    get value() {
        return this._quantity;
    }
    set value(v) {
        this._quantity = v;
        if (!this._total.tryReset())
            throw new Error('Unable to update underlying value.');
    }
    // To avoid confusion, the unit type can only be set once at construction.
    get units() {
        return this._units;
    }
    static from(value, units = TimeUnit.Value.Milliseconds) {
        return new TimeUnitValue(value, units);
    }
    getTotalMilliseconds() {
        return TimeUnit.toMilliseconds(this._quantity, this._units);
    }
    to(units = this.units) {
        return TimeUnitValue.from(this, units);
    }
}
function getUnitQuantityFrom(q, units) {
    return TimeUnit.fromMilliseconds(q.getTotalMilliseconds(), units);
}
//# sourceMappingURL=TimeUnitValue.js.map