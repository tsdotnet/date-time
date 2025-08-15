/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
export declare namespace hours {
    const enum per {
        day = 24
    }
}
export declare namespace minutes {
    const enum per {
        hour = 60,
        day = 1440
    }
}
export declare namespace seconds {
    const enum per {
        minute = 60,
        hour = 3600,
        day = 86400
    }
}
export declare namespace milliseconds {
    const enum per {
        second = 1000,
        minute = 60000,
        hour = 3600000,
        day = 86400000
    }
}
export declare namespace ticks {
    const enum per {
        millisecond = 10000,
        second = 10000000,
        minute = 600000000,
        hour = 36000000000,
        day = 864000000000
    }
}
