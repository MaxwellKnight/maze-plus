const NO_DELAY = 0;

type ExecuteAPI = {
	//Add a function to the execution chain with an optional delay.
	add: (fn: Function, delay?: number) => ExecuteAPI;
	//Set the delay for subsequent functions in the chain.
	delay: (delay: number) => ExecuteAPI;
	//* Start the execution of the function chain.
	start: () => Promise<void>;
 };

type ForEachCallback<T> = (element: T, index: number, array: T[]) => void;

/**
 * Asynchronous iteration through an array, applying a callback function on each element with a specified delay.
 *
 * @param {T[]} array - The array to iterate over.
 * @param {ForEachCallback<T>} callback - The callback function to apply on each element.
 * @param {number} delay - The delay between each iteration in milliseconds.
 * @param {number} offset - Optional offset for the initial delay before starting the iteration.
 * @returns {Promise<void>} - A Promise that resolves when the iteration is complete.
 */
export const forEach = <T>(array: T[], callback: ForEachCallback<T>, delay?: number, offset?: number): Promise<void> => {
	// Return a new Promise that wraps the asynchronous iteration logic
	return new Promise<void>((resolve) => {

		// Set a timeout to introduce an optional initial delay (offset) before starting the iteration
		setTimeout(() => {

			// Define an asynchronous function 'iterate' to handle the iteration
			const iterate = async () => {
				for (let i = 0; i < array.length; i += 1) {
					try {
						// Use a Promise to introduce a delay before each iteration
						await new Promise<void>((innerResolve) => {
						setTimeout(() => {
							callback(array[i], i, array);

							// Resolve the inner Promise to signal the completion of the current iteration
							innerResolve();
						}, delay ? delay : NO_DELAY);
						});
					} catch (error) {
						console.log("Error in forEach: ", error);
						throw new Error("could not resolve callback");
					}
				}
				// Resolve the outer Promise to signal the completion of the entire iteration
				resolve();
			};
			iterate();
		}, offset ? offset : NO_DELAY);
	});
 };
 

/**
 * Function for creating a chain of asynchronous functions with customizable delays between them.
 *
 * @param {number} initialDelay - The initial delay for the first function in the chain.
 */
export const execute = (initialDelay: number = NO_DELAY) => {
	let queue: Promise<void> | null = null;
	let currentDelay = initialDelay;
	const functions: { fn: Function; delay: number }[] = [];

	/**
	 * Add a function to the execution chain with an optional delay.
	 *
	 * @param {Function} fn - The function to be added to the chain.
	 * @param {number} delay - The delay before executing this function (defaults to the current delay).
	 * @returns {ExecuteAPI} - The API object for method chaining.
	 */
	const add = (fn: Function, delay: number = currentDelay): ExecuteAPI => {
		const wrappedFn = async () => {
			try {
				if (typeof fn === 'function') await Promise.resolve(fn());
			} catch (error) {
				console.error("Error in function: ", fn, error);
				throw new Error("fn is a function");
			}
		};
		
		functions.push({ fn: wrappedFn, delay });
		currentDelay += delay;
		return api;
	 };
	 

	const delay = (delay: number): ExecuteAPI => {
		currentDelay = delay;
		return api;
	};

	const start = (): Promise<void> => {
		if(!queue){
			queue = Promise.resolve(); // Initial promise for chaining

			for(const { fn, delay } of functions){
				queue = queue.then(async () => {
					try{
						await new Promise((resolve) => setTimeout(resolve, delay));
						await fn();
					}catch(error){
						console.error("Error in start: ", error);
						throw new Error("Could not resolve fn");
					}
				});
			}
		}
		return queue;
	};

	const api: ExecuteAPI = {
		add,
		delay,
		start,
	};

	return api;
}

