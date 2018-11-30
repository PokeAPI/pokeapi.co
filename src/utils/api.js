import fetch from 'cross-fetch';

function hasStorage() {
    var testStr = 'pokeapi';
    try {
        localStorage.setItem(testStr, testStr);
        localStorage.removeItem(testStr);
        return true;
    } catch (e) {
        return false;
    }
}

export async function fetchResource(url) {
    if (hasStorage() && localStorage.getItem(url) !== null) {
        return JSON.parse(localStorage.getItem(url));
    }

    const response = await fetch(url, {mode: 'cors'});
    if (response.status === 404) {
        return null;
    }
    if (response.status >= 400) {
        throw new Error(`${response.status} - ${response.statusText}`);
    }

    const rawJson = await response.text();
    if (hasStorage()) {
        localStorage.setItem(url, rawJson);
    }
    return JSON.parse(rawJson);
}
