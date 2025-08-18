import TimeQuantity from './TimeQuantity.js';
import TimeUnit from './TimeUnit.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class TimeUnitValue extends TimeQuantity {
    _units;
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
    get units() {
        return this._units;
    }
    static from(value, units = TimeUnit.UnitType.Milliseconds) {
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

export { TimeUnitValue as default };
//# sourceMappingURL=TimeUnitValue.js.map
