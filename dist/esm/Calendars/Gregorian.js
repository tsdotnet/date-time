/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
var Month;
(function (Month) {
    Month[Month["January"] = 1] = "January";
    Month[Month["February"] = 2] = "February";
    Month[Month["March"] = 3] = "March";
    Month[Month["April"] = 4] = "April";
    Month[Month["May"] = 5] = "May";
    Month[Month["June"] = 6] = "June";
    Month[Month["July"] = 7] = "July";
    Month[Month["August"] = 8] = "August";
    Month[Month["September"] = 9] = "September";
    Month[Month["October"] = 10] = "October";
    Month[Month["November"] = 11] = "November";
    Month[Month["December"] = 12] = "December";
})(Month || (Month = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek || (DayOfWeek = {}));

export { DayOfWeek, Month };
//# sourceMappingURL=Gregorian.js.map
