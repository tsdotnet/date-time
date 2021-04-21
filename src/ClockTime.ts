/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */

import ClockTimeValue from './ClockTimeValue';
import * as howMany from './howMany';
import TimeQuantity from './TimeQuantity';
import msPer = howMany.milliseconds.per;

export class ClockTime
	extends TimeQuantity
	implements Required<ClockTimeValue>
{

	readonly day: number;
	readonly hour: number;
	readonly minute: number;
	readonly second: number;
	readonly millisecond: number;
	readonly tick: number;

	constructor (milliseconds: number);
	constructor (hours: number, minutes: number, seconds?: number, milliseconds?: number);
	constructor (...args: number[])
	{
		super(
			args.length>1
				? ClockTime.millisecondsFromTime(
				args[0] || 0,
				args[1] || 0,
				args.length>2 && args[2] || 0,
				args.length>3 && args[3] || 0
				)
				: (args.length>0 && args[0] || 0)
		);

		const ms = Math.abs(this.getTotalMilliseconds());
		let msi = Math.floor(ms);

		this.tick = (ms - msi)*howMany.ticks.per.millisecond;


		this.day = (msi/msPer.day) | 0;
		msi -= this.day*howMany.milliseconds.per.day;

		this.hour = (msi/msPer.hour) | 0;
		msi -= this.hour*msPer.hour;

		this.minute = (msi/msPer.minute) | 0;
		msi -= this.minute*msPer.minute;

		this.second = (msi/msPer.second) | 0;
		msi -= this.second*msPer.second;

		this.millisecond = msi;

		Object.freeze(this);
	}


	// Static version for relative consistency.  Constructor does allow this format.
	static from (
		hours: number,
		minutes: number,
		seconds: number      = 0,
		milliseconds: number = 0): ClockTime
	{
		return new ClockTime(hours, minutes, seconds, milliseconds);
	}

	static millisecondsFromTime (
		hours: number,
		minutes: number,
		seconds: number      = 0,
		milliseconds: number = 0): number
	{
		let value = hours;
		value *= howMany.minutes.per.hour;
		value += minutes;
		value *= howMany.seconds.per.minute;
		value += seconds;
		value *= howMany.milliseconds.per.second;
		value += milliseconds;
		return value;
	}

	toString (/*format?:string, formatProvider?:IFormatProvider*/): string
	{
		/* INSERT CUSTOM FORMATTING CODE HERE */


		const _ = this;
		const a: string[] = [];

		if(_.day)
			a.push(pluralize(_.day, 'day'));

		if(_.hour)
			a.push(pluralize(_.hour, 'hour'));

		if(_.minute)
			a.push(pluralize(_.minute, 'minute'));

		if(_.second)
			a.push(pluralize(_.second, 'second'));

		if(a.length>1)
			a.splice(a.length - 1, 0, 'and');

		return a.join(', ').replace(', and, ', ' and ');
	}

}


// Temporary until the full TimeSpanFormat is available.
function pluralize (value: number, label: string): string
{
	if(Math.abs(value)!==1)
		label += 's';

	return label;
}

export default ClockTime;
