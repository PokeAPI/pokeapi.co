import React from 'react';

import Layout from 'components/Layout';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Container from 'components/Container';

export default ({location}) => (
    <Layout location={location}>
        <TitleAndMetaTags title="About · PokéAPI" />
        <Container isNarrow>
            <h1>About</h1>
            <div className="faqs">
                <h3 className="faqs__q">What is this?</h3>
                <div className="faqs__a">
                    <p>
                        This website provides a RESTful API interface to highly
                        detailed objects built from thousands of lines of data
                        related to{' '}
                        <a href="https://en.wikipedia.org/wiki/Pokemon">
                            Pokémon
                        </a>
                        . We specifically cover the video game franchise, though
                        we'd like to cover the card game too. Using this
                        website, you can consume information on Pokémon, their
                        moves, abilities, types, egg groups and much much more.
                    </p>
                </div>

                <h3 className="faqs__q">What exactly is an API?</h3>
                <div className="faqs__a">
                    <p>
                        This is probably worth clearing up very quickly for
                        those who don't know.
                    </p>
                    <p>
                        An API (Application Programming Interface) is a set of
                        interfaces (in this case, url links) that are publicly
                        available, that allow developers to interact with an
                        application.
                    </p>
                    <p>
                        In this instance; the application is a database of
                        thousands of Pokémon-related objects.
                    </p>
                </div>

                <h3 className="faqs__q">
                    Aren't there 101 other Pokémon websites already?
                </h3>
                <div className="faqs__a">
                    <p>Yes and that's exactly the problem!</p>
                    <p>
                        101 instances of the same website means 101 instances of
                        the <strong>same data</strong>.
                    </p>
                    <p>
                        We aim to provide a <strong>single database</strong>{' '}
                        that any number of other websites can consume and use.
                    </p>
                    <p>
                        Often, and especially when new Pokémon games or updates
                        are released, those 101+ websites take{' '}
                        <strong>weeks</strong> to update as people have to enter
                        the same information in all those different places.
                    </p>
                    <p>This solves that problem.</p>
                    <p>
                        If all those sites consumed their data from here, they
                        would have the exact same information that is updated at
                        exactly the same time, with no errors between each
                        website.
                    </p>
                    <p>
                        The overall benefit is a better collaboration and
                        consistency across all the different Pokémon websites
                        and applications. It's good for all!
                    </p>
                </div>

                <h3 className="faqs__q">
                    How much information is stored here?
                </h3>
                <div className="faqs__a">
                    <p>
                        We're glad you asked because we've got an impressive
                        amount of data!
                    </p>
                    <p>
                        We currently have <strong>tens of thousands</strong> of
                        individual items in our database:
                    </p>
                    <ul>
                        <li>Moves</li>
                        <li>Abilities</li>
                        <li>Types</li>
                        <li>Egg groups</li>
                        <li>Versions </li>
                        <li>Items</li>
                        <li>Pokedexes</li>
                        <li>Pokémon (includes various forms)</li>
                    </ul>
                    <p>And that's just scratching the surface!</p>
                    <p className="">
                        The server has processed more than{' '}
                        <strong>430 million</strong> API calls at an average of{' '}
                        <strong>209000</strong> calls per day.
                    </p>
                </div>

                <h3 className="faqs__q">The API is missing stuff!</h3>
                <div className="faqs__a">
                    <p>
                        We know! Feel free to contribute to open issues on{' '}
                        <a href="https://github.com/PokeAPI/pokeapi/">GitHub</a>
                        .
                    </p>
                    <p>
                        Have ideas for new features? We're on Slack! Sign up{' '}
                        <a href="https://pokeapi-slack-invite.herokuapp.com/">
                            right here
                        </a>{' '}
                        then visit our{' '}
                        <a href="https://pokeapi.slack.com">slack team</a>.
                    </p>
                </div>

                <h3 className="faqs__q">So who built this?</h3>
                <div className="faqs__a">
                    <p>
                        Pokémon V1 was created by{' '}
                        <a href="https://github.com/phalt">Paul Hallett</a> as a
                        weekend project but it quickly became more than a
                        weekend's worth of work. In{' '}
                        <a
                            href="https://phalt.co/if-you-have-data-they-will-consume-it/"
                            target="none"
                        >
                            December of 2014
                        </a>{' '}
                        Paul deprecated V1 in favor of working on V2.
                    </p>
                    <p>
                        This is where{' '}
                        <a href="https://github.com/zaneadix">Zane Adickes</a>{' '}
                        jumped in. Zane thought the original project was a
                        fantastic idea and wanted to help it grow. With
                        direction from Paul, Zane created the V2 API using an
                        exact mirror of{' '}
                        <a href="https://github.com/eevee">Veekun's</a> data
                        related to the main series of games.
                    </p>
                    <p>
                        In summer of 2018,{' '}
                        <a href="https://github.com/cmmartti">
                            Charles Marttinen
                        </a>{' '}
                        developed the GraphQL API under his own direction, using
                        the same data source as the V2 API.
                    </p>
                    <p>
                        We have a{' '}
                        <a href="https://github.com/pokeapi">
                            GitHub organisation
                        </a>{' '}
                        of contributors that you are welcome to join!
                    </p>
                </div>

                <h3 className="faqs__q">Where did you get all of this data?</h3>
                <div className="faqs__a">
                    <p>
                        We gathered the information on this site from various
                        resources:
                    </p>
                    <ul>
                        <li>
                            <a href="https://github.com/eevee" target="none">
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
                            containing a ton of csv data. We used this to flesh
                            out the database that powers Pokeapi.
                        </li>
                        <li>
                            <a
                                href="http://bulbapedia.bulbagarden.net/wiki/Main_Page"
                                target="none"
                            >
                                Bulbapedia
                            </a>{' '}
                            has a tonne of extra information that proved useful
                            when designing models and documenting resources.
                        </li>
                    </ul>
                    <p>We'd also like to thank:</p>
                    <ul>
                        <li>
                            Laven Pillay, who scraped together most of the
                            sprites used on the site.
                        </li>
                        <li>
                            <a href="https://github.com/Naramsim">
                                Alessandro Pezze
                            </a>
                            , who worked tirelessly to add the Sun/Moon updates.
                        </li>
                    </ul>
                </div>

                <h3 className="faqs__q">What's the technology stack?</h3>
                <div className="faqs__a">
                    <ul>
                        <li>
                            The website framework is{' '}
                            <a href="https://djangoproject.com" target="none">
                                Django
                            </a>
                            , a super awesome framework built around
                            <a href="https://python.org" target="none">
                                Python
                            </a>
                            .
                        </li>
                        <li>
                            We use a{' '}
                            <a href="https://www.postgresql.org" target="none">
                                Postgres
                            </a>{' '}
                            database to store all our data.
                        </li>
                        <li>
                            We use{' '}
                            <a
                                href="http://www.django-rest-framework.org/"
                                target="none"
                            >
                                Django REST Framework
                            </a>{' '}
                            and{' '}
                            <a href="http://graphene-python.org/">
                                Graphene-Python
                            </a>{' '}
                            to expose our data through RESTful and GraphQL APIs.
                        </li>
                        <li>
                            We're hosted on{' '}
                            <a
                                href="https://www.digitalocean.com/?refcode=eab2fea41bc6"
                                target="none"
                            >
                                DigitalOcean
                            </a>{' '}
                            servers, who cover the cost of the servers, for
                            free! We ♥ them.
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    </Layout>
);
