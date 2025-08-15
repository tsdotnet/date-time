/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */


export namespace hours
{
	export const enum per
	{
		day = 24
	}
}

export namespace minutes
{
	export const enum per
	{
		hour = 60,
		day  = hour*hours.per.day
	}

}

export namespace seconds
{
	export const enum per
	{
		minute = 60,
		hour   = minute*minutes.per.hour,
		day    = hour*hours.per.day
	}

}

export namespace milliseconds
{
	export const enum per
	{
		second = 1000,
		minute = second*seconds.per.minute,
		hour   = minute*minutes.per.hour,
		day    = hour*hours.per.day
	}

}

export namespace ticks
{
	export const enum per
	{
		millisecond = 10000,
		second      = millisecond*milliseconds.per.second,
		minute      = second*seconds.per.minute,
		hour        = minute*minutes.per.hour,
		day         = hour*hours.per.day
	}

}