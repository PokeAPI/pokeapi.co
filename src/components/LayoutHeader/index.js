import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';

import HeaderLink from './HeaderLink';

import styles from './index.module.scss';
import logo from './../../images/placeholder.png';

export default ({location}) => (
    <header
        className={classNames({
            'site-header': true,
            [styles.header]: true,
        })}
    >
        <div className={styles.container}>
            <h1 className={styles.homelink}>
                <Link to="/" className={styles.link}>
                    <img src={logo} alt="" className={styles.logo} />
                    <span className={styles.title}>Pokéapi</span>
                </Link>
            </h1>
            <nav className={styles.nav}>
                <HeaderLink
                    isActive={location.pathname === '/'}
                    title="Home"
                    to="/"
                />
                <HeaderLink
                    isActive={location.pathname.includes('/about.html')}
                    title="About"
                    to="/about.html"
                />
                <HeaderLink
                    isActive={location.pathname.includes('/docs/')}
                    title="Documentation"
                    to="/docs/"
                />
            </nav>
        </div>
    </header>
);
