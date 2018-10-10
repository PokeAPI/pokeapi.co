import React from 'react';
// import PropTypes from 'prop-types';
import uniqueId from 'react-html-id';

import styles from './Crumb.module.scss';

export default class Menu extends React.Component {
    constructor() {
        super();
        uniqueId.enableUniqueIds(this);
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    handleKeyDown = event => {
        const {key} = event;
        if (key === 'ArrowDown') {
            event.preventDefault();
            this.nextItem.focus();
        } else if (key === 'ArrowUp') {
            event.preventDefault();
            this.previousItem.focus();
        } else if (key === 'Home') {
            event.preventDefault();
            this.firstItem.focus();
        } else if (key === 'End') {
            event.preventDefault();
            this.lastItem.focus();
        }
    };
    get firstItem() {
        return this.menuItems[0];
    }
    get lastItem() {
        return this.menuItems[this.menuItems.length - 1];
    }
    get currentIndex() {
        return this.menuItems.findIndex(
            menuItem => document.activeElement.id === menuItem.props.id
        );
    }
    get nextItem() {
        const currentIndex = this.currentIndex;
        if (currentIndex !== -1) {
            return this.menuItems[currentIndex + 1] || this.firstItem;
        }
        return this.firstItem;
    }
    get previousItem() {
        const currentIndex = this.currentIndex;
        if (currentIndex !== -1) {
            return this.menuItems[currentIndex - 1] || this.lastItem;
        }
        return this.lastItem;
    }

    addProps = menuItem => {
        if (menuItem.type.isSeparator) {
            return menuItem;
        }
        const id = this.nextUniqueId();
        return React.cloneElement(menuItem, {
            id: id,
            key: id,
            ref: node => {
                // Sometimes ref returns an empty node
                if (node) {
                    // Keep our own reference
                    this.menuItems.push(node);
                    // Call the original ref, if any
                    if (typeof menuItem.ref === 'function') {
                        menuItem.ref(node);
                    }
                }
            },
        });
    };
    render() {
        this.menuItems = [];
        const {id} = this.props;
        return (
            <ul id={id} className={styles.menu}>
                {React.Children.map(this.props.children, this.addProps)}
            </ul>
        );
    }
}
