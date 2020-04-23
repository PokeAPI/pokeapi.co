import React from 'react';

import {PlainPage} from '../components/Page';

export default function PageNotFound() {
    return (
        <PlainPage title="Page Not Found">
            <h1>404 – Page Not Found</h1>
            <p>We couldn't find what you were looking for.</p>
            <p>
                Please contact the owner of the site that linked you to the
                original URL and let them know their link is broken.
            </p>
        </PlainPage>
    );
}
