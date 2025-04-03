/**
 * @param {any} query
 */
export async function fetchFactChecks(query) {
    const response = await fetch(`https://v2.legitba.net/api/fact-check?q=${query}`);
    return response.json();
}