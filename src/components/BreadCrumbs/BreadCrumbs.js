import React from 'react';
import PropTypes from 'prop-types';

import ActiveSection from '../ActiveSection';
import Crumb from './Crumb';
import styles from './BreadCrumbs.module.scss';

const BreadCrumbs = ({entries}) => (
    <ActiveSection entries={entries}>
        {activeEntry => (
            <React.Fragment>
                <Crumb activeEntry={activeEntry} entries={entries} />
                {activeEntry.children && (
                    <React.Fragment>
                        <span className={styles.arrow} />
                        <BreadCrumbs entries={activeEntry.children} />
                    </React.Fragment>
                )}
            </React.Fragment>
        )}
    </ActiveSection>
);

const entryShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    separator: PropTypes.bool,
};
entryShape.children = PropTypes.arrayOf(PropTypes.shape(entryShape));

BreadCrumbs.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape(entryShape)).isRequired,
};

export default BreadCrumbs;
