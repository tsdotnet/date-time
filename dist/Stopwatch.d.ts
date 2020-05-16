/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import TimeSpan from './TimeSpan';
import Timer from './Timer';
export default class Stopwatch implements Timer {
    private _elapsed;
    private _isRunning;
    private _startTimeStamp;
    get elapsed(): TimeSpan;
    get isRunning(): boolean;
    get currentLapMilliseconds(): number;
    get currentLap(): TimeSpan;
    get elapsedMilliseconds(): number;
    static getTimestampMilliseconds(): number;
    static startNew(): Stopwatch;
    static measure(closure: () => void): TimeSpan;
    start(): void;
    stop(): void;
    reset(): void;
    lap(): TimeSpan;
}
