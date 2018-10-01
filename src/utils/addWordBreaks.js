import React from 'react';

function isUpperCase(str) {
    return str && str === str.toUpperCase() && str !== str.toLowerCase();
}

export default function addWordBreaks(str) {
    return str.split('').map((char, i) => {
        if (char === '_' && i > 0) {
            return (
                <React.Fragment key={i}>
                    _<wbr />
                </React.Fragment>
            );
        }
        if (
            i > 0 &&
            isUpperCase(char) &&
            (!isUpperCase(str[i + 1]) || !isUpperCase(str[i - 1]))
        ) {
            return (
                <React.Fragment key={i}>
                    <wbr />
                    {char}
                </React.Fragment>
            );
        }
        return char;
    });
}
