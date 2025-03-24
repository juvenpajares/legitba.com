/**
 * @param {any} query
 */
export async function fetchFactChecks(query) {
    const response = await fetch(`http://localhost:8080/api/fact-check?q=${query}`);
    return response.json();
}