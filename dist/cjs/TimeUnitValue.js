"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TimeQuantity_js_1 = tslib_1.__importDefault(require("./TimeQuantity.js"));
const TimeUnit_js_1 = tslib_1.__importDefault(require("./TimeUnit.js"));
class TimeUnitValue extends TimeQuantity_js_1.default {
    constructor(value, _units) {
        super(typeof value == 'number'
            ? value
            : getUnitQuantityFrom(value, _units));
        this._units = _units;
        TimeUnit_js_1.default.assertValid(_units);
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
    static from(value, units = TimeUnit_js_1.default.UnitType.Milliseconds) {
        return new TimeUnitValue(value, units);
    }
    getTotalMilliseconds() {
        return TimeUnit_js_1.default.toMilliseconds(this._quantity, this._units);
    }
    to(units = this.units) {
        return TimeUnitValue.from(this, units);
    }
}
exports.default = TimeUnitValue;
function getUnitQuantityFrom(q, units) {
    return TimeUnit_js_1.default.fromMilliseconds(q.getTotalMilliseconds(), units);
}
//# sourceMappingURL=TimeUnitValue.js.map