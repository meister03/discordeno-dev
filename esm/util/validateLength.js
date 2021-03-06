/** Validates the length of a string in JS. Certain characters in JS can have multiple numbers in length in unicode and discords api is in python which treats length differently. */
export function validateLength(text, options) {
    const length = [...text].length;
    // Text is too long
    if (options.max && length > options.max)
        return false;
    // Text is too short
    if (options.min && length < options.min)
        return false;
    return true;
}
