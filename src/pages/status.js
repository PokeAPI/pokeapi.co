import React from 'react';

import {PlainPage} from '../components/Page';

export default function StatusPage() {
    return (
        <PlainPage title="Status Check">
            <h1>Status Check</h1>
            <p>
                Wondering if the API is down? You can check the status using
                these links:
            </p>

            <ul>
                <li>
                    <a href="https://updown.io/md8f">Documentation Status</a>
                </li>
                <li>
                    <a href="https://updown.io/w04a">API Status</a>
                </li>
            </ul>
        </PlainPage>
    );
}
