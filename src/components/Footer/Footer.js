import React from 'react';

import Link from '../Link';
import styles from './Footer.module.scss';

export default function Footer({id}) {
    return (
        <footer id={id} className={styles.footer}>
            <div className={styles.container}>
                <p>
                    Created by <a href="https://phalt.github.io/">Paul Hallett</a> and other <a href="https://github.com/PokeAPI/pokeapi#contributing">PokéAPI contributors</a> around the world. Pokémon and Pokémon character names are trademarks of Nintendo.
                </p>
                <p>
                    <Link to="/status">Status Page</Link>
                </p>
            </div>
        </footer>
    );
}
