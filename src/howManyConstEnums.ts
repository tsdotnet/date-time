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
		day = 60 * 24
	}
}

export namespace seconds
{
	export const enum per
	{
		minute = 60,
		hour = 60 * 60,
		day = 60 * 60 * 24
	}
}

export namespace milliseconds
{
	export const enum per
	{
		second = 1000,
		minute = 1000 * 60,
		hour = 1000 * 60 * 60,
		day = 1000 * 60 * 60 * 24
	}
}

export namespace ticks
{
	export const enum per
	{
		millisecond = 10000,
		second = 10000 * 1000,
		minute = 10000 * 1000 * 60,
		hour = 10000 * 1000 * 60 * 60,
		day = 10000 * 1000 * 60 * 60 * 24
	}
}
