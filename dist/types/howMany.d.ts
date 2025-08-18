import * as howMany from './howManyConstEnums';
export declare namespace hours {
    const per: Readonly<{
        day: howMany.hours.per;
    }>;
}
export declare namespace minutes {
    const per: Readonly<{
        hour: howMany.minutes.per.hour;
        day: howMany.minutes.per.day;
    }>;
}
export declare namespace seconds {
    const per: Readonly<{
        minute: howMany.seconds.per.minute;
        hour: howMany.seconds.per.hour;
        day: howMany.seconds.per.day;
    }>;
}
export declare namespace milliseconds {
    const per: Readonly<{
        second: howMany.milliseconds.per.second;
        minute: howMany.milliseconds.per.minute;
        hour: howMany.milliseconds.per.hour;
        day: howMany.milliseconds.per.day;
    }>;
}
export declare namespace ticks {
    const per: Readonly<{
        millisecond: howMany.ticks.per.millisecond;
        second: howMany.ticks.per.second;
        minute: howMany.ticks.per.minute;
        hour: howMany.ticks.per.hour;
        day: howMany.ticks.per.day;
    }>;
}
