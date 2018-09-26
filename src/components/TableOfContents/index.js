import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ActiveSection from '../ActiveSection';
import styles from './index.module.scss';

const TableOfContents = ({entries, hidden}) =>
    entries.length > 0 ? (
        <ul className={styles.toc} hidden={hidden}>
            <ActiveSection entries={entries}>
                {activeEntry =>
                    entries.map(entry => {
                        if (entry.separator) {
                            return <Separator key={entry.id} />;
                        }
                        return (
                            <Entry
                                key={entry.id}
                                isActive={activeEntry === entry}
                                {...entry}
                            />
                        );
                    })
                }
            </ActiveSection>
        </ul>
    ) : null;

const Separator = () => (
    <li className={styles.separator + ' ' + styles.entry} />
);

const Entry = ({id, name, children, isActive}) => (
    <li
        className={classNames({
            [styles.entry]: true,
            [styles.active]: isActive,
        })}
    >
        <a href={'#' + id}>{name || id}</a>
        {children && <TableOfContents entries={children} hidden={!isActive} />}
    </li>
);

// Recursive PropType (see explanation at https://stackoverflow.com/a/52411570/)
const entryShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    separator: PropTypes.bool,
};
entryShape.children = PropTypes.arrayOf(PropTypes.shape(entryShape));

TableOfContents.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape(entryShape)).isRequired,
    active: PropTypes.bool,
};

TableOfContents.defaultProps = {
    entries: [],
    active: true,
    name: null,
};

export default TableOfContents;
