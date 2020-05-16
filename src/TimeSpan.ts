/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import type from '@tsdotnet/compare/dist/type';
import Lazy from '@tsdotnet/lazy';
import ClockTime from './ClockTime';
import {milliseconds, ticks} from './howMany';
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
	constructor (value: number, units: TimeUnit.Value = TimeUnit.Value.Milliseconds)
	{
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
	get time (): ClockTime
	{
		return this._time.value;
	}

	static from (value: number, units: TimeUnit.Value): TimeSpan
	{
		return new TimeSpan(value, units);
	}

	static fromDays (value: number): TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Value.Days);
	}

	static fromHours (value: number): TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Value.Hours);
	}

	static fromMinutes (value: number): TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Value.Minutes);
	}

	static fromSeconds (value: number): TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Value.Seconds);
	}

	static fromMilliseconds (value: number): TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Value.Milliseconds);
	}

	static fromTicks (value: number): TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Value.Ticks);
	}

	add (other: TimeQuantity): TimeSpan
	{
		if(type.isNumber(other))
			throw new Error(
				'Use .addUnit(value:number,units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n' +
				'.add only supports quantifiable time values (ITimeTotal).'
			);

		return new TimeSpan(this.getTotalMilliseconds() + other.total.milliseconds);
	}

	addUnit (value: number, units: TimeUnit.Value = TimeUnit.Value.Milliseconds): TimeSpan
	{
		return new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units));
	}
}


let timeSpanZero: TimeSpan;

export default TimeSpan;
