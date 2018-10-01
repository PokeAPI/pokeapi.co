import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import styles from './Crumb.module.scss';
import Menu from './Menu';
import MenuItem, {Separator} from './MenuItem';

const entryShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    separator: PropTypes.boolean,
};

class Crumb extends React.Component {
    static propTypes = {
        activeEntry: PropTypes.shape(entryShape),
        entries: PropTypes.arrayOf(PropTypes.shape(entryShape)),
    };
    state = {open: false};
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
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
            <div className={styles.crumb}>
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

export default onClickOutside(Crumb);
