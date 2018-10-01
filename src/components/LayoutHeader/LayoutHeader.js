import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';

import HeaderLink from './HeaderLink';

import styles from './LayoutHeader.module.scss';
import logo from './../../images/logo.png';

const LayoutHeader = ({location}) => (
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
                    {/*<span className={styles.title}>PokéAPI</span>*/}
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

export default LayoutHeader;
