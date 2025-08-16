/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import { expect } from 'chai';
import { howMany } from '../dist/cjs/date-time';
import * as fs from 'fs';
import * as path from 'path';

describe('howMany (dist integration)', () => {
	describe('dist folder import', () => {
		it('should successfully import howMany from dist folder', () => {
			// This test specifically verifies that the howMany module can be imported
			// from the dist folder, which was the original issue reported in GitHub issue #1
			expect(howMany).to.be.an('object');
			expect(howMany.ticks).to.be.an('object');
			expect(howMany.milliseconds).to.be.an('object');
			expect(howMany.seconds).to.be.an('object');
			expect(howMany.minutes).to.be.an('object');
			expect(howMany.hours).to.be.an('object');
		});

		it('should have correct const enum values from dist', () => {
			// Verify that all const enum values are correctly inlined and accessible
			// from the compiled distribution
			
			// ticks.per values
			expect(howMany.ticks.per.millisecond).to.equal(10000);
			expect(howMany.ticks.per.second).to.equal(10000000);
			expect(howMany.ticks.per.minute).to.equal(600000000);
			expect(howMany.ticks.per.hour).to.equal(36000000000);
			expect(howMany.ticks.per.day).to.equal(864000000000);

			// milliseconds.per values
			expect(howMany.milliseconds.per.second).to.equal(1000);
			expect(howMany.milliseconds.per.minute).to.equal(60000);
			expect(howMany.milliseconds.per.hour).to.equal(3600000);
			expect(howMany.milliseconds.per.day).to.equal(86400000);

			// seconds.per values
			expect(howMany.seconds.per.minute).to.equal(60);
			expect(howMany.seconds.per.hour).to.equal(3600);
			expect(howMany.seconds.per.day).to.equal(86400);

			// minutes.per values
			expect(howMany.minutes.per.hour).to.equal(60);
			expect(howMany.minutes.per.day).to.equal(1440);

			// hours.per values
			expect(howMany.hours.per.day).to.equal(24);
		});

		it('should work in calculations from dist', () => {
			// Test that the const enum values work correctly in calculations
			// when imported from the compiled distribution
			
			// Calculate milliseconds in a day: 24 hours * 60 minutes/hour * 60 seconds/minute * 1000 ms/second
			const millisecondsInDay = howMany.hours.per.day * 
				howMany.minutes.per.hour * 
				howMany.seconds.per.minute * 
				howMany.milliseconds.per.second;
			expect(millisecondsInDay).to.equal(86400000);
			
			// Calculate ticks in an hour: 60 minutes * 60 seconds * 10,000,000 ticks/second
			const ticksInHour = howMany.minutes.per.hour * 
				howMany.seconds.per.minute * 
				howMany.ticks.per.second;
			expect(ticksInHour).to.equal(36000000000);
			
			// Calculate seconds in a week: 7 days * 24 hours * 60 minutes * 60 seconds
			const secondsInWeek = 7 * 
				howMany.hours.per.day * 
				howMany.minutes.per.hour * 
				howMany.seconds.per.minute;
			expect(secondsInWeek).to.equal(604800);

			// Verify relationships between different time units work correctly
			const oneMinuteInTicks = howMany.ticks.per.minute;
			const oneMinuteInMs = howMany.milliseconds.per.minute;
			const oneMinuteInSeconds = howMany.seconds.per.minute;

			expect(oneMinuteInTicks / howMany.ticks.per.millisecond).to.equal(oneMinuteInMs);
			expect(oneMinuteInMs / howMany.milliseconds.per.second).to.equal(oneMinuteInSeconds);
			expect(oneMinuteInSeconds / howMany.seconds.per.minute).to.equal(1);
		});
	});

	describe('regression test for GitHub issue #1', () => {
		it('should not throw "Cannot resolve module" error when importing from dist', async () => {
			// This test specifically addresses GitHub issue #1:
			// "Cannot resolve module './howMany' from 'dist/date-time.js'"
			// 
			// The issue was that howMany.d.ts existed but howMany.js did not,
			// causing runtime import failures. This test ensures that both files exist
			// and the module can be successfully imported and used.
			
			try {
				// Dynamic import should work without throwing
				const importedModule = await import('../dist/cjs/howMany');
				expect(importedModule).to.be.an('object');
				expect(importedModule.hours).to.be.an('object');
				expect(importedModule.ticks).to.be.an('object');
			} catch (error) {
				throw new Error(`Dynamic import failed: ${error}`);
			}
		});

		it('should have both .d.ts and .js files in dist', () => {
			// Verify that both declaration and implementation files exist
			// This prevents the original issue from recurring
			const distPath = path.resolve(__dirname, '../dist');
			const jsFile = path.join(distPath, 'cjs', 'howMany.js');
			const dtsFile = path.join(distPath, 'howMany.d.ts');
			
			expect(fs.existsSync(jsFile)).to.be.true;
			expect(fs.existsSync(dtsFile)).to.be.true;
		});
	});
});
