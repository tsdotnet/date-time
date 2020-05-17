/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */
import TimeSpan from './TimeSpan';
export default class Stopwatch {
    constructor() {
        this._startTimeStamp = NaN;
        this._elapsed = 0;
        this._isRunning = false;
    }
    get elapsed() {
        return TimeSpan.fromMilliseconds(this.elapsedMilliseconds);
    }
    get isRunning() {
        return this._isRunning;
    }
    get currentLapMilliseconds() {
        return this._isRunning
            ? (Date.now() - this._startTimeStamp)
            : 0;
    }
    get currentLap() {
        return this._isRunning
            ? TimeSpan.fromMilliseconds(this.currentLapMilliseconds)
            : TimeSpan.zero;
    }
    get elapsedMilliseconds() {
        const _ = this;
        let timeElapsed = _._elapsed;
        if (_._isRunning)
            timeElapsed += _.currentLapMilliseconds;
        return timeElapsed;
    }
    static getTimestampMilliseconds() {
        return Date.now();
    }
    static startNew() {
        const s = new Stopwatch();
        s.start();
        return s;
    }
    // Effectively calls a stop start and continues timing...
    static measure(closure) {
        const start = Date.now();
        closure();
        return TimeSpan.fromMilliseconds(Date.now() - start);
    }
    start() {
        const _ = this;
        if (!_._isRunning) {
            _._startTimeStamp = Date.now();
            _._isRunning = true;
        }
    }
    stop() {
        const _ = this;
        if (_._isRunning) {
            _._elapsed += _.currentLapMilliseconds;
            _._isRunning = false;
        }
    }
    reset() {
        const _ = this;
        _._elapsed = 0;
        _._isRunning = false;
        _._startTimeStamp = NaN;
    }
    // Can also be called to effectively start a lap before calling it again to get the elapsed lap time.
    lap() {
        const _ = this;
        if (_._isRunning) {
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
//# sourceMappingURL=Stopwatch.js.map