/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */

import {hours, milliseconds, minutes, seconds, ticks} from './howMany';
import TimeQuantity from './TimeQuantity';


/* eslint-disable no-fallthrough */

export namespace TimeUnit
{
	/**
	 * A distinct unit of time measurement.
	 */
	export enum UnitType
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
	 * @param {UnitType} units
	 * @return {number} Number of milliseconds representing the specified units.
	 */
	export function toMilliseconds (
		value: number,
		units: UnitType): number
	{
		// noinspection FallThroughInSwitchStatementJS
		switch(units)
		{
			case UnitType.Days:
				value *= hours.per.day;
			case UnitType.Hours:
				value *= minutes.per.hour;
			case UnitType.Minutes:
				value *= seconds.per.minute;
			case UnitType.Seconds:
				value *= milliseconds.per.second;
			case UnitType.Milliseconds:
				return value;
			case UnitType.Ticks:
				return value/ticks.per.millisecond;
			default:
				throw new Error('Invalid TimeUnit.');
		}
	}

	/**
	 * Converts milliseconds to the specified TimeUnit quantity.
	 * @param {number} ms
	 * @param {UnitType} units
	 * @return {number}
	 */
	export function fromMilliseconds (
		ms: number,
		units: UnitType): number
	{
		switch(units)
		{
			case UnitType.Days:
				return ms/milliseconds.per.day;
			case UnitType.Hours:
				return ms/milliseconds.per.hour;
			case UnitType.Minutes:
				return ms/milliseconds.per.minute;
			case UnitType.Seconds:
				return ms/milliseconds.per.second;
			case UnitType.Milliseconds:
				return ms;
			case UnitType.Ticks:
				return ms*ticks.per.millisecond;
			default:
				throw new Error('Invalid TimeUnit.');
		}
	}

	/**
	 * Converts a TimeQuantity to the the TimeUnit requested..
	 * @param {TimeQuantity} quantity
	 * @param {UnitType} toUnits
	 * @return {number}
	 */
	export function from (quantity: TimeQuantity, toUnits: UnitType): number
	{
		return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), toUnits);
	}


	/**
	 * Asserts if the time unit value is valid.
	 * @param {UnitType} unit
	 * @return {true}
	 */
	export function assertValid (unit: UnitType): true | never
	{
		if(isNaN(unit) || unit>UnitType.Days || unit<UnitType.Ticks || Math.floor(unit)!==unit)
			throw new Error('Invalid TimeUnit.');

		return true;
	}

}

Object.freeze(TimeUnit.UnitType);
Object.freeze(TimeUnit);

export default TimeUnit;
