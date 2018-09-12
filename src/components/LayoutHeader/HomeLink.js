import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';

import styles from './HeaderTitle.module.scss';
import logo from './../../images/placeholder.png';

const HeaderTitle = ({isActive}) => (
    <h1 className={styles.home}>
        <Link to="/" className={styles.link}>
            <img src={logo} alt="" className={styles.logo} />
            <span className={styles.title}>Pokéapi</span>
        </Link>
    </h1>
);

export default HeaderTitle;
