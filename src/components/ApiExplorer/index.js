import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';

import CodeBox from '../CodeBox';
import LinkButton from '../LinkButton';

import Input from './Input';
import bulbasaur from './bulbasaur.json';
import styles from './index.module.scss';

export default class ApiExplorer extends React.Component {
    static propTypes = {
        baseApiUrl: PropTypes.string.isRequired,
    };
    state = {
        resourceUrl: 'pokemon/1',
        resourceData: bulbasaur,
        notFound: false,
        error: null,
        isLoading: false,
    };
    fetchResource = url => {
        this.setState({
            isLoading: true,
            notFound: false,
            error: null,
        });
        fetch(this.props.baseApiUrl + url, {
            mode: 'cors',
            cache: 'force-cached',
        })
            .then(res => {
                if (res.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false,
                    });
                } else if (res.status >= 400) {
                    this.setState({
                        error: `${res.status} ${res.statusText}`,
                        isLoading: false,
                    });
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    resourceData: data,
                    isLoading: false,
                });
            })
            .catch(error => {
                this.setState({
                    resourceData: null,
                    isLoading: false,
                    notFound: false,
                    error: error,
                });
            });
    };
    applyHint = value => {
        return () => {
            this.setState({resourceUrl: value});
            this.fetchResource(value);
        };
    };
    render() {
        const {
            isLoading,
            error,
            notFound,
            resourceData,
            resourceUrl,
        } = this.state;

        let message;
        if (notFound) {
            message = 'Resource not found';
        } else if (error) {
            message = `An error occurred: "${error}"`;
        } else if (isLoading) {
            message = 'Loading...';
        } else {
            message = `Resource for ${resourceData.name}`;
        }

        const Hint = ({value}) => (
            <LinkButton onClick={this.applyHint(value)}>{value}</LinkButton>
        );

        return (
            <div>
                <h2 className={styles.tryit}>Try it now!</h2>
                <Input
                    defaultValue={resourceUrl}
                    urlPrefix={this.props.baseApiUrl}
                    onSubmit={value => this.fetchResource(value)}
                />
                <p className={styles.hint_sentence}>
                    Need a hint? Try <Hint value="pokemon/1" />,{' '}
                    <Hint value="pokemon/ditto" /> , <Hint value="type/3" /> or{' '}
                    <Hint value="ability/4" />.
                </p>
                <h2 className={styles.message}>{message}</h2>
                <CodeBox small>{JSON.stringify(resourceData, null, 2)}</CodeBox>
            </div>
        );
    }
}
