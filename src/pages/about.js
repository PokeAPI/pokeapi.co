import React from 'react';

import Link from '../components/Link';
import {PlainPage} from '../components/Page';
import styles from './about.module.scss';

const Faq = ({title, children}) => (
    <React.Fragment>
        <h3 className={styles.faq_title}>{title}</h3>
        <div className={styles.faq_body}>{children}</div>
    </React.Fragment>
);

export default function About() {
    return (
        <PlainPage title="About">
            <h1>About</h1>

            <Faq title="What is this?">
                <p>
                    This website provides a RESTful API interface to highly
                    detailed objects built from thousands of lines of data
                    related to{' '}
                    <a href="https://en.wikipedia.org/wiki/Pokemon">Pokémon</a>.
                    We specifically cover the video game franchise. Using this
                    website, you can consume information on Pokémon, their
                    moves, abilities, types, egg groups and much, much more.
                </p>
            </Faq>
            <Faq title="What is an API?">
                <p>
                    An API (Application Programming Interface) is a contract
                    that allow developers to interact with an application
                    through a set of interfaces. In this case, the application
                    is a database of thousands of Pokémon-related objects, and
                    the interfaces are URL links.
                </p>
                <p>
                    A RESTful API is an API that conforms to a set of loose
                    conventions based on HTTP verbs, errors, and hyperlinks.
                </p>
            </Faq>
            <Faq title="Aren't there 101 other Pokémon websites already?">
                <p>Yes and that's exactly the problem!</p>
                <p>
                    101 instances of the same website means 101 instances of the{' '}
                    <strong>same data</strong>.
                </p>
                <p>
                    We aim to provide a <strong>single source of data</strong>{' '}
                    that any number of other websites can consume and use.
                </p>
                <p>
                    Often, and especially when new Pokémon games or updates are
                    released, those 101+ websites take <strong>weeks</strong> to
                    update as people have to enter the same information in all
                    those different places.
                </p>
                <p>
                    This solves that problem. If all those sites consumed their
                    data from here, they would have the exact same information
                    that is updated at exactly the same time, with no errors
                    between each website. The overall benefit is a better
                    collaboration and consistency across all the different
                    Pokémon websites and applications. It's good for all!
                </p>
            </Faq>
            <Faq title="How much information is stored here?">
                <p>A lot.</p>
                <p>
                    We currently have <strong>tens of thousands</strong> of
                    individual items in our database, including:
                </p>
                <ul>
                    <li>Moves</li>
                    <li>Abilities</li>
                    <li>Pokémon (including various forms)</li>
                    <li>Types</li>
                    <li>Egg Groups</li>
                    <li>Game Versions</li>
                    <li>Items</li>
                    <li>Pokédexes</li>
                    <li>Pokémon Evolution Chains</li>
                </ul>
                <p>
                    And that's just scratching the surface! To see all the
                    different types of data we have, check out{' '}
                    <Link to="/docs/v2">the docs</Link>.
                </p>
            </Faq>
            <Faq title="The API is missing stuff!">
                <p>
                    We know! Feel free to contribute to open issues on{' '}
                    <a href="https://github.com/PokeAPI/pokeapi/">GitHub</a>.
                </p>
                <p>
                    Have ideas for new features? We're on Slack! Sign up <a href="https://join.slack.com/t/pokeapi/shared_invite/zt-2ampo6her-_tHSI3uOS65WzGypt7Y96w"> right here </a> then visit our <a href="https://pokeapi.slack.com">slack team</a>.
                </p>
            </Faq>
            <Faq title="So who built this?">
                <p>
                    PokéAPI V1 was created by{' '}
                    <a href="https://github.com/phalt">Paul Hallett</a> as a
                    weekend project but it quickly became more than a weekend's
                    worth of work. In December of 2014 Paul deprecated V1 in favor of working on V2.
                </p>
                <p>
                    This is where{' '}
                    <a href="https://github.com/zaneadix">Zane Adickes</a>{' '}
                    jumped in. Zane thought the original project was a fantastic
                    idea and wanted to help it grow. With direction from Paul,
                    Zane created the V2 API using an exact mirror of{' '}
                    <a href="https://github.com/eevee">Veekun's</a> data related
                    to the main series of games.
                </p>
                <p>
                    During summer 2018, Paul decided to hand over the project to the community. This is where Tim Malone, Mark Tse, Sargun Vohra, Charles Marttinen, Alessandro Pezzé, Alberto Oliveira da Silva, and Lucio Merotta came together and started planning how to change the infrastructure in order to improve performance and cut down on hosting costs. An important step was to convert the API to serve static JSON files, which was made possible by Sargun and his excellent <a href="https://github.com/PokeAPI/ditto">PokeAPI/ditto</a> tool. The frontend website was also re-built by Charles at the same time. The whole process was completed in October 2018.
                </p>
                <p>
                    After this massive redesign, PokéAPI gained many new consumers due to its new blazing fast performance. To give a quick reference, the loading of the infamous <a href="https://pokeapi.co/api/v2/pokemon/magikarp">Magikarp pokemon resouce</a> passed from seconds to ~80ms. 
                    
                    An important milestone for the PokéAPI project happened shortly after in summer 2020, when its GitHub repository reached <strong>2000 stargazers</strong> and in a single month fulfilled <strong>100 million</strong> API calls.
                </p>
                <p>
                    In August 2020 the PokéAPI community decided <a href="https://github.com/PokeAPI/pokeapi/issues/520">to temporarily fork</a> <a href="https://github.com/veekun/pokedex">veekun/pokedex</a>, which was the primary and only source of data. This operation was planned in order to add new generation-8 data, which Veekun lacked. The following people contributed to fetching and formatting generation-8 and newer data: <a href="https://github.com/Naramsim">Alessandro Pezzé</a>, <a href="https://github.com/ichbinfrog">Hoang Quoc Trung</a>, <a href="https://github.com/CMahk">Chandler Mahkorn</a>, <a href="https://github.com/AndreArrebola">André Sousa</a>, <a href="https://github.com/alex-whan">Alexander Whan</a>, <a href="https://github.com/myoKun345">Austin Jones</a>, <a href="https://github.com/tomi-912">tomi-912</a>, <a href="https://github.com/ercdndrs">Eric Donders</a>, <a href="https://github.com/pifopi">Gaël Dottel</a>, <a href="https://github.com/Parnassius">Parnassius</a> and <a href="https://github.com/anhthang">Anh Thang</a>.
                </p>
                <p>
                In January 2023 <a href="https://github.com/bitomic">bitomic</a>, <a href="https://github.com/giginet">Kohki Miki</a>, <a href="https://github.com/pebou">Paul-Émile</a>, <a href="https://github.com/tillfox">tillfox</a> scraped generation 9 data from the web and added it here. 
                </p>
                <p>
                The current owners of the PokéAPI project are <a href="https://github.com/phalt">Paul Hallet</a>, <a href="https://github.com/tdmalone">Tim Malone</a> and <a href="https://github.com/Naramsim">Alessandro Pezzé</a>. Alongside them other core maintainers include <a href="https://github.com/cmmartti">Charles Marttinen</a> and <a href="https://github.com/sargunv">Sargun Vohra</a>.
                </p>
                <p>
                    We also have a{' '}
                    <a href="https://github.com/pokeapi">GitHub organisation</a>{' '}
                    of contributors that you are welcome to join!
                </p>
            </Faq>
            <Faq title="Where did you get all of this data?">
                <p>
                    We gathered the information on this site from various
                    resources:
                </p>
                <ul>
                    <li>
                        <a href="https://github.com/veekun" target="none">
                            Veekun
                        </a>{' '}
                        has a fantastic{' '}
                        <a href="http://veekun.com/dex" target="none">
                            Pokedex
                        </a>{' '}
                        which is also an open source{' '}
                        <a
                            href="https://github.com/veekun/pokedex"
                            target="none"
                        >
                            project
                        </a>{' '}
                        containing a ton of csv data. We used this to flesh out
                        the database that powers Pokéapi.
                    </li>
                    <li>
                        Generation 8 data is scraped from <a href="https://bulbapedia.bulbagarden.net/wiki/Generation_VIII">different resources</a> which are considered to be trustful. Later on the data was integrated with the official one released by Veekun.
                    </li>
                </ul>
                <p>We'd also like to thank:</p>
                <ul>
                    <li>
                        Laven Pillay, who scraped together most of the sprites
                        used on the site.
                    </li>
                    <li>
                        <a href="https://github.com/Naramsim">
                            Alessandro Pezzé
                        </a>
                        , who worked tirelessly to add the Sun/Moon updates.
                    </li>
                </ul>
            </Faq>
            <Faq title="What's the technology stack?">
                <p>
                    Up until November 2018, the API and website were built
                    together in a single{' '}
                    <a href="https://python.org" target="none">
                        Python
                    </a>{' '}
                    project using the{' '}
                    <a href="https://djangoproject.com" target="none">
                        Django framework
                    </a>{' '}
                    and paired with a{' '}
                    <a href="https://www.postgresql.org" target="none">
                        PostgreSQL
                    </a>{' '}
                    database to store the data.{' '}
                    <a
                        href="http://www.django-rest-framework.org/"
                        target="none"
                    >
                        Django REST Framework
                    </a>{' '}
                    was used to expose the data through a RESTful API. The entire stack was deployed at <a href="https://www.digitalocean.com/">DigitalOcean</a>, initially paid by Paul and then sponsored directly by DigitalOcean itself.
                </p>

                <p>
                    In October 2018, the API was converted to serve static JSON
                    files in a fully backwards compatible manner. This allowed
                    PokéAPI to move its hosting to a cheap static hosting
                    solution (<a href="https://firebase.google.com/">Firebase</a> Hosting + <a href="https://www.cloudflare.com/">Cloudflare</a> Caching), which
                    increased performance and stability by a huge margin. 
                </p>
                
                <p>
                    The move to static hosting was solved by introducing a build step before deployment performed by <a href="https://circleci.com/">CircleCI</a>, our build system. This build step starts a local Django copy of <a href="https://github.com/PokeAPI/pokeapi">PokeAPI/pokeapi</a> and saves each possible endpoint as a JSON file using <a href="https://github.com/PokeAPI/ditto">PokeAPI/ditto</a>. All these JSON files are then uploaded to Firebase and served to the public through a <a href="https://github.com/PokeAPI/deploy">Firebase function</a> actioned by CircleCI.  
                </p>
                
                <p>
                This website now uses <a href="https://github.com/react-static/react-static">React Static</a> and the code lives in its own GitHub project at <a href="https://github.com/PokeAPI/pokeapi.co">PokeAPI/pokeapi.co</a>. Again, CircleCI takes care of deploying it on Firebase as static files.
                </p>
            </Faq>
        </PlainPage>
    );
}
