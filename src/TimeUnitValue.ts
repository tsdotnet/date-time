/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */

import TimeQuantity from './TimeQuantity';
import TimeUnit from './TimeUnit';

/**
 * TimeUnitValue allows for passing around a reference to a mutable measure of time coerced by its unit type.
 */
export default class TimeUnitValue
	extends TimeQuantity
{
	constructor (value: number | TimeQuantity, private _units: TimeUnit.UnitType)
	{
		super(typeof value=='number'
			? value
			: getUnitQuantityFrom(value, _units));
		TimeUnit.assertValid(_units);
	}

	get value (): number
	{
		return this._quantity;
	}

	set value (v: number)
	{
		this._quantity = v;
		if(!this._total.tryReset()) throw new Error('Unable to update underlying value.');
	}

	// To avoid confusion, the unit type can only be set once at construction.
	get units (): TimeUnit.UnitType
	{
		return this._units;
	}

	static from (
		value: number | TimeQuantity,
		units: TimeUnit.UnitType = TimeUnit.UnitType.Milliseconds): TimeUnitValue
	{
		return new TimeUnitValue(value, units);
	}

	getTotalMilliseconds (): number
	{
		return TimeUnit.toMilliseconds(this._quantity, this._units);
	}

	to (units: TimeUnit.UnitType = this.units): TimeUnitValue
	{
		return TimeUnitValue.from(this, units);
	}

}

function getUnitQuantityFrom (q: TimeQuantity, units: TimeUnit.UnitType): number
{
	return TimeUnit.fromMilliseconds(q.getTotalMilliseconds(), units);
}
