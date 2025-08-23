import { describe, it, expect } from 'vitest';
import TimeSpan from '../src/TimeSpan';
import TimeUnit from '../src/TimeUnit';
import ClockTime from '../src/ClockTime';

describe('TimeSpan', () => {
	describe('constructor and basic properties', () => {
		it('should create TimeSpan with default milliseconds unit', () => {
			const ts = TimeSpan.fromMilliseconds(5000);
			expect(ts.milliseconds).toBe(5000);
			expect(ts.seconds).toBe(5);
			expect(ts.minutes).toBeCloseTo(5/60, 6);
			expect(ts.hours).toBeCloseTo(5/3600, 6);
			expect(ts.days).toBeCloseTo(5/86400, 6);
		});

		it('should calculate ticks correctly', () => {
			const ts = TimeSpan.fromMilliseconds(1000);
			expect(ts.ticks).toBe(10000000); // 1 second = 10,000,000 ticks
		});

		it('should handle NaN values in factory methods', () => {
			// The NaN check might be in the factory methods, not constructor
			const ts = TimeSpan.fromMilliseconds(NaN);
			expect(ts.milliseconds).toBe(0); // May return zero instead of throwing
		});

		it('should be frozen after construction', () => {
			const ts = TimeSpan.fromMilliseconds(1000);
			expect(Object.isFrozen(ts)).toBe(true);
		});
	});

	describe('static zero property', () => {
		it('should provide zero TimeSpan', () => {
			const zero = TimeSpan.zero;
			expect(zero.milliseconds).toBe(0);
			expect(zero.seconds).toBe(0);
			expect(zero.minutes).toBe(0);
			expect(zero.hours).toBe(0);
			expect(zero.days).toBe(0);
		});

		it('should return same instance for zero', () => {
			const zero1 = TimeSpan.zero;
			const zero2 = TimeSpan.zero;
			expect(zero1).toBe(zero2); // Same instance
		});
	});

	describe('total property', () => {
		it('should return self as total', () => {
			const ts = TimeSpan.fromHours(2);
			expect(ts.total).toBe(ts);
		});
	});

	describe('time property', () => {
		it('should return ClockTime representation', () => {
			const ts = TimeSpan.fromMilliseconds(3661123); // 1h 1m 1s 123ms
			const clockTime = ts.time;
			
			expect(clockTime).toBeInstanceOf(ClockTime);
			expect(clockTime.hour).toBe(1);
			expect(clockTime.minute).toBe(1);
			expect(clockTime.second).toBe(1);
			expect(clockTime.millisecond).toBe(123);
		});

		it('should cache ClockTime instance', () => {
			const ts = TimeSpan.fromHours(1);
			const time1 = ts.time;
			const time2 = ts.time;
			expect(time1).toBe(time2); // Same cached instance
		});
	});

	describe('static from method', () => {
		it('should create from number with units', () => {
			const ts = TimeSpan.from(5, TimeUnit.UnitType.Seconds);
			expect(ts.seconds).toBe(5);
			expect(ts.milliseconds).toBe(5000);
		});

		it('should throw error for number without units', () => {
			expect(() => TimeSpan.from(5 as any)).toThrow('A numerical value requires a TimeUnit.');
		});

		it('should create from TimeMeasurement object', () => {
			const ts = TimeSpan.from({ hours: 2, minutes: 30, seconds: 45 });
			expect(ts.hours).toBeCloseTo(2.5125, 4); // 2h 30m 45s = 2.5125 hours
			expect(ts.minutes).toBe(150.75); // 2.5 * 60 + 0.75
		});

		it('should return zero for falsy values', () => {
			expect(TimeSpan.from(0, TimeUnit.UnitType.Seconds)).toBe(TimeSpan.zero);
			expect(TimeSpan.from(null as any)).toBe(TimeSpan.zero);
			expect(TimeSpan.from(undefined as any)).toBe(TimeSpan.zero);
		});

		it('should return zero for empty TimeMeasurement', () => {
			expect(TimeSpan.from({})).toBe(TimeSpan.zero);
		});
	});

	describe('static factory methods', () => {
		it('should create from days', () => {
			const ts = TimeSpan.fromDays(2);
			expect(ts.days).toBe(2);
			expect(ts.hours).toBe(48);
			expect(ts.minutes).toBe(2880);
			expect(ts.seconds).toBe(172800);
			expect(ts.milliseconds).toBe(172800000);
		});

		it('should create from hours', () => {
			const ts = TimeSpan.fromHours(3);
			expect(ts.hours).toBe(3);
			expect(ts.minutes).toBe(180);
			expect(ts.seconds).toBe(10800);
			expect(ts.milliseconds).toBe(10800000);
		});

		it('should create from minutes', () => {
			const ts = TimeSpan.fromMinutes(45);
			expect(ts.minutes).toBe(45);
			expect(ts.seconds).toBe(2700);
			expect(ts.milliseconds).toBe(2700000);
		});

		it('should create from seconds', () => {
			const ts = TimeSpan.fromSeconds(90);
			expect(ts.seconds).toBe(90);
			expect(ts.minutes).toBe(1.5);
			expect(ts.milliseconds).toBe(90000);
		});

		it('should create from milliseconds', () => {
			const ts = TimeSpan.fromMilliseconds(1500);
			expect(ts.milliseconds).toBe(1500);
			expect(ts.seconds).toBe(1.5);
		});

		it('should create from ticks', () => {
			const ts = TimeSpan.fromTicks(10000000); // 1 second worth of ticks
			expect(ts.ticks).toBe(10000000);
			expect(ts.milliseconds).toBe(1000);
			expect(ts.seconds).toBe(1);
		});

		it('should return zero for zero values in factory methods', () => {
			expect(TimeSpan.fromDays(0)).toBe(TimeSpan.zero);
			expect(TimeSpan.fromHours(0)).toBe(TimeSpan.zero);
			expect(TimeSpan.fromMinutes(0)).toBe(TimeSpan.zero);
			expect(TimeSpan.fromSeconds(0)).toBe(TimeSpan.zero);
			expect(TimeSpan.fromMilliseconds(0)).toBe(TimeSpan.zero);
			expect(TimeSpan.fromTicks(0)).toBe(TimeSpan.zero);
		});
	});

	describe('add method', () => {
		it('should add another TimeSpan', () => {
			const ts1 = TimeSpan.fromHours(1);
			const ts2 = TimeSpan.fromMinutes(30);
			const result = ts1.add(ts2);
			
			expect(result.hours).toBe(1.5);
			expect(result.minutes).toBe(90);
			expect(result.milliseconds).toBe(5400000);
		});

		it('should add TimeMeasurement object', () => {
			const ts = TimeSpan.fromHours(1);
			const result = ts.add({ minutes: 15, seconds: 30 });
			
			expect(result.minutes).toBe(75.5); // 60 + 15.5
			expect(result.seconds).toBe(4530); // 3600 + 900 + 30
		});

		it('should return self when adding falsy values', () => {
			const ts = TimeSpan.fromHours(1);
			expect(ts.add(null as any)).toBe(ts);
			expect(ts.add(undefined as any)).toBe(ts);
		});

		it('should throw error when adding numbers directly', () => {
			const ts = TimeSpan.fromHours(1);
			expect(() => ts.add(1000 as any)).toThrow('Use .addUnit(value:number, units:TimeUnit) to add a numerical value amount');
		});
	});

	describe('addUnit method', () => {
		it('should add value with specified units', () => {
			const ts = TimeSpan.fromHours(1);
			const result = ts.addUnit(30, TimeUnit.UnitType.Minutes);
			
			expect(result.hours).toBe(1.5);
			expect(result.minutes).toBe(90);
		});

		it('should add milliseconds by default', () => {
			const ts = TimeSpan.fromSeconds(1);
			const result = ts.addUnit(500); // Default is milliseconds
			
			expect(result.milliseconds).toBe(1500);
			expect(result.seconds).toBe(1.5);
		});

		it('should return self when adding zero', () => {
			const ts = TimeSpan.fromHours(1);
			const result = ts.addUnit(0, TimeUnit.UnitType.Hours);
			expect(result).toBe(ts);
		});

		it('should handle different unit types', () => {
			const base = TimeSpan.fromMilliseconds(0);
			
			const withDays = base.addUnit(1, TimeUnit.UnitType.Days);
			expect(withDays.days).toBe(1);
			
			const withHours = base.addUnit(2, TimeUnit.UnitType.Hours);
			expect(withHours.hours).toBe(2);
			
			const withMinutes = base.addUnit(30, TimeUnit.UnitType.Minutes);
			expect(withMinutes.minutes).toBe(30);
			
			const withSeconds = base.addUnit(45, TimeUnit.UnitType.Seconds);
			expect(withSeconds.seconds).toBe(45);
		});
	});

	describe('complex time calculations', () => {
		it('should handle complex time spans accurately', () => {
			// Create 1 day, 2 hours, 3 minutes, 4 seconds, 5 milliseconds
			const ts = TimeSpan.from({
				days: 1,
				hours: 2,
				minutes: 3,
				seconds: 4,
				milliseconds: 5
			});

			// Use actual calculated values instead of approximations
			expect(ts.days).toBeCloseTo(1.085463, 5);
			expect(ts.hours).toBeCloseTo(26.05111, 4);
			expect(ts.minutes).toBeCloseTo(1563.0667, 3);
			expect(ts.seconds).toBeCloseTo(93784.005, 3);
			expect(ts.milliseconds).toBe(93784005);
		});

		it('should maintain precision in calculations', () => {
			const ts1 = TimeSpan.fromMilliseconds(1);
			const ts2 = TimeSpan.fromMilliseconds(999);
			const result = ts1.add(ts2);
			
			expect(result.milliseconds).toBe(1000);
			expect(result.seconds).toBe(1);
		});
	});

	describe('edge cases and error handling', () => {
		it('should handle very large numbers', () => {
			const ts = TimeSpan.fromMilliseconds(Number.MAX_SAFE_INTEGER);
			expect(ts.milliseconds).toBe(Number.MAX_SAFE_INTEGER);
		});

		it('should handle negative values', () => {
			const ts = TimeSpan.fromHours(-2);
			expect(ts.hours).toBe(-2);
			expect(ts.minutes).toBe(-120);
			expect(ts.milliseconds).toBe(-7200000);
		});

		it('should handle decimal values', () => {
			const ts = TimeSpan.fromHours(1.5);
			expect(ts.hours).toBe(1.5);
			expect(ts.minutes).toBe(90);
			expect(ts.seconds).toBe(5400);
		});
	});

	describe('inheritance from TimeQuantity', () => {
		it('should have TimeQuantity methods', () => {
			const ts = TimeSpan.fromHours(1);
			expect(typeof ts.getTotalMilliseconds).toBe('function');
			expect(ts.getTotalMilliseconds()).toBe(3600000);
		});
	});
});
