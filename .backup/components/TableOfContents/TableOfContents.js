import React from 'react';
import classNames from 'classnames';

import useActiveAnchor from '../../utils/useActiveAnchor';
import styles from './TableOfContents.module.scss';

export default function TableOfContents({entries, hidden}) {
    const activeEntry = useActiveAnchor(entries.map(e => e.id));

    if (entries.length > 0) {
        return (
            <ul className={styles.toc} hidden={hidden}>
                {entries.map(entry => (
                    <React.Fragment key={entry.id}>
                        <Entry isActive={activeEntry === entry.id} {...entry} />
                        {entry.endOfSection && <Divider />}
                    </React.Fragment>
                ))}
            </ul>
        );
    }
    return null;
}

const Divider = () => <li className={styles.divider + ' ' + styles.entry} />;

const Entry = ({id, name, children, isActive}) => (
    <li
        className={classNames({
            [styles.entry]: true,
            [styles.active]: isActive,
        })}
    >
        <a href={'#' + id}>{name}</a>
        {children && <TableOfContents entries={children} hidden={!isActive} />}
    </li>
);
