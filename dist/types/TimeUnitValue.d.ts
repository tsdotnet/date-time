/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import TimeQuantity from './TimeQuantity';
import TimeUnit from './TimeUnit';
export default class TimeUnitValue extends TimeQuantity {
    private _units;
    constructor(value: number | TimeQuantity, _units: TimeUnit.UnitType);
    get value(): number;
    set value(v: number);
    get units(): TimeUnit.UnitType;
    static from(value: number | TimeQuantity, units?: TimeUnit.UnitType): TimeUnitValue;
    getTotalMilliseconds(): number;
    to(units?: TimeUnit.UnitType): TimeUnitValue;
}
