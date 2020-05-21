import React from 'react';
import {useLocation} from 'react-router';
import classNames from 'classnames';

import Link from '../Link';
import styles from './Header.module.scss';
import logo from '../../images/pokeapi_256.png';

function HeaderLink({isActive, title, to}) {
    const linkRef = React.useRef(null);

    // The nav bar scrolls horizontally on narrow viewports, so make sure the
    // active link is scrolled into view on component mount.
    // Element.scrollIntoView() cannot be used because it will also scroll the page
    // vertically on Firefox.
    React.useEffect(() => {
        if (isActive && linkRef?.current) {
            const link = linkRef.current;
            const parent = link.parentElement;

            parent.style.position = 'relative';
            parent.scrollTo({
                behaviour: 'smooth',
                left:
                    link.offsetLeft -
                    (parent.clientWidth - link.offsetWidth) / 2 +
                    link.style.getPropertyValue('--gradient-width'), // see Header.module.scss
                top: 0,
            });
        }
    });

    return (
        <Link
            ref={linkRef}
            to={to}
            className={classNames({
                [styles.link]: true,
                [styles.link_active]: isActive,
            })}
            onClick={event => {
                if (isActive && event.target.scrollIntoView) {
                    event.target.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                    });
                }
            }}
        >
            {title}
        </Link>
    );
}

export default function Header({id}) {
    const {pathname} = useLocation();

    return (
        <div id={id} className={styles.headerwrapper}>
            <header className={styles.header}>
                <Link to="/" className={styles.homelink} title="PokéAPI">
                    <img src={logo} alt="PokéAPI" className={styles.logo} />
                </Link>
                <nav className={styles.nav}>
                    <HeaderLink
                        isActive={pathname === '/'}
                        title="Home"
                        to="/"
                    />
                    <HeaderLink
                        isActive={pathname.includes('/about')}
                        title="About"
                        to="/about"
                    />
                    <HeaderLink
                        isActive={pathname.includes('/docs/')}
                        title="Documentation"
                        to="/docs/v2"
                    />
                </nav>
            </header>
        </div>
    );
}
