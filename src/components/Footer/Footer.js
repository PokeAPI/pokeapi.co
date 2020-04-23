import React from 'react';

import Link from '../Link';
import styles from './Footer.module.scss';

export default function Footer({id}) {
    return (
        <footer id={id} className={styles.footer}>
            <div className={styles.container}>
                <p>
                    © 2013–2019{' '}
                    <a href="https://phalt.github.io/">Paul Hallett</a> and{' '}
                    <a href="https://github.com/PokeAPI/pokeapi#contributing">
                        PokéAPI contributors
                    </a>
                    . Pokémon and Pokémon character names are trademarks of
                    Nintendo.
                </p>
                <p>
                    <Link to="/status">Status Page</Link>
                </p>
            </div>
        </footer>
    );
}
