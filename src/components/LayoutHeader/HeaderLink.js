import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';

import styles from './HeaderLink.module.scss';

const HeaderLink = ({isActive, title, to}) => (
    <Link
        to={to}
        className={classNames({
            [styles.link]: true,
            [styles.link_active]: isActive,
        })}
    >
        {title}
    </Link>
);

export default HeaderLink;
