import React from 'react';
import classNames from 'classnames';

import styles from './Crumb.module.scss';

export default class MenuItem extends React.Component {
    focus = () => {
        this.domNode.focus();
    };
    handleKeyDown = event => {
        if (event.key === 'Enter' || event.key === 'Space') {
            this.domNode.click();
        }
    };
    render() {
        const {id, sectionId, name, isActive, done} = this.props;
        return (
            <li
                className={classNames({
                    [styles.menuitem]: true,
                    [styles.active]: isActive,
                })}
            >
                <a
                    ref={node => (this.domNode = node)}
                    id={id}
                    onClick={done}
                    onKeyDown={this.handleKeyDown}
                    href={'#' + sectionId}
                >
                    {name || id}
                </a>
            </li>
        );
    }
}

export const Separator = () => (
    <li className={classNames([styles.menuitem, styles.separator])} />
);
Separator.isSeparator = true;
