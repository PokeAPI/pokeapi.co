import React from 'react';
import {useRouteData} from 'react-static';

import Link from '../../components/Link';
import {Page} from '../../components/Page';
import DocsContainer from '../../components/DocsContainer';
import JsonViewer from '../../components/JsonViewer';
import addWordBreaks from '../../utils/addWordBreaks';
import styles from './v2.module.scss';

const wrapperLibraries = [

];

export default function Documentation() {
    const toc = [
        {name: 'Information', id: 'info'},
        {name: 'v1beta2', id: 'v1beta2'},
        {name: 'v1beta', id: 'v1beta'},
        {name: 'Fair Use Policy', id: 'fairuse', endOfSection: true},
        {name: 'Beta status', id: 'betastatus', endOfSection: false},
    ];

    return (
        <Page title="Documentation">
            <DocsContainer toc={toc}>

                <h2 id="info">Information</h2>
                <p>
                    A free rate-limited endpoint is available at <a href="https://graphql.pokeapi.co/v1beta2">graphql.pokeapi.co/v1beta2</a>. This endpoint can be subject to changes in the future. Only POST requests are allowed.
                </p>
                <p>
                    To ease learning and developing, a <a href="https://github.com/graphql/graphiql">GraphiQL</a> interface is hosted at <a href="https://graphql.pokeapi.co/v1beta2/console/">graphql.pokeapi.co/v1beta2/console/</a>. This console loads PokeAPI's GraphQL schema and offers a handy Explorer that can be used to create GraphQL queries. GraphQL queries are still HTTP queries so you can use your favorite tool/library to query the GraphQL endpoint. Follows an example using Curl.
                </p>

                <code className="code"  dangerouslySetInnerHTML={ {__html:`
# This curl retrieves all items and relative costs
curl 'https://graphql.pokeapi.co/v1beta2' \\
-H 'content-type: application/json' \\
-H 'accept: */*' \\
--compressed \\
--data-binary @- << EOF
{
    "query": "query getItems{item{name,cost}}",
    "variables": null,
    "operationName":"getItems"
}
EOF
                `} }/>

                <p>
                    A Node example and some GQL queries are available <a href="https://github.com/PokeAPI/pokeapi/tree/master/graphql/examples">here</a>.
                </p>

                <h2 id="v1beta2">v1beta2</h2>
                <p>
                    A new specification <a href="https://graphql.pokeapi.co/v1beta2">v1beta2</a> has been released on June 2025. The major change is that the prefix <i>pokemon_v2_</i> has been stripped away from all types so to have a clearer way to build GQL queries.
                </p>

                <h2 id="v1beta">v1beta</h2>
                <p>
                    This <a href="https://beta.pokeapi.co/graphql/v1beta">v1beta</a> specification is sun-setting and scheduled to be removed in summer 2025. A GraphiQL console can still be found at <a href="https://beta.pokeapi.co/graphql/console">beta.pokeapi.co/graphql/console</a>
                </p>

                <h2 id="fairuse">Fair Use</h2>
                <p>
                    PokéAPI is free and open to use. It is also very popular.
                    Because of this, we ask every developer to abide by our fair
                    use policy. People not complying with the fair use policy
                    will have their IP address permanently banned.
                </p>
                <p>
                    PokéAPI is primarily an educational tool, and we will not
                    tolerate denial of service attacks preventing people from
                    learning.
                </p>
                <p>Rules:</p>
                <ul>
                    <li>Locally cache resources whenever you request them.</li>
                    <li>
                        Be nice and friendly to your fellow PokéAPI developers.
                    </li>
                    <li>
                        If you spot security vulnerabilities act and <a href="https://github.com/PokeAPI/pokeapi/blob/master/SECURITY.md#reporting-a-vulnerability">report them</a> responsibly.
                    </li>
                </ul>
                <h2 id="betastatus">Beta status</h2>
                <p>
                    To reduce costs we are hosting the GraphQL API on a GCP e2-micro free instance. The machine can hardly support all the load of Hasura and Postgres thanks to some ingenious tweaks.
                </p>
                <p>
                    Nonetheless, this has a cost to the user experience. A 100 calls/h per IP rate-limit is put in place, the instance is set to reboot every day at 1 AM UTC with a consequent 2 minutes of downtime, every successful HTTP response is cached server-side, sporadic maintenance and testing might stop the service.
                </p>
            </DocsContainer>
        </Page>
    );
}
