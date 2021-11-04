import React from 'react';
import {useRouteData} from 'react-static';

import Link from '../../components/Link';
import {Page} from '../../components/Page';
import DocsContainer from '../../components/DocsContainer';
import JsonViewer from '../../components/JsonViewer';
import addWordBreaks from '../../utils/addWordBreaks';
import styles from './v2.module.scss';

// Please add new wrapper libraries to the end of this array
const wrapperLibraries = [
    {
        description: 'Node Server-side with auto caching',
        name: 'Pokedex Promise v2',
        link: 'https://github.com/PokeAPI/pokedex-promise-v2',
        author: 'Thomas Asadurian and Alessandro Pezzé',
    },
    {
        description: 'Browser-side with auto caching',
        name: 'pokeapi-js-wrapper',
        link: 'https://github.com/PokeAPI/pokeapi-js-wrapper',
        author: 'Alessandro Pezzé',
    },
    {
        description: 'Python 3 with auto caching',
        name: 'PokeBase',
        link: 'https://github.com/GregHilmes/pokebase',
        author: 'Greg Hilmes',
    },
    {
        description: 'Python 2/3 with auto caching',
        name: 'Pokepy',
        link: 'https://github.com/PokeAPI/pokepy',
        author: 'Paul Hallett',
    },
    {
        description: 'Kotlin (and Java)',
        name: 'PokeKotlin',
        link: 'https://github.com/PokeAPI/pokekotlin',
        author: 'sargunster',
    },
    {
        description: '.NET (C#, VB, etc)',
        name: 'PokeApi.NET',
        link: 'https://gitlab.com/PoroCYon/PokeApi.NET',
        author: 'PoroCYon',
    },
    {
        description: '.NET Standard',
        name: 'PokeApiNet',
        link: 'https://github.com/mtrdp642/PokeApiNet',
        author: 'mtrdp642',
    },
    {
        description: 'Swift',
        name: 'PokemonAPI',
        link: 'https://github.com/kinkofer/PokemonAPI',
        author: 'kinkofer',
    },
    {
        description: 'PHP',
        name: 'PokePHP',
        link: 'https://github.com/danrovito/pokephp',
        author: 'Dan Rovito',
    },
    {
        description: 'PHP',
        name: 'PHPokéAPI',
        link: 'https://github.com/lmerotta/phpokeapi',
        author: 'lmerotta',
    },
    {
        description: 'Ruby',
        name: 'Poke-Api-V2',
        link: 'https://github.com/rdavid1099/poke-api-v2',
        author: 'rdavid1099',
    },
    {
        description: 'Go',
        name: 'pokeapi-go',
        link: 'https://github.com/mtslzr/pokeapi-go',
        author: 'mtslzr',
    },
	{
		description: 'Crystal',
		name: 'pokeapi',
		link: 'https://github.com/henrikac/pokeapi',
		author: 'henrikac',
    },
    {
        description: 'Typescript with auto caching',
        name: 'Pokenode-ts',
        link: 'https://github.com/Gabb-c/pokenode-ts',
        author: 'Gabb-c',
    },
    {
        description: 'Rust with auto caching',
        name: 'Rustemon',
        link: 'https://crates.io/crates/rustemon',
        author: 'mlemesle',
    },
];

