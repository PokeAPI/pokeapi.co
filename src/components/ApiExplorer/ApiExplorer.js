import React from 'react';
import PropTypes from 'prop-types';
import JsonViewer from '../JsonViewer';
import LinkButton from '../LinkButton';

import Input from './Input';
import ditto from './ditto.json';
import styles from './ApiExplorer.module.scss';

export default class ApiExplorer extends React.Component {
    static propTypes = {
        baseApiUrl: PropTypes.string.isRequired,
    };
    state = {
        resourceUrl: 'pokemon/ditto/',
        resourceData: ditto,
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
            cache: 'force-cache',
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
    componentDidMount() {
        this.fetchResource(this.state.resourceUrl);
    }
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
            <div className={styles.container}>
                <h2 className={styles.tryit}>Try it now!</h2>
                <Input
                    defaultValue={resourceUrl}
                    urlPrefix={this.props.baseApiUrl}
                    onSubmit={value => this.fetchResource(value)}
                />
                <p className={styles.hint_sentence}>
                    Need a hint? Try <Hint value="pokemon/ditto/" />,{' '}
                    <Hint value="pokemon/1/" /> , <Hint value="type/3/" /> or{' '}
                    <Hint value="ability/4/" />.
                </p>
                <h2 className={styles.message}>{message}</h2>

                <JsonViewer data={resourceData} />
            </div>
        );
    }
}
