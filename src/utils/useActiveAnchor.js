import {useState, useEffect} from 'react';

/**
 * Find the lower-most element on the page that matches one of the given IDs and is in
 * the top portion of the viewport or above it. If none are found, return the first ID.
 * @param {*} ids A list of element IDs to search for
 */
export default function useActiveAnchor(ids = []) {
    const [active, setActive] = useState(null);

    function updateActive() {
        for (const id of ids.slice().reverse()) {
            if (id === null) continue;
            const target = document.getElementById(id);
            if (target?.getBoundingClientRect().top < 100) {
                setActive(id);
                return;
            }
        }

        setActive(null);
    }

    useEffect(() => {
        updateActive();
        window.addEventListener('scroll', updateActive);
        window.addEventListener('resize', updateActive);
        return function cleanup() {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        };
    }, [ids]);

    return active ?? ids[0];
}
