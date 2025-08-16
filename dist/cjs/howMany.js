"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticks = exports.milliseconds = exports.seconds = exports.minutes = exports.hours = void 0;
var hours;
(function (hours) {
    let per;
    (function (per) {
        per[per["day"] = 24] = "day";
    })(per = hours.per || (hours.per = {}));
})(hours || (exports.hours = hours = {}));
var minutes;
(function (minutes) {
    let per;
    (function (per) {
        per[per["hour"] = 60] = "hour";
        per[per["day"] = 1440] = "day";
    })(per = minutes.per || (minutes.per = {}));
})(minutes || (exports.minutes = minutes = {}));
var seconds;
(function (seconds) {
    let per;
    (function (per) {
        per[per["minute"] = 60] = "minute";
        per[per["hour"] = 3600] = "hour";
        per[per["day"] = 86400] = "day";
    })(per = seconds.per || (seconds.per = {}));
})(seconds || (exports.seconds = seconds = {}));
var milliseconds;
(function (milliseconds) {
    let per;
    (function (per) {
        per[per["second"] = 1000] = "second";
        per[per["minute"] = 60000] = "minute";
        per[per["hour"] = 3600000] = "hour";
        per[per["day"] = 86400000] = "day";
    })(per = milliseconds.per || (milliseconds.per = {}));
})(milliseconds || (exports.milliseconds = milliseconds = {}));
var ticks;
(function (ticks) {
    let per;
    (function (per) {
        per[per["millisecond"] = 10000] = "millisecond";
        per[per["second"] = 10000000] = "second";
        per[per["minute"] = 600000000] = "minute";
        per[per["hour"] = 36000000000] = "hour";
        per[per["day"] = 864000000000] = "day";
    })(per = ticks.per || (ticks.per = {}));
})(ticks || (exports.ticks = ticks = {}));
//# sourceMappingURL=howMany.js.map