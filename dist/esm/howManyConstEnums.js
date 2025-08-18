/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
var hours;
(function (hours) {
    (function (per) {
        per[per["day"] = 24] = "day";
    })(hours.per || (hours.per = {}));
})(hours || (hours = {}));
var minutes;
(function (minutes) {
    (function (per) {
        per[per["hour"] = 60] = "hour";
        per[per["day"] = 1440] = "day";
    })(minutes.per || (minutes.per = {}));
})(minutes || (minutes = {}));
var seconds;
(function (seconds) {
    (function (per) {
        per[per["minute"] = 60] = "minute";
        per[per["hour"] = 3600] = "hour";
        per[per["day"] = 86400] = "day";
    })(seconds.per || (seconds.per = {}));
})(seconds || (seconds = {}));
var milliseconds;
(function (milliseconds) {
    (function (per) {
        per[per["second"] = 1000] = "second";
        per[per["minute"] = 60000] = "minute";
        per[per["hour"] = 3600000] = "hour";
        per[per["day"] = 86400000] = "day";
    })(milliseconds.per || (milliseconds.per = {}));
})(milliseconds || (milliseconds = {}));
var ticks;
(function (ticks) {
    (function (per) {
        per[per["millisecond"] = 10000] = "millisecond";
        per[per["second"] = 10000000] = "second";
        per[per["minute"] = 600000000] = "minute";
        per[per["hour"] = 36000000000] = "hour";
        per[per["day"] = 864000000000] = "day";
    })(ticks.per || (ticks.per = {}));
})(ticks || (ticks = {}));

export { hours, milliseconds, minutes, seconds, ticks };
//# sourceMappingURL=howManyConstEnums.js.map
