import Helmet from 'react-helmet';
import React from 'react';

const defaultDescription = 'An open RESTful API for Pokémon data';
const defaultImageUrl = '/src/images/pokeapi_256.png';

const TitleAndMetaTags = ({title, description, url, imageUrl}) => {
    return (
        <Helmet title={title}>
            <html lang="en" />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            {url && <meta property="og:url" content={url} />}
            <meta property="keywords" content="pokemon pokémon API REST free" />
            <meta property="og:image" content={imageUrl || defaultImageUrl} />
            <meta
                property="og:description"
                content={description || defaultDescription}
            />
            <meta
                property="description"
                content={description || defaultDescription}
            />
        </Helmet>
    );
};

export default TitleAndMetaTags;
