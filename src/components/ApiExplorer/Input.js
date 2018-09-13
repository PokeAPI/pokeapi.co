import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

export default class Input extends React.Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        onSubmit: PropTypes.func,
        urlPrefix: PropTypes.string,
    };
    static defaultProps = {
        defaultValue: '',
        onSubmit: () => {},
        urlPrefix: 'http://',
    };
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.defaultValue !== this.props.defaultValue) {
            this.setState({value: this.props.defaultValue});
        }
    }
    handleClick = () => {
        this.props.onSubmit(this.state.value);
    };
    handleFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    };
    handleChange = event => {
        this.setState({
            value: event.target.value,
        });
    };
    render() {
        return (
            <form onSubmit={this.handleFormSubmit} className={styles.container}>
                <label htmlFor="url-input" className={styles.prefix}>
                    <span hidden>Resource URL:</span>
                    {this.props.urlPrefix}
                </label>
                <input
                    id="url-input"
                    className={styles.input}
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button className={styles.button} onClick={this.submit}>
                    submit
                </button>
            </form>
        );
    }
}
