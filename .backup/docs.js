import React from 'react';

import Link from '../components/Link';
import {PlainPage} from '../components/Page';

export default () => (
    <PlainPage title="Documentation Index">
        <h1>Docs</h1>
        <ul>
            <li>
                <Link to="/docs/v1">API v1</Link>
            </li>
            <li>
                <Link to="/docs/v2">API v2</Link>
            </li>
            <li>
                <Link to="/docs/graphql">GraphQL v1beta</Link>
            </li>
        </ul>
    </PlainPage>
);
