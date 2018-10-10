import React from 'react';
import classNames from 'classnames';
import {Link} from 'gatsby';

import styles from './LayoutFooter.module.scss';

const Footer = () => (
    <header
        className={classNames({
            'site-footer': true,
            [styles.footer]: true,
        })}
    >
        <div className={styles.container}>
            <p>
                © 2013–2018{' '}
                <a href="http://phalt.co/?ref=pokeapi">Paul Hallet</a> and{' '}
                <a href="https://github.com/PokeAPI/pokeapi/graphs/contributors">
                    PokéAPI contributors
                </a>
                . Pokémon and Pokémon character names are trademarks of
                Nintendo.
            </p>
            <p>
                <Link to="/status">Status Page</Link>
            </p>
        </div>
    </header>
);

export default Footer;
