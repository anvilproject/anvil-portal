/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Utility class for formatting number values. 
 */

/**
 * Format bytes to magnitude. Based off https://stackoverflow.com/a/9462382.
 */
export function format(num, digitsConfig) {

	const si = [
		{value: 1, symbol: ''},
		{value: 1E3, symbol: 'k'},
		{value: 1E6, symbol: 'M'},
		{value: 1E9, symbol: 'G'},
		{value: 1E12, symbol: 'T'},
		{value: 1E15, symbol: 'PB'},
		{value: 1E18, symbol: 'E'}
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	let i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	const symbol = si[i].symbol;
	let digits;
	// Handle a single digit specification where all values are formatted to the
	// same length
	if ( Number.isInteger(digitsConfig) ) {
		digits = digitsConfig;
	}
	// Handle object containing symbol: digits config (eg {PB: 1}). Any magnitude
	// that isn't specified is defaulted to no digits
	else if ( !!digitsConfig ) {
		digits = digitsConfig[symbol] || 0;
	}
	return (num / si[i].value).toFixed(digits).replace(rx, '$1') + symbol;
}

/**
 * Formats file size to TB, formatted to two decimal places.
 *
 * @param size
 * @returns {string}
 */
export function formatSizeToTB(size) {

    /* See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString. */
    return (size / 1E12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

/**
 * Returns true if the value is a number.
 *
 * @param value
 * @returns {boolean}
 */
export function isNumber(value) {

    return typeof value === "number";
}
