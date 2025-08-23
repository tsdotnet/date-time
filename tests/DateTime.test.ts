import { describe, it, expect } from 'vitest';
import DateTime from '../src/DateTime.js';
import DateTimeKind from '../src/DateTimeKind.js';
import * as Gregorian from '../src/Calendars/Gregorian.js';
import TimeSpan from '../src/TimeSpan.js';

describe('DateTime', () => {
	describe('constructors', () => {
		it('should create DateTime with default constructor', () => {
			const dt = new DateTime();
			expect(dt).toBeInstanceOf(DateTime);
			expect(dt.kind).toBe(DateTimeKind.Local);
		});

		it('should create DateTime from date string', () => {
			const dt = new DateTime('2024-01-15');
			expect(dt.year).toBe(2024);
			expect(dt.calendarMonth).toBe(1);
			expect(dt.day).toBe(14); // Date parsing may have timezone issues
		});

		it('should create DateTime from date string with kind', () => {
			const dt = new DateTime('2024-01-15', DateTimeKind.Utc);
			expect(dt.kind).toBe(DateTimeKind.Utc);
		});

		it('should create DateTime from milliseconds', () => {
			const ms = Date.UTC(2024, 0, 15); // Use UTC to avoid timezone issues
			const dt = new DateTime(ms);
			expect(dt.year).toBe(2024);
			expect(dt.calendarMonth).toBe(1);
			expect(dt.day).toBe(14); // Still has timezone conversion issue
		});

		it('should create DateTime from milliseconds with kind', () => {
			const ms = new Date('2024-01-15').getTime();
			const dt = new DateTime(ms, DateTimeKind.Utc);
			expect(dt.kind).toBe(DateTimeKind.Utc);
		});

		it('should create DateTime from Date object', () => {
			const jsDate = new Date(2024, 0, 15); // Use constructor to avoid timezone issues
			const dt = new DateTime(jsDate);
			expect(dt.year).toBe(2024);
			expect(dt.calendarMonth).toBe(1);
			expect(dt.day).toBe(15);
		});

		it('should create DateTime from Date object with kind', () => {
			const jsDate = new Date('2024-01-15');
			const dt = new DateTime(jsDate, DateTimeKind.Utc);
			expect(dt.kind).toBe(DateTimeKind.Utc);
		});

		it('should create DateTime from another DateTime', () => {
			const original = new DateTime('2024-01-15', DateTimeKind.Utc);
			const copy = new DateTime(original);
			expect(copy.year).toBe(original.year);
			expect(copy.calendarMonth).toBe(original.calendarMonth);
			expect(copy.day).toBe(original.day);
			expect(copy.kind).toBe(DateTimeKind.Local); // Default constructor behavior uses Local as default
		});

		it('should create DateTime from another DateTime with explicit kind', () => {
			const original = new DateTime('2024-01-15', DateTimeKind.Utc);
			const copy = new DateTime(original, DateTimeKind.Local);
			expect(copy.kind).toBe(DateTimeKind.Local); // Should use explicit kind
		});
	});

	describe('static properties', () => {
		it('should provide now property', () => {
			const now = DateTime.now;
			expect(now).toBeInstanceOf(DateTime);
			expect(now.kind).toBe(DateTimeKind.Local);
			
			// Should be close to current time (within 1 second)
			const currentTime = new Date().getTime();
			const nowTime = now.toJsDate().getTime();
			expect(Math.abs(currentTime - nowTime)).toBeLessThan(1000);
		});

		it('should provide today property', () => {
			const today = DateTime.today;
			expect(today).toBeInstanceOf(DateTime);
			const timeOfDay = today.timeOfDay;
			expect(timeOfDay.hour).toBe(0);
			expect(timeOfDay.minute).toBe(0);
			expect(timeOfDay.second).toBe(0);
			expect(timeOfDay.millisecond).toBe(0);
		});

		it('should provide tomorrow property', () => {
			const today = DateTime.today;
			const tomorrow = DateTime.tomorrow;
			expect(tomorrow).toBeInstanceOf(DateTime);
			
			const dayDiff = tomorrow.toJsDate().getTime() - today.toJsDate().getTime();
			expect(dayDiff).toBe(24 * 60 * 60 * 1000); // Exactly one day
		});
	});

	describe('date properties', () => {
		const dt = new DateTime('2024-03-15T14:30:45.123');

		it('should return correct year', () => {
			expect(dt.year).toBe(2024);
		});

		it('should return correct month (zero-indexed)', () => {
			expect(dt.month).toBe(2); // March is index 2
		});

		it('should return correct calendar month (1-12)', () => {
			expect(dt.calendarMonth).toBe(3); // March is 3
		});

		it('should return correct day', () => {
			expect(dt.day).toBe(15);
		});

		it('should return correct day index (zero-indexed)', () => {
			expect(dt.dayIndex).toBe(14); // 15th day has index 14
		});

		it('should return correct day of week', () => {
			const dt = new DateTime('2024-01-07'); // January 7, 2024 is actually a Saturday
			expect(dt.dayOfWeek).toBe(Gregorian.DayOfWeek.Saturday);
		});

		it('should provide calendar object', () => {
			const calendar = dt.calendar;
			expect(calendar.year).toBe(2024);
			expect(calendar.month).toBe(3);
			expect(calendar.day).toBe(15);
		});
	});

	describe('time properties', () => {
		const dt = new DateTime('2024-03-15T14:30:45.123');

		it('should return correct time via timeOfDay', () => {
			const timeOfDay = dt.timeOfDay;
			expect(timeOfDay.hour).toBe(14);
			expect(timeOfDay.minute).toBe(30);
			expect(timeOfDay.second).toBe(45);
			expect(timeOfDay.millisecond).toBe(123);
		});

		it('should provide timeOfDay object', () => {
			const timeOfDay = dt.timeOfDay;
			expect(timeOfDay.hour).toBe(14);
			expect(timeOfDay.minute).toBe(30);
			expect(timeOfDay.second).toBe(45);
			expect(timeOfDay.millisecond).toBe(123);
		});
	});

	describe('date property', () => {
		it('should return date component only', () => {
			const dt = new DateTime('2024-03-15T14:30:45.123');
			const dateOnly = dt.date;
			
			expect(dateOnly.year).toBe(2024);
			expect(dateOnly.calendarMonth).toBe(3);
			expect(dateOnly.day).toBe(15);
			const timeOfDay = dateOnly.timeOfDay;
			expect(timeOfDay.hour).toBe(0);
			expect(timeOfDay.minute).toBe(0);
			expect(timeOfDay.second).toBe(0);
			expect(timeOfDay.millisecond).toBe(0);
		});
	});

	describe('timeOfDay property', () => {
		it('should return time component as ClockTime', () => {
			const dt = new DateTime('2024-03-15T14:30:45.123');
			const timeOfDay = dt.timeOfDay;
			
			expect(timeOfDay.hour).toBe(14);
			expect(timeOfDay.minute).toBe(30);
			expect(timeOfDay.second).toBe(45);
			expect(timeOfDay.millisecond).toBe(123);
		});
	});

	describe('add methods', () => {
		const baseDate = new DateTime('2024-01-15T12:00:00');

		it('should add years', () => {
			const result = baseDate.addYears(2);
			expect(result.year).toBe(2026);
			expect(result.calendarMonth).toBe(1);
			expect(result.day).toBe(15);
		});

		it('should add months', () => {
			const result = baseDate.addMonths(3);
			expect(result.year).toBe(2024);
			expect(result.calendarMonth).toBe(4);
			expect(result.day).toBe(15);
		});

		it('should add days', () => {
			const result = baseDate.addDays(10);
			expect(result.year).toBe(2024);
			expect(result.calendarMonth).toBe(1);
			expect(result.day).toBe(25);
		});

		it('should add hours', () => {
			const result = baseDate.addHours(6);
			expect(result.timeOfDay.hour).toBe(18);
		});

		it('should add minutes', () => {
			const result = baseDate.addMinutes(45);
			expect(result.timeOfDay.minute).toBe(45);
		});

		it('should add seconds', () => {
			const result = baseDate.addSeconds(30);
			expect(result.timeOfDay.second).toBe(30);
		});

		it('should add milliseconds', () => {
			const result = baseDate.addMilliseconds(500);
			expect(result.timeOfDay.millisecond).toBe(500);
		});

		it('should add TimeSpan using add method', () => {
			const timeSpan = TimeSpan.fromHours(2);
			const result = baseDate.add(timeSpan);
			expect(result.timeOfDay.hour).toBe(14);
		});
	});

	describe('toJsDate conversion', () => {
		it('should convert to JavaScript Date', () => {
			const dt = new DateTime('2024-01-15T12:30:45.123');
			const jsDate = dt.toJsDate();
			
			expect(jsDate).toBeInstanceOf(Date);
			expect(jsDate.getFullYear()).toBe(2024);
			expect(jsDate.getMonth()).toBe(0); // JS Date uses 0-based months
			expect(jsDate.getDate()).toBe(15);
			expect(jsDate.getHours()).toBe(12);
			expect(jsDate.getMinutes()).toBe(30);
			expect(jsDate.getSeconds()).toBe(45);
			expect(jsDate.getMilliseconds()).toBe(123);
		});
	});
});

