"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TimeSpan_1 = tslib_1.__importDefault(require("./TimeSpan"));
class Stopwatch {
    constructor() {
        this._elapsed = 0;
        this._isRunning = false;
        this._startTimeStamp = NaN;
    }
    get elapsed() {
        return new TimeSpan_1.default(this.elapsedMilliseconds);
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
            ? new TimeSpan_1.default(this.currentLapMilliseconds)
            : TimeSpan_1.default.zero;
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
        return new TimeSpan_1.default(Date.now() - start);
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
            return new TimeSpan_1.default(e);
        }
        else
            return TimeSpan_1.default.zero;
    }
}
exports.default = Stopwatch;
//# sourceMappingURL=Stopwatch.js.map