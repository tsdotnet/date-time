/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
export var hours;
(function (hours) {
    let per;
    (function (per) {
        per[per["day"] = 24] = "day";
    })(per = hours.per || (hours.per = {}));
})(hours || (hours = {}));
export var minutes;
(function (minutes) {
    let per;
    (function (per) {
        per[per["hour"] = 60] = "hour";
        per[per["day"] = 1440] = "day";
    })(per = minutes.per || (minutes.per = {}));
})(minutes || (minutes = {}));
export var seconds;
(function (seconds) {
    let per;
    (function (per) {
        per[per["minute"] = 60] = "minute";
        per[per["hour"] = 3600] = "hour";
        per[per["day"] = 86400] = "day";
    })(per = seconds.per || (seconds.per = {}));
})(seconds || (seconds = {}));
export var milliseconds;
(function (milliseconds) {
    let per;
    (function (per) {
        per[per["second"] = 1000] = "second";
        per[per["minute"] = 60000] = "minute";
        per[per["hour"] = 3600000] = "hour";
        per[per["day"] = 86400000] = "day";
    })(per = milliseconds.per || (milliseconds.per = {}));
})(milliseconds || (milliseconds = {}));
export var ticks;
(function (ticks) {
    let per;
    (function (per) {
        per[per["millisecond"] = 10000] = "millisecond";
        per[per["second"] = 10000000] = "second";
        per[per["minute"] = 600000000] = "minute";
        per[per["hour"] = 36000000000] = "hour";
        per[per["day"] = 864000000000] = "day";
    })(per = ticks.per || (ticks.per = {}));
})(ticks || (ticks = {}));
//# sourceMappingURL=howMany.js.map