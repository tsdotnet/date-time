var hours;
(function (hours) {
    hours.per = Object.freeze({
        day: 24
    });
})(hours || (hours = {}));
Object.freeze(hours.per);
var minutes;
(function (minutes) {
    minutes.per = Object.freeze({
        hour: 60,
        day: 1440
    });
})(minutes || (minutes = {}));
Object.freeze(minutes.per);
var seconds;
(function (seconds) {
    seconds.per = Object.freeze({
        minute: 60,
        hour: 3600,
        day: 86400
    });
})(seconds || (seconds = {}));
Object.freeze(seconds.per);
var milliseconds;
(function (milliseconds) {
    milliseconds.per = Object.freeze({
        second: 1000,
        minute: 60000,
        hour: 3600000,
        day: 86400000
    });
})(milliseconds || (milliseconds = {}));
Object.freeze(milliseconds.per);
var ticks;
(function (ticks) {
    ticks.per = Object.freeze({
        millisecond: 10000,
        second: 10000000,
        minute: 600000000,
        hour: 36000000000,
        day: 864000000000
    });
})(ticks || (ticks = {}));
Object.freeze(ticks.per);

export { hours, milliseconds, minutes, seconds, ticks };
//# sourceMappingURL=howMany.js.map
