"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TimeUnit_1 = tslib_1.__importDefault(require("./TimeUnit"));
const TimeQuantity_1 = tslib_1.__importDefault(require("./TimeQuantity"));
/**
 * TimeUnitValue allows for passing around a reference to a mutable measure of time coerced by its unit type.
 */
class TimeUnitValue extends TimeQuantity_1.default {
    constructor(value, _units) {
        super(typeof value == 'number'
            ? value
            : getUnitQuantityFrom(value, _units));
        this._units = _units;
        TimeUnit_1.default.assertValid(_units);
    }
    get value() {
        return this._quantity;
    }
    set value(v) {
        this._quantity = v;
        if (!this._total.tryReset())
            throw new Error('Unable to update underlying value.');
    }
    getTotalMilliseconds() {
        return TimeUnit_1.default.toMilliseconds(this._quantity, this._units);
    }
    // To avoid confusion, the unit type can only be set once at construction.
    get units() {
        return this._units;
    }
    to(units = this.units) {
        return TimeUnitValue.from(this, units);
    }
    static from(value, units = TimeUnit_1.default.Value.Milliseconds) {
        return new TimeUnitValue(value, units);
    }
}
exports.default = TimeUnitValue;
function getUnitQuantityFrom(q, units) {
    return TimeUnit_1.default.fromMilliseconds(q.getTotalMilliseconds(), units);
}
//# sourceMappingURL=TimeUnitValue.js.map