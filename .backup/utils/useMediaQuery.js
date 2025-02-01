import {useState, useEffect} from 'react';

/**
 * React hook to check when a valid media-query-string changes
 * (i.e. when the media query test starts or stops evaluating to true)
 *
 * @param {string} queryString valid media query string. E.g.: `(min-width: 425px)`
 * @returns {boolean} media-query matches value
 */
export default function useMediaQuery(queryString, initialState = false) {
    const [queryMatch, setQueryMatch] = useState(initialState);

    useEffect(() => {
        function handleMatchChange(event) {
            return setQueryMatch(event.matches);
        }

        const mediaQueryList = window.matchMedia(queryString);
        handleMatchChange(mediaQueryList);

        mediaQueryList.addListener(handleMatchChange);
        return function cleanup() {
            mediaQueryList.removeListener(handleMatchChange);
        };
    }, [queryString]);

    return queryMatch;
}
