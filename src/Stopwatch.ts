/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */

import Timer from './Timer';
import TimeSpan from './TimeSpan';

export default class Stopwatch
	implements Timer
{

	private _startTimeStamp: number = NaN;

	private _elapsed: number = 0;

	get elapsed (): TimeSpan
	{
		return TimeSpan.fromMilliseconds(this.elapsedMilliseconds);
	}

	private _isRunning: boolean = false;

	get isRunning (): boolean
	{
		return this._isRunning;
	}

	get currentLapMilliseconds (): number
	{
		return this._isRunning
			? (Date.now() - this._startTimeStamp)
			: 0;
	}

	get currentLap (): TimeSpan
	{
		return this._isRunning
			? TimeSpan.fromMilliseconds(this.currentLapMilliseconds)
			: TimeSpan.zero;
	}

	get elapsedMilliseconds (): number
	{
		const _ = this;
		let timeElapsed = _._elapsed;

		if(_._isRunning)
			timeElapsed += _.currentLapMilliseconds;

		return timeElapsed;
	}

	static getTimestampMilliseconds (): number
	{
		return Date.now();
	}

	static startNew (): Stopwatch
	{
		const s = new Stopwatch();
		s.start();
		return s;
	}

	// Effectively calls a stop start and continues timing...

	static measure (closure: () => void): TimeSpan
	{
		const start = Date.now();
		closure();
		return TimeSpan.fromMilliseconds(Date.now() - start);
	}

	start (): void
	{
		const _ = this;
		if(!_._isRunning)
		{
			_._startTimeStamp = Date.now();
			_._isRunning = true;
		}
	}

	stop (): void
	{
		const _ = this;
		if(_._isRunning)
		{
			_._elapsed += _.currentLapMilliseconds;
			_._isRunning = false;
		}
	}

	reset (): void
	{
		const _ = this;
		_._elapsed = 0;
		_._isRunning = false;
		_._startTimeStamp = NaN;
	}

	// Can also be called to effectively start a lap before calling it again to get the elapsed lap time.
	lap (): TimeSpan
	{
		const _ = this;
		if(_._isRunning)
		{
			const t = Date.now();
			const s = _._startTimeStamp;
			const e = t - s;
			_._startTimeStamp = t;
			_._elapsed += e;
			return TimeSpan.fromMilliseconds(e);
		}
		else
			return TimeSpan.zero;
	}
}
