import React from 'react';

import useActiveAnchor from '../../utils/useActiveAnchor';
import Crumb from './Crumb';
import styles from './BreadCrumbs.module.scss';

export default function BreadCrumbs({entries}) {
    const activeEntryId = useActiveAnchor(entries.map(e => e.id));
    const activeEntry =
        entries.find(entry => entry.id === activeEntryId) ?? entries[0];

    return (
        <React.Fragment>
            <Crumb activeEntry={activeEntry} entries={entries} />
            {activeEntry.children && (
                <React.Fragment>
                    <span className={styles.arrow} />
                    <BreadCrumbs entries={activeEntry.children} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
