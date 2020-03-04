import React from 'react';
import PropTypes from 'prop-types';

import styles from './Crumb.module.scss';
import Menu from './Menu';
import MenuItem, {Separator} from './MenuItem';

const entryShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    separator: PropTypes.boolean,
};

export default class Crumb extends React.Component {
    static propTypes = {
        activeEntry: PropTypes.shape(entryShape),
        entries: PropTypes.arrayOf(PropTypes.shape(entryShape)),
    };
    state = {open: false};
    breadcrumbRef = React.createRef();
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('click', this.handleClick);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('click', this.handleClick);
    }
    handleKeyDown = event => {
        if (this.state.open) {
            if (event.key === 'Escape') {
                event.preventDefault();
                this.close();
            }
        }
        if (event.key === 'ArrowDown') {
            if (document.activeElement === this.button) {
                event.preventDefault();
                this.open();
            }
        }
    };
    handleClick = event => {
        // TODO: Fix bug that prevents selecting text on page
        if (
            this.breadcrumbRef.current &&
            !this.breadcrumbRef.current.contains(event.target)
        ) {
            this.close();
        }
    };
    toggle = () => {
        if (this.state.open) {
            this.close();
        } else this.open();
    };
    open = () => {
        this.setState({open: true});
    };
    close = () => {
        this.setState({open: false});
        this.button.focus();
    };
    handleClickOutside = () => {
        if (this.state.open) {
            this.close();
        }
    };
    render() {
        const {activeEntry, entries} = this.props;
        return (
            <div ref={this.breadcrumbRef} className={styles.crumb}>
                <button
                    ref={node => (this.button = node)}
                    className={styles.button}
                    onClick={this.toggle}
                    aria-expanded={this.state.open}
                    aria-controls="breadcrumb-menu"
                >
                    {activeEntry.name}
                </button>
                {this.state.open && (
                    <Menu id="breadcrumb-menu">
                        {entries.map(entry => {
                            if (entry.separator) {
                                return <Separator key={entry.id} />;
                            }
                            return (
                                <MenuItem
                                    key={entry.id}
                                    isActive={entry === activeEntry}
                                    sectionId={entry.id}
                                    name={entry.name}
                                    done={this.close}
                                />
                            );
                        })}
                    </Menu>
                )}
            </div>
        );
    }
}
