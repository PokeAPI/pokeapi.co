import React from 'react';
import {Root, Routes, useSiteData, Head} from 'react-static';
import {Route as ReactRouterRoute} from 'react-router-dom';
import 'sanitize.css';

import './global.scss';

import logo from './images/pokeapi_256.png';
import Alert from './components/Alert';
import Header from './components/Header';
import Footer from './components/Footer';

export default function AppLoader() {
    return (
        <React.Suspense fallback={<p>Loading...</p>}>
            <App />
        </React.Suspense>
    );
}

function App() {
    const {alerts} = useSiteData();

    return (
        <Root>
            <Head>
                <html lang="en" />
                <title>PokéAPI</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Lato:400,700"
                />
                <meta property="og:type" content="website" />
                <meta name="Description" content="An open RESTful API for Pokémon data"></meta>
                <meta
                    property="keywords"
                    content="pokemon pokémon API REST free"
                />
                <meta property="og:image" content={logo} />
                <meta
                    property="description"
                    content="An open RESTful API for Pokémon data"
                />
            </Head>

            <Header id="site-header" />

            {alerts.map(alert => (
                <Alert key={alert.id} {...alert} />
            ))}

            <main id="site-content">
                <React.Suspense fallback={<p>Loading...</p>}>
                    <ReactRouterRoute render={() => <Routes />} />
                </React.Suspense>
            </main>

            <Footer id="site-footer" />
        </Root>
    );
}
