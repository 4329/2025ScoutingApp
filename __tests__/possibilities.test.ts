import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {expect, jest, test} from '@jest/globals';
import { formatPossibilities, parsePossibilities } from '@/app/ui/scoutingapp/Possibilities';

describe('checks possibility formatting and parsing', () => {
	it('parses possibilities', () => {
		let [possibilities] = parsePossibilities("asdf-0-000000000000000000000000");
		expect(possibilities).toStrictEqual({
			event_name: "asdf",
			match_num: "0",
			red_nums: ["0000", "0000", "0000"],
			blue_nums: ["0000", "0000", "0000"],
		});
	});

	it('formats possibilities', () => {
		let possibilities = formatPossibilities("asdf", [{
			match_num: 0,
			red_nums: [0, 0, 0],
			blue_nums: [0, 0, 0]
		}])
		expect(possibilities).toStrictEqual("asdf-0-000000000000000000000000");
	});
});
