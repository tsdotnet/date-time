import { describe, it, expect } from 'vitest';
import TimeStamp from '../src/TimeStamp';

describe('TimeStamp', () => {
	describe('constructor', () => {
		it('should create TimeStamp with all parameters', () => {
			const ts = new TimeStamp(2023, 5, 15, 14, 30, 45, 500, 1234);
			expect(ts.year).toBe(2023);
			expect(ts.month).toBe(5);
			expect(ts.day).toBe(15);
			expect(ts.hour).toBe(14);
			expect(ts.minute).toBe(30);
			expect(ts.second).toBe(45);
			expect(ts.millisecond).toBe(500);
			expect(ts.tick).toBe(1234);
		});

		it('should create TimeStamp with default parameters', () => {
			const ts = new TimeStamp(2023, 11);
			expect(ts.year).toBe(2023);
			expect(ts.month).toBe(11);
			expect(ts.day).toBe(1);
			expect(ts.hour).toBe(0);
			expect(ts.minute).toBe(0);
			expect(ts.second).toBe(0);
			expect(ts.millisecond).toBe(0);
			expect(ts.tick).toBe(0);
		});

		it('should create TimeStamp with partial parameters', () => {
			const ts = new TimeStamp(2023, 2, 28, 23, 59);
			expect(ts.year).toBe(2023);
			expect(ts.month).toBe(2);
			expect(ts.day).toBe(28);
			expect(ts.hour).toBe(23);
			expect(ts.minute).toBe(59);
			expect(ts.second).toBe(0);
			expect(ts.millisecond).toBe(0);
			expect(ts.tick).toBe(0);
		});

		it('should freeze the TimeStamp instance', () => {
			const ts = new TimeStamp(2023, 0 as any);
			expect(Object.isFrozen(ts)).toBe(true);
		});
	});

	describe('from', () => {
		it('should create TimeStamp from Date object', () => {
			const date = new Date(2023, 5, 15, 14, 30, 45, 500);
			const ts = TimeStamp.from(date);
			
			expect(ts.year).toBe(2023);
			expect(ts.month).toBe(5);
			expect(ts.day).toBe(15);
			expect(ts.hour).toBe(14);
			expect(ts.minute).toBe(30);
			expect(ts.second).toBe(45);
			expect(ts.millisecond).toBe(500);
			expect(ts.tick).toBe(0);
		});

		it('should create TimeStamp from JsDateConvertible object', () => {
			const dateConvertible = {
				toJsDate: () => new Date(2023, 11, 25, 12, 0, 0, 0)
			};
			const ts = TimeStamp.from(dateConvertible);
			
			expect(ts.year).toBe(2023);
			expect(ts.month).toBe(11);
			expect(ts.day).toBe(25);
			expect(ts.hour).toBe(12);
			expect(ts.minute).toBe(0);
			expect(ts.second).toBe(0);
			expect(ts.millisecond).toBe(0);
		});

		it('should create TimeStamp from another TimeStamp', () => {
			const originalTs = new TimeStamp(2023, 0 as any, 1, 0, 0, 0, 0, 5000);
			const ts = TimeStamp.from(originalTs);
			
			expect(ts.year).toBe(2023);
			expect(ts.month).toBe(0);
			expect(ts.day).toBe(1);
			expect(ts.hour).toBe(0);
			expect(ts.minute).toBe(0);
			expect(ts.second).toBe(0);
			expect(ts.millisecond).toBe(0);
		});

		it('should throw error for invalid date type', () => {
			expect(() => TimeStamp.from('invalid' as any)).toThrow('Invalid date type.');
			expect(() => TimeStamp.from(123 as any)).toThrow('Invalid date type.');
			expect(() => TimeStamp.from(null as any)).toThrow('Invalid date type.');
		});

		it('should handle edge case dates', () => {
			const leapYearDate = new Date(2020, 1, 29, 23, 59, 59, 999);
			const ts = TimeStamp.from(leapYearDate);
			
			expect(ts.year).toBe(2020);
			expect(ts.month).toBe(1);
			expect(ts.day).toBe(29);
			expect(ts.hour).toBe(23);
			expect(ts.minute).toBe(59);
			expect(ts.second).toBe(59);
			expect(ts.millisecond).toBe(999);
		});
	});

	describe('now', () => {
		it('should create TimeStamp representing current time', () => {
			const before = Date.now();
			const ts = TimeStamp.now();
			const after = Date.now();
			
			const tsTime = ts.toJsDate().getTime();
			expect(tsTime).toBeGreaterThanOrEqual(before);
			expect(tsTime).toBeLessThanOrEqual(after);
		});

		it('should create different timestamps when called multiple times', () => {
			const ts1 = TimeStamp.now();
			// Small delay to ensure different timestamps
			const start = Date.now();
			while (Date.now() - start < 1) { /* wait */ }
			const ts2 = TimeStamp.now();
			
			const time1 = ts1.toJsDate().getTime();
			const time2 = ts2.toJsDate().getTime();
			expect(time2).toBeGreaterThanOrEqual(time1);
		});
	});

	describe('toJsDate', () => {
		it('should convert TimeStamp to Date object', () => {
			const ts = new TimeStamp(2023, 5, 15, 14, 30, 45, 500);
			const date = ts.toJsDate();
			
			expect(date).toBeInstanceOf(Date);
			expect(date.getFullYear()).toBe(2023);
			expect(date.getMonth()).toBe(5);
			expect(date.getDate()).toBe(15);
			expect(date.getHours()).toBe(14);
			expect(date.getMinutes()).toBe(30);
			expect(date.getSeconds()).toBe(45);
			expect(date.getMilliseconds()).toBe(500);
		});

		it('should handle ticks in conversion', () => {
			const ts = new TimeStamp(2023, 0 as any, 1, 0, 0, 0, 0, 5000); // 5000 ticks = 0.5 milliseconds
			const date = ts.toJsDate();
			
			expect(date.getFullYear()).toBe(2023);
			expect(date.getMonth()).toBe(0);
			expect(date.getDate()).toBe(1);
			expect(date.getMilliseconds()).toBe(0); // Should be 0.5ms but Date only handles whole milliseconds
		});

		it('should handle ticks adding to milliseconds', () => {
			const ts = new TimeStamp(2023, 0 as any, 1, 0, 0, 0, 100, 9000); // 100ms + 9000 ticks (0.9ms) = 100.9ms
			const date = ts.toJsDate();
			
			expect(date.getMilliseconds()).toBe(100); // Date truncates fractional milliseconds
		});

		it('should roundtrip through Date conversion', () => {
			const originalDate = new Date(2023, 8, 20, 16, 45, 30, 750);
			const ts = TimeStamp.from(originalDate);
			const convertedDate = ts.toJsDate();
			
			expect(convertedDate.getTime()).toBe(originalDate.getTime());
		});

		it('should handle minimum and maximum date values', () => {
			const minTs = new TimeStamp(1970, 0 as any, 1, 0, 0, 0, 0);
			const minDate = minTs.toJsDate();
			expect(minDate.getFullYear()).toBe(1970);
			
			const maxTs = new TimeStamp(2099, 11 as any, 31, 23, 59, 59, 999);
			const maxDate = maxTs.toJsDate();
			expect(maxDate.getFullYear()).toBe(2099);
			expect(maxDate.getMonth()).toBe(11);
			expect(maxDate.getDate()).toBe(31);
		});
	});
});
