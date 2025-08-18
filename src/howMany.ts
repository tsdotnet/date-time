/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import * as howMany from './howManyConstEnums';

export namespace hours
{
	export const per = Object.freeze({
		day: howMany.hours.per.day
	})
}
Object.freeze(hours.per);

export namespace minutes
{
	export const per = Object.freeze({
		hour: howMany.minutes.per.hour,
		day: howMany.minutes.per.day
	})
}
Object.freeze(minutes.per);

export namespace seconds
{
	export const per = Object.freeze({
		minute: howMany.seconds.per.minute,
		hour: howMany.seconds.per.hour,
		day: howMany.seconds.per.day
	})
}
Object.freeze(seconds.per);

export namespace milliseconds
{
	export const per = Object.freeze({
		second: howMany.milliseconds.per.second,
		minute: howMany.milliseconds.per.minute,
		hour: howMany.milliseconds.per.hour,
		day: howMany.milliseconds.per.day
	})
}
Object.freeze(milliseconds.per);

export namespace ticks
{
	export const per = Object.freeze({
		millisecond: howMany.ticks.per.millisecond,
		second: howMany.ticks.per.second,
		minute: howMany.ticks.per.minute,
		hour: howMany.ticks.per.hour,
		day: howMany.ticks.per.day
	})
}
Object.freeze(ticks.per);
