/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * @license MIT
 */

import Lazy from '@tsdotnet/lazy';
import type from '@tsdotnet/type';
import ClockTime from './ClockTime';
import {milliseconds, ticks} from './howManyConstEnums';
import TimeMeasurement from './TimeMeasurement';
import TimeQuantity from './TimeQuantity';
import TimeUnit from './TimeUnit';

/**
 * TimeSpan expands on TimeQuantity to provide an class that is similar to .NET's TimeSpan including many useful static methods.
 */
export class TimeSpan
	extends TimeQuantity
	implements TimeMeasurement
{
	/**
	 * The total number of ticks that represent this amount of time.
	 */
	readonly ticks: number;

	/**
	 * The total number of ticks that milliseconds this amount of time.
	 */
	readonly milliseconds: number;

	/**
	 * The total number of ticks that seconds this amount of time.
	 */
	readonly seconds: number;

	/**
	 * The total number of ticks that minutes this amount of time.
	 */
	readonly minutes: number;

	/**
	 * The total number of ticks that hours this amount of time.
	 */
	readonly hours: number;

	/**
	 * The total number of ticks that days this amount of time.
	 */
	readonly days: number;

	// In .NET the default type is Ticks, but for JavaScript, we will use Milliseconds.
	protected constructor (value: number, units: TimeUnit.UnitType = TimeUnit.UnitType.Milliseconds)
	{
		if(isNaN(value)) throw Error('Cannot construct a TimeSpan from NaN value.');
		const ms = TimeUnit.toMilliseconds(value, units);
		super(ms);

		this.ticks = ms*ticks.per.millisecond;
		this.milliseconds = ms;
		this.seconds = ms/milliseconds.per.second;
		this.minutes = ms/milliseconds.per.minute;
		this.hours = ms/milliseconds.per.hour;
		this.days = ms/milliseconds.per.day;

		this._time = Lazy.create(() => new ClockTime(this.getTotalMilliseconds()));

		Object.freeze(this);
	}

	static get zero (): TimeSpan
	{
		return timeSpanZero || (timeSpanZero = new TimeSpan(0));
	}

	/**
	 * Provides an standard interface for acquiring the total time.
	 * @returns {TimeSpan}
	 */
	get total (): TimeSpan
	{
		return this;
	}

	private _time: Lazy<ClockTime>;

	// Instead of the confusing getTotal versus unit name, expose a 'ClockTime' value which reports the individual components.

	/**
	 * The value of this TimeSpan reduced to the clock and calendar.
	 * @return {ClockTime}
	 */
	get time (): ClockTime
	{
		return this._time.value;
	}

	static from (values: Partial<TimeMeasurement>): TimeSpan;

	static from (value: number, units: TimeUnit.UnitType): TimeSpan;

	static from (value: number | Partial<TimeMeasurement>, units?: TimeUnit.UnitType): TimeSpan
	{
		if(!value) return TimeSpan.zero;
		if(typeof value==='number')
		{
			if(units===undefined) throw new Error('A numerical value requires a TimeUnit.');
			return new TimeSpan(value, units);
		}
		const ms = TimeQuantity.getTotalMillisecondsFrom(value);
		return ms ? new TimeSpan(ms) : TimeSpan.zero;
	}

	static fromDays (value: number): TimeSpan
	{
		return value ? new TimeSpan(value, TimeUnit.UnitType.Days) : TimeSpan.zero;
	}

	static fromHours (value: number): TimeSpan
	{
		return value ? new TimeSpan(value, TimeUnit.UnitType.Hours) : TimeSpan.zero;
	}

	static fromMinutes (value: number): TimeSpan
	{
		return value ? new TimeSpan(value, TimeUnit.UnitType.Minutes) : TimeSpan.zero;
	}

	static fromSeconds (value: number): TimeSpan
	{
		return value ? new TimeSpan(value, TimeUnit.UnitType.Seconds) : TimeSpan.zero;
	}

	static fromMilliseconds (value: number): TimeSpan
	{
		return value ? new TimeSpan(value) : TimeSpan.zero;
	}

	static fromTicks (value: number): TimeSpan
	{
		return value ? new TimeSpan(value, TimeUnit.UnitType.Ticks) : TimeSpan.zero;
	}

	/**
	 * Sum the value of this TimeSpan with another time quantity.
	 * @param {TimeQuantity | Partial<TimeMeasurement>} other
	 * @return {TimeSpan}
	 */
	add (other: TimeSpan | TimeQuantity | Partial<TimeMeasurement>): TimeSpan
	{
		if(!other) return this;
		if(type.isNumber(other))
			throw new Error(
				'Use .addUnit(value:number, units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n' +
				'.add only supports quantifiable time values (TimeQuantity).');

		const otherMs = other instanceof TimeQuantity
			? other.total.milliseconds
			: TimeQuantity.getTotalMillisecondsFrom(other);

		return new TimeSpan(this.getTotalMilliseconds() + otherMs);
	}

	/**
	 * Sum the value of this TimeSpan with another unit value.
	 * @param {number} value
	 * @param {TimeUnit.UnitType} units
	 * @return {TimeSpan}
	 */
	addUnit (value: number, units: TimeUnit.UnitType = TimeUnit.UnitType.Milliseconds): TimeSpan
	{
		return value
			? new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units))
			: this;
	}
}


let timeSpanZero: TimeSpan;

export default TimeSpan;
