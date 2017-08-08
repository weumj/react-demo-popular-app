export const pipe = (...fns) => initInput => fns.reduce((input, fn) => fn(input), initInput);

export const curry = (fn, arr = []) => (...args) =>
	(innerArgs =>
			innerArgs.length === fn.length ? fn(...innerArgs) : curry(fn, innerArgs)
	)([...arr, ...args]);