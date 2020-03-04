import React from 'react';
import {Link} from 'react-router-dom';

import styles from './index.module.scss';

import Layout, {PageContent} from '../components/Layout';
import ApiExplorer from '../components/ApiExplorer';

export default () => (
    <Layout>
        <div className={styles.banner_background}>
            <div className={styles.banner}>
                <h1>PokéAPI</h1>
                <h2>The RESTful Pokémon API</h2>
                <p>
                    Serving over <strong>23,000,000</strong> API calls each
                    month!
                </p>
            </div>
        </div>

        <div className={styles.cta_background}>
            <div className={styles.cta}>
                <p>
                    All the Pokémon data you'll ever need in one place,
                    <br />
                    easily accessible through a modern RESTful API.
                </p>
                <p>
                    <Link to="/docs/v2.html">Check out the docs!</Link>
                </p>
            </div>
        </div>

        <PageContent>
            <ApiExplorer baseApiUrl="https://pokeapi.co/api/v2/" />

            <div className={styles.faqs}>
                <div className={styles.faq}>
                    <h2 className={styles.faq_title}>What is this?</h2>
                    <div className={styles.faq_content}>
                        <p>
                            This is a full RESTful API linked to an extensive
                            database detailing everything about the Pokémon main
                            game series.
                        </p>
                        <p>
                            We've covered everything from Pokémon to Berry
                            Flavors.
                        </p>
                    </div>
                </div>
                <div className={styles.faq}>
                    <h2 className={styles.faq_title}>Where do I start?</h2>
                    <div className={styles.faq_content}>
                        <p>
                            We have awesome{' '}
                            <Link to="docs/v2.html">documentation</Link> on how
                            to use this API. It takes minutes to get started.
                        </p>
                        <p>
                            This API will always be publicly available and will
                            never require any extensive setup process to
                            consume.
                        </p>
                    </div>
                </div>
            </div>
        </PageContent>
    </Layout>
);
