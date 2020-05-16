/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import TimeUnit from './TimeUnit';
import TimeQuantity from './TimeQuantity';
/**
 * TimeUnitValue allows for passing around a reference to a mutable measure of time coerced by its unit type.
 */
export default class TimeUnitValue extends TimeQuantity {
    private _units;
    constructor(value: number | TimeQuantity, _units: TimeUnit.Value);
    get value(): number;
    set value(v: number);
    getTotalMilliseconds(): number;
    get units(): TimeUnit.Value;
    to(units?: TimeUnit.Value): TimeUnitValue;
    static from(value: number | TimeQuantity, units?: TimeUnit.Value): TimeUnitValue;
}
