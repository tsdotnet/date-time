/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */

import type from '@tsdotnet/type';
import Gregorian from './Calendars/Gregorian';
import {ticks} from './howMany';
import JsDateConvertible from './JsDateConvertable';
import {TimeStampValue} from './TimeStampValue';

/**
 * An alternative to Date or DateTime.  Is a model representing the exact date and time.
 */
export class TimeStamp
	implements Required<TimeStampValue>, JsDateConvertible
{

	constructor (
		public readonly year: number,
		public readonly month: Gregorian.Month,
		public readonly day: number         = 1,
		public readonly hour: number        = 0,
		public readonly minute: number      = 0,
		public readonly second: number      = 0,
		public readonly millisecond: number = 0,
		public readonly tick: number        = 0)
	{

		// Add validation or properly carry out of range values?

		Object.freeze(this);
	}

	static from (d: Date | JsDateConvertible): TimeStamp
	{
		if(!(d instanceof Date) && type.hasMember(d, 'toJsDate'))
			d = d.toJsDate();
		if(d instanceof Date)
		{
			return new TimeStamp(
				d.getFullYear(),
				d.getMonth(),
				d.getDate(),
				d.getHours(),
				d.getMinutes(),
				d.getSeconds(),
				d.getMilliseconds()
			);
		}
		else
		{
			throw Error('Invalid date type.');
		}
	}

	static now (): TimeStamp
	{
		return TimeStamp.from(new Date());
	}

	toJsDate (): Date
	{
		const _ = this;
		return new Date(_.year, _.month, _.day, _.hour, _.minute, _.second, _.millisecond + _.tick/ticks.per.millisecond);
	}
}

export default TimeStamp;
