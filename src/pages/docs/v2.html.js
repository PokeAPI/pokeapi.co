import React, {Fragment} from 'react';

import Layout from '../../components/Layout';
import DocsContainer from '../../components/DocsContainer';
import DocSection from '../../components/DocSection';
import makeId from '../../utils/makeId';

import docs, {resourceLists, utility} from '../../docs';

function convert(doc) {
    return {
        name: doc.name,
        id: encodeURIComponent(makeId(doc.name) + '-section'),
        children: doc.resources.map(resource => {
            return {
                name: resource.name,
                id: encodeURIComponent(makeId(resource.name)),
            };
        }),
    };
}

const toc = [
    {name: 'Information', id: 'info'},
    {name: 'Fair Use Policy', id: 'fairuse'},
    {name: 'Slack', id: 'slack'},
    {name: 'Wrapper Libraries', id: 'wrap'},

    {separator: true, name: '', id: 'x'},
    convert({name: 'Resource Lists', resources: resourceLists}),

    {separator: true, name: '', id: 'y'},
    ...docs.map(convert),

    {separator: true, name: '', id: 'z'},
    convert({name: 'Utility', resources: utility}),
];

export default ({location}) => (
    <Layout location={location}>
        <DocsContainer toc={toc}>
            <h2 id="info">Information</h2>
            <p>
                This is a <strong>consumption-only</strong> API — only the HTTP
                GET method is available on resources.
            </p>
            <p>
                No authentication is required to access this API, and all
                resources are fully open and available. Since the move to static
                hosting in November 2018, rate limiting has been changed to a
                fixed limit of
                <strong>100 API requests per IP address per minute</strong>{' '}
                (this does not include downloading image assets like sprites,
                which are hosted elsewhere).
            </p>
            <p>
                If you are going to be regularly using the API, we recommend
                caching data on your service or deploying your own instance of
                the API (jump on{' '}
                <a href="https://pokeapi-slack-invite.herokuapp.com/">Slack</a>{' '}
                for help with this).
            </p>

            <h2 id="fairuse">Fair Use Policy</h2>
            <p>
                PokéAPI is free and open to use. It is also very popular.
                Because of this, we ask every developer to abide by our fair use
                policy. People not complying with the fair use policy will have
                their IP address permanently banned.
            </p>
            <p>
                PokéAPI is primarily an educational tool, and we will not
                tolerate denial of service attacks preventing people from
                learning.
            </p>
            <p>Rules:</p>
            <ul>
                <li>
                    Locally cache resources and images whenever you request
                    them.
                </li>
                <li>Use the correct user-agent header in API requests.</li>
                <li>Be nice and friendly to your fellow PokéAPI developers.</li>
            </ul>

            <h2 id="slack">Slack</h2>
            <p>
                Have questions? Ideas? Notice something amiss here in the docs?
                Hit us up on Slack. Sign up right{' '}
                <a href="https://pokeapi-slack-invite.herokuapp.com/">here</a>{' '}
                then visit our <a href="https://pokeapi.slack.com">Slack</a>{' '}
                team. We encourage you to come here before opening a ticket on
                GitHub, so we can keep our issues nice and organized. There are
                also a solid group of people using the API who may already have
                answers or plans from experience.
            </p>

            <h2 id="wrap">Wrapper Libraries</h2>
            <ul>
                <li>
                    <strong>Node Server-side with auto caching</strong>:{' '}
                    <a href="https://github.com/PokeAPI/pokedex-promise-v2">
                        Pokedex Promise v2
                    </a>{' '}
                    by Thomas Asadurian and Alessandro Pezzé
                </li>
                <li>
                    <strong>Browser-side with auto caching</strong>:{' '}
                    <a href="https://github.com/PokeAPI/pokeapi-js-wrapper">
                        pokeapi-js-wrapper
                    </a>{' '}
                    by Alessandro Pezzé
                </li>
                <li>
                    <strong>Python 3 with auto caching</strong>:{' '}
                    <a href="https://github.com/GregHilmes/pokebase">
                        PokeBase
                    </a>{' '}
                    by Greg Hilmes
                </li>
                <li>
                    <strong>Python 2/3 with auto caching</strong>:{' '}
                    <a href="https://github.com/PokeAPI/pokepy">Pokepy</a> by
                    Paul Hallett
                </li>
                <li>
                    <strong>Kotlin (and Java)</strong>:{' '}
                    <a href="https://github.com/PokeAPI/pokekotlin">
                        PokeKotlin
                    </a>{' '}
                    by sargunster
                </li>
                <li>
                    <strong>.NET (C#, VB, etc)</strong>:{' '}
                    <a href="https://gitlab.com/PoroCYon/PokeApi.NET">
                        PokeApi.NET
                    </a>{' '}
                    by PoroCYon
                </li>
                <li>
                    <strong>.NET Standard</strong>
                    <a href="https://github.com/mtrdp642/PokeApiNet">
                        PokeApiNet
                    </a>{' '}
                    by mtrdp642
                </li>
                <li>
                    <strong>Swift</strong>:{' '}
                    <a href="https://github.com/ContinuousLearning/PokemonKit">
                        PokemonKit
                    </a>{' '}
                    by darkcl
                </li>
                <li>
                    <strong>PHP</strong>:{' '}
                    <a href="https://github.com/danrovito/pokephp">PokePHP</a>{' '}
                    by Dan Rovito
                </li>
                <li>
                    <strong>PHP</strong>:{' '}
                    <a href="https://github.com/lmerotta/phpokeapi">
                        PHPokéAPI
                    </a>{' '}
                    by lmerotta
                </li>
                <li>
                    <strong>Ruby</strong>:{' '}
                    <a href="https://github.com/rdavid1099/poke-api-v2">
                        Poke-Api-V2
                    </a>{' '}
                    by rdavid1099
                </li>
                <li>
                    <strong>Go</strong>:{' '}
                    <a href="https://github.com/mtslzr/pokeapi-go">
                        pokeapi-go
                    </a>{' '}
                    by mtslzr
                </li>
            </ul>

            <h2 id="resource-lists-section">Resource Lists and Pagination</h2>
            <p>
                Calling any API endpoint without a resource ID or name will
                return a paginated list of available resources for that API. By
                default, a list "page" will contain up to 20 resources. If you
                would like to change this just add a 'limit' query parameter,
                e.g. <code>?limit=60</code>. You can use 'offset' to move to the
                next page, e.g. <code>?limit=60&offset=60</code>.
            </p>
            {resourceLists.map(resourceList => (
                <DocSection
                    key={resourceList.name}
                    rootUrl="https://pokeapi.co"
                    baseUrl="/api"
                    {...resourceList}
                />
            ))}

            {docs.map(doc => (
                <Fragment key={doc.name}>
                    <h2 id={makeId(doc.name) + '-section'}>{doc.name}</h2>
                    {doc.resources.map(resource => (
                        <DocSection
                            key={resource.name}
                            rootUrl="https://pokeapi.co"
                            baseUrl="/api"
                            {...resource}
                        />
                    ))}
                </Fragment>
            ))}

            <h2 id="utility-section">Utility</h2>
            {utility.map(utilityResource => (
                <DocSection
                    key={utilityResource.name}
                    rootUrl="https://pokeapi.co"
                    baseUrl="/api"
                    {...utilityResource}
                />
            ))}
        </DocsContainer>
    </Layout>
);
