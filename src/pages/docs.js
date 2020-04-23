import React from 'react';

import Link from '../components/Link';
import {PlainPage} from '../components/Page';

export default () => (
    <PlainPage title="Documentation Index">
        <h1>Docs</h1>
        <ul>
            <li>
                <Link to="/docs/v1">v1</Link>
            </li>
            <li>
                <Link to="/docs/v2">v2</Link>
            </li>
        </ul>
    </PlainPage>
);
