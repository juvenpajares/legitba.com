/**
 * @param {any} query
 */
export async function fetchFactChecks(query) {
    const response = await fetch(`http://localhost:5000/api/fact-check?q=${query}`);
    return response.json();
}