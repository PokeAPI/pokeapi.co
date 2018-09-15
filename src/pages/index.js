import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/Layout';
import Banner from '../components/Banner';
import CallToAction from '../components/CallToAction';
import Container from '../components/Container';
import ApiExplorer from '../components/ApiExplorer';
import {Cell, CellContainer} from '../components/Cell';

import styles from './index.module.scss';
import netlifyLogo from '../images/netlify-logo.svg';

export default ({location}) => (
    <Layout location={location}>
        <Banner>
            <h1>PokéAPI</h1>
            <h2>The RESTful Pokémon API</h2>
            <p>
                Over <strong>431,313,100</strong> API calls received!
            </p>
        </Banner>
        <CallToAction>
            <p>
                All the Pokémon data you'll ever need in one place,
                <br />
                easily accessible through a modern RESTful API.
            </p>
            <p>
                <Link to="/docs/v2.html">Check out the docs!</Link>
            </p>
        </CallToAction>
        <Container isNarrow>
            <ApiExplorer baseApiUrl="https://pokeapi.co/api/v2/" />
            <CellContainer>
                <Cell title="What is this?">
                    <p>
                        This is a full RESTful API linked to an extensive
                        database detailing everything about the Pokémon main
                        game series.
                    </p>
                    <p>
                        We've covered everything from Pokémon to Berry Flavors.
                    </p>
                </Cell>
                <Cell title="Where do I start?">
                    <p>
                        We have awesome{' '}
                        <Link to="docs/v2.html">documentation</Link> on how to
                        use this API. It takes minutes to get started.
                    </p>
                    <p>
                        This API will always be publicly available and will
                        never require any extensive setup process to consume.
                    </p>
                </Cell>
                <Cell title="Hosted by Netlify">
                    <div className={styles.hostedby}>
                        <a href="https://netlify.com">
                            <img src={netlifyLogo} alt="Netlify" />
                        </a>
                    </div>
                </Cell>
            </CellContainer>
        </Container>
    </Layout>
);
