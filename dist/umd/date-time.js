/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./ClockTime", "./DateTime", "./howMany", "./TimeQuantity", "./TimeSpan", "./TimeStamp", "./TimeUnit", "./TimeUnitValue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeUnitValue = exports.TimeUnit = exports.TimeStamp = exports.TimeSpan = exports.TimeQuantity = exports.howMany = exports.DateTime = exports.ClockTime = void 0;
    const tslib_1 = require("tslib");
    const ClockTime_1 = tslib_1.__importDefault(require("./ClockTime"));
    exports.ClockTime = ClockTime_1.default;
    const DateTime_1 = tslib_1.__importDefault(require("./DateTime"));
    exports.DateTime = DateTime_1.default;
    const howMany = tslib_1.__importStar(require("./howMany"));
    exports.howMany = howMany;
    const TimeQuantity_1 = tslib_1.__importDefault(require("./TimeQuantity"));
    exports.TimeQuantity = TimeQuantity_1.default;
    const TimeSpan_1 = tslib_1.__importDefault(require("./TimeSpan"));
    exports.TimeSpan = TimeSpan_1.default;
    const TimeStamp_1 = tslib_1.__importDefault(require("./TimeStamp"));
    exports.TimeStamp = TimeStamp_1.default;
    const TimeUnit_1 = tslib_1.__importDefault(require("./TimeUnit"));
    exports.TimeUnit = TimeUnit_1.default;
    const TimeUnitValue_1 = tslib_1.__importDefault(require("./TimeUnitValue"));
    exports.TimeUnitValue = TimeUnitValue_1.default;
});
//# sourceMappingURL=date-time.js.map