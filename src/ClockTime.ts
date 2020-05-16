/*!
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import ClockTimeValue from './ClockTimeValue';
import * as howMany from './howMany';
import TimeQuantity from './TimeQuantity';


export class ClockTime
	extends TimeQuantity
	implements Required<ClockTimeValue>
{

	readonly days: number;
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

		this.days = (msi/howMany.milliseconds.per.day) | 0;
		msi -= this.days*howMany.milliseconds.per.day;

		this.hour = (msi/howMany.milliseconds.per.hour) | 0;
		msi -= this.hour*howMany.milliseconds.per.hour;

		this.minute = (msi/howMany.milliseconds.per.minute) | 0;
		msi -= this.minute*howMany.milliseconds.per.minute;

		this.second = (msi/howMany.milliseconds.per.second) | 0;
		msi -= this.second*howMany.milliseconds.per.second;

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

		if(_.days)
			a.push(pluralize(_.days, 'day'));

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
