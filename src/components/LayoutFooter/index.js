import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const Footer = () => (
    <header
        className={classNames({
            'site-footer': true,
            [styles.footer]: true,
        })}
    >
        <div className={styles.container}>
            <div>
                <p>
                    © 2013–2018{' '}
                    <a href="http://phalt.co/?ref=pokeapi">Paul Hallet</a> and{' '}
                    <a href="https://github.com/PokeAPI/pokeapi/graphs/contributors">
                        Pokéapi contributors
                    </a>
                    . Pokémon and Pokémon character names are trademarks of
                    Nintendo.
                </p>
            </div>
        </div>
    </header>
);

export default Footer;