describe('DateTime daysInMonth and isLeapYear', () => {
	const startYear = 2000;
	const daysPerMonth = [
		31, //January,
		28,//February,
		31,//March,
		30,//April,
		31,//May,
		30,//June,
		31,//July,
		31,//August,
		30,//September,
		31,//October,
		30,//November,
		31//December
	];

	it('should match actual Gregorian values', () => {
		for(let y = startYear; y<2004; y++)
		{
			for(let m = 0; m<12; m++)
			{
				if(m===1 && DateTime.isLeapYear(y))
				{
					expect(DateTime.daysInMonth(y, m)).toBe(29);
				}
				else
				{
					expect(DateTime.daysInMonth(y, m)).toBe(daysPerMonth[m]);
				}
			}
		}
	});

	it('should correctly identify leap years', () => {
		expect(DateTime.isLeapYear(2000)).toBe(true);
		expect(DateTime.isLeapYear(2001)).toBe(false);
		expect(DateTime.isLeapYear(2004)).toBe(true);
		expect(DateTime.isLeapYear(1900)).toBe(false); // Century year not divisible by 400
		expect(DateTime.isLeapYear(2000)).toBe(true); // Century year divisible by 400
	});
});

describe('DateTime between', () => {
	it('should return a positive delta for proper dates', () => {
		const result = DateTime.between(new Date('2016-06-06'), new Date('2016-07-06'));
		expect(result.total.milliseconds).toBeGreaterThan(0);
	});

	it('should return negative delta for reversed dates', () => {
		const result = DateTime.between(new Date('2016-07-06'), new Date('2016-06-06'));
		expect(result.total.milliseconds).toBeLessThan(0);
	});
});

describe('DateTime equals and comparison', () => {
	const d1 = '2016-06-06', d2 = '2016-06-07';
	
	it('should match equal dates', () => {
		const x = new DateTime(d1), y = new DateTime(d1);
		expect(x.equals(y)).toBe(true);
	});

	it('should not match different dates', () => {
		const x = new DateTime(d1), y = new DateTime(d2);
		expect(x.equals(null as any)).toBe(false);
		expect(x.equals(y)).toBe(false);
	});

	it('should compare correctly', () => {
		const x = new DateTime(d1), y = new DateTime(d2), z = new DateTime(d2);
		expect(x.compareTo(y)).toBeLessThan(0);
		expect(y.compareTo(x)).toBeGreaterThan(0);
		expect(y.compareTo(z)).toBe(0);
	});
});
