/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import {hours, milliseconds, minutes, seconds, ticks} from './howMany';
import TimeQuantity from './TimeQuantity';


/* eslint-disable no-fallthrough */

namespace TimeUnit
{
	/**
	 * A distinct unit of time measurement.
	 */
	export enum Value
	{
		Ticks,
		Milliseconds,
		Seconds,
		Minutes,
		Hours,
		Days
	} // Earth Days

	/**
	 * Converts any TimeUnit value to it's respective millisecond quantity.
	 * @param {number} value
	 * @param {Value} units
	 * @return {number} Number of milliseconds representing the specified units.
	 */
	export function toMilliseconds (
		value: number,
		units: Value): number
	{
		// noinspection FallThroughInSwitchStatementJS
		switch(units)
		{
			case Value.Days:
				value *= hours.per.day;
			case Value.Hours:
				value *= minutes.per.hour;
			case Value.Minutes:
				value *= seconds.per.minute;
			case Value.Seconds:
				value *= milliseconds.per.second;
			case Value.Milliseconds:
				return value;
			case Value.Ticks:
				return value/ticks.per.millisecond;
			default:
				throw new Error('Invalid TimeUnit.');
		}
	}

	/**
	 * Converts milliseconds to the specified TimeUnit quantity.
	 * @param {number} ms
	 * @param {Value} units
	 * @return {number}
	 */
	export function fromMilliseconds (
		ms: number,
		units: Value): number
	{
		switch(units)
		{
			case Value.Days:
				return ms/milliseconds.per.day;
			case Value.Hours:
				return ms/milliseconds.per.hour;
			case Value.Minutes:
				return ms/milliseconds.per.minute;
			case Value.Seconds:
				return ms/milliseconds.per.second;
			case Value.Milliseconds:
				return ms;
			case Value.Ticks:
				return ms*ticks.per.millisecond;
			default:
				throw new Error('Invalid TimeUnit.');
		}
	}

	/**
	 * Converts a TimeQuantity to the the TimeUnit requested..
	 * @param {TimeQuantity} quantity
	 * @param {Value} toUnits
	 * @return {number}
	 */
	export function from (quantity: TimeQuantity, toUnits: Value): number
	{
		return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), toUnits);
	}


	/**
	 * Asserts if the time unit value is valid.
	 * @param {Value} unit
	 * @return {true}
	 */
	export function assertValid (unit: Value): true | never
	{
		if(isNaN(unit) || unit>Value.Days || unit<Value.Ticks || Math.floor(unit)!==unit)
			throw new Error('Invalid TimeUnit.');

		return true;
	}

}

Object.freeze(TimeUnit.Value);
Object.freeze(TimeUnit);

export default TimeUnit;
