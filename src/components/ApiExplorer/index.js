import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';

import styles from './index.module.scss';
import hintStyles from './Hint.module.scss';

import Input from './Input';
import CodeBox from '../CodeBox';
import bulbasaur from './bulbasaur.json';

class Hint extends React.Component {
    handleClick = () => {
        this.props.applyHint(this.props.value);
    };
    render() {
        return (
            <button className={hintStyles.hint} onClick={this.handleClick}>
                {this.props.value}
            </button>
        );
    }
}

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
        this.setState({resourceUrl: value});
        this.fetchResource(value);
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

        return (
            <div>
                <h2 className={styles.tryit}>Try it now!</h2>
                <Input
                    defaultValue={resourceUrl}
                    urlPrefix={this.props.baseApiUrl}
                    onSubmit={value => this.fetchResource(value)}
                />
                <p>
                    Need a hint? Try{' '}
                    <Hint value="pokemon/1" applyHint={this.applyHint} />,{' '}
                    <Hint value="pokemon/ditto" applyHint={this.applyHint} /> ,{' '}
                    <Hint value="type/3" applyHint={this.applyHint} /> or{' '}
                    <Hint value="ability/4" applyHint={this.applyHint} />.
                </p>
                <h2>{message}</h2>
                <CodeBox small>{JSON.stringify(resourceData, null, 2)}</CodeBox>
            </div>
        );
    }
}
