import React, {useState, useEffect} from 'react';
import JsonViewer from '../JsonViewer';
import LinkButton from '../LinkButton';

import Input from './Input';
import ditto from './ditto.json';
import styles from './ApiExplorer.module.scss';

export default function ApiExplorer({baseApiUrl}) {
    const [resourceUrl, setResourceUrl] = useState('pokemon/ditto');
    const [resourceData, setResourceData] = useState(ditto);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the new data whenever the resourceUrl changes
    useEffect(() => {
        fetchResource(resourceUrl);
    }, [resourceUrl]);

    function fetchResource(url) {
        setIsLoading(true);
        setNotFound(false);
        setError(null);

        fetch(baseApiUrl + url, {
            mode: 'cors',
            cache: 'force-cache',
        })
            .then(res => {
                if (res.status === 404) {
                    setNotFound(true);
                    setIsLoading(false);
                } else if (res.status >= 400) {
                    setError(`${res.status} ${res.statusText}`);
                    setIsLoading(false);
                } else return res.json();
            })
            .then(data => {
                setResourceData(data);
                setIsLoading(false);
            })
            .catch(error => {
                setResourceData(null);
                setIsLoading(false);
                setNotFound(false);
                setError(error);
            });
    }

    const Hint = ({value}) => (
        <LinkButton
            className={styles.hint}
            onClick={() => setResourceUrl(value)}
        >
            {value}
        </LinkButton>
    );

    let message;
    if (notFound) message = 'Resource not found';
    else if (error) message = `An error occurred: "${error}"`;
    else if (isLoading) message = 'Loading...';
    else if (resourceData)
        message = `Resource for ${resourceData.name || resourceUrl}`;
    else message = 'An unknown error occurred';

    return (
        <div className={styles.container}>
            <h2 className={styles.tryit}>Try it now!</h2>
            <Input
                defaultValue={resourceUrl}
                urlPrefix={baseApiUrl}
                onSubmit={value => setResourceUrl(value)}
            />
            <p className={styles.hint_sentence}>
                Need a hint? Try <Hint value="pokemon/ditto" />,{' '}
                <Hint value="pokemon/1" />, <Hint value="type/3" />,{' '}
                <Hint value="ability/4" />, or{' '}
                <Hint value="pokemon?limit=100&offset=200" />.
            </p>
            <p>
                Direct link to results:{' '}
                <a href={baseApiUrl + resourceUrl} target="_blank">
                    {baseApiUrl + resourceUrl}
                </a>
            </p>
            <h2 className={styles.message}>{message}</h2>

            <JsonViewer data={resourceData} />
        </div>
    );
}