export default function Documentation() {
    const {docs} = useRouteData();

    const toc = [
        {name: 'Information', id: 'info'},
        {name: 'Fair Use Policy', id: 'fairuse'},
        {name: 'Slack', id: 'slack'},
        {name: 'Wrapper Libraries', id: 'wrap', endOfSection: true},
        ...docs.map(doc => ({
            name: doc.name,
            id: doc.id,
            children: doc.resources?.map(resource => {
                return {
                    name: resource.name,
                    id: resource.id,
                };
            }),
            endOfSection: doc.endOfSection,
        })),
    ];

    return (
        <Page title="Documentation">
            <DocsContainer toc={toc}>
                <p>
                    If you were using v1 of this API, please switch to v2 (this
                    page). <Link to="/docs/v1">Read more…</Link>
                </p>

                <p>
                    <strong>Quick tip:</strong> Use your browser's "find on
                    page" feature to search for specific resource types (<kbd>Ctrl+F</kbd> or <kbd>Cmd+F</kbd>).
                </p>

                <h2 id="info">Information</h2>
                <p>
                    This is a <strong>consumption-only</strong> API — only the
                    HTTP GET method is available on resources.
                </p>
                <p>
                    No authentication is required to access this API, and all
                    resources are fully open and available. Since the move to
                    static hosting in November 2018, rate limiting has been
                    removed entirely, but we still encourage you to limit the
                    frequency of requests to limit our hosting costs.
                </p>
                {/* <p>
                    If you are going to be regularly using the API, we recommend
                    caching data on your service or deploying your own instance
                    of the API (jump on{' '}
                    <a href="https://pokeapi-slack-invite.herokuapp.com/">
                        Slack
                    </a>{' '}
                    for help with this).
                </p> */}

                <h2 id="fairuse">Fair Use Policy</h2>
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
                </ul>

                <h2 id="slack">Slack</h2>
                <p>
                    Have questions? Ideas? Notice something amiss here in the
                    docs? Hit us up on Slack. Sign up right{' '}
                    <a href="https://pokeapi-slack-invite.herokuapp.com/">
                        here
                    </a>{' '}
                    then visit our <a href="https://pokeapi.slack.com">Slack</a>{' '}
                    team. We encourage you to come here before opening a ticket
                    on GitHub, so we can keep our issues nice and organized.
                    There are also a solid group of people using the API who may
                    already have answers or plans from experience.
                </p>

                <h2 id="wrap">Wrapper Libraries</h2>
                <ul>
                    {wrapperLibraries.map(lib => (
                        <li key={lib.link}>
                            <strong>{lib.description}</strong>:{' '}
                            <a href={lib.link} rel="nofollow">
                                {lib.name}
                            </a>{' '}
                            by {lib.author}
                        </li>
                    ))}
                </ul>

                {docs.map(doc =>
                    doc === null ? null : (
                        <React.Fragment key={doc.name}>
                            <h2 className={styles.title_section_name} id={doc.id}>
                                {doc.name} <span className={styles.section_type}>(group)</span>
                            </h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: doc.htmlDescription,
                                }}
                            />
                            {doc.resources.map(resource => (
                                <Resource key={resource.name} {...resource} />
                            ))}
                        </React.Fragment>
                    )
                )}
            </DocsContainer>
        </Page>
    );
}

function Resource({
    name,
    id,
    htmlDescription,
    exampleRequest,
    exampleResponse,
    responseModels,
}) {
    return (
        <React.Fragment key={name}>
            <h3 className={styles.section_name} id={id}>
                {name} <span className={styles.section_type}>(endpoint)</span>
            </h3>
            <div
                dangerouslySetInnerHTML={{
                    __html: htmlDescription,
                }}
            />
            {exampleRequest && (
                <p className={styles.resource_url}><span className={styles.resource_url_method}>GET</span> {exampleRequest}</p>
            )}
            {exampleResponse && <JsonViewer data={exampleResponse} />}
            {responseModels.map(model => (
                <React.Fragment key={model.name}>
                    <h4 id={model.id} className={styles.model_name}>
                        {model.name} <span className={styles.section_type}>(type)</span>
                    </h4>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.name_column}>Name</th>
                                <th className={styles.desc_column}>
                                    Description
                                </th>
                                <th className={styles.type_column}>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {model.fields.map(field => (
                                <tr key={field.name}>
                                    <td className={styles.type_column_body}>{addWordBreaks(field.name)}</td>
                                    <td
                                        dangerouslySetInnerHTML={{
                                            __html: field.htmlDescription,
                                        }}
                                    />
                                    <td>
                                        <FieldType type={field.type} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </React.Fragment>
    );
}

const scalarTypes = ['string', 'integer', 'boolean'];
function FieldType({type}) {
    if (scalarTypes.includes(type)) {
        return (<i>{type}</i>);
    }
    if (typeof type === 'object') {
        if (type.type === 'list') {
            return (
                <React.Fragment>
                    list <i><FieldType type={type.of} /></i>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <i><FieldType type={type.type} /></i> (<i><FieldType type={type.of} /></i>)
            </React.Fragment>
        );
    }
    return <a href={'#' + type.toLowerCase()}>{addWordBreaks(type)}</a>;
}
