import React from 'react';

import Link from '../Link';
import styles from './Footer.module.scss';

export default function Footer({id}) {
    return (
        <footer id={id} className={styles.footer}>
            <div className={styles.container}>
                <div>
                    Created by <a href="https://github.com/phalt">Paul Hallett</a> and other <a href="https://github.com/PokeAPI/pokeapi/graphs/contributors">PokéAPI contributors</a> around the world. Pokémon and Pokémon character names are trademarks of Nintendo.
                </div>
                <div>
                    <a href="https://pokeapi.statuspage.io/"><img alt="Status" src="https://img.shields.io/badge/dynamic/json?color=blue&label=status&query=%24.status.description&url=https%3A%2F%2Fzlfyqp3hlvly.statuspage.io%2Fapi%2Fv2%2Fsummary.json"></img></a>
                </div>
            </div>
        </footer>
    );
}
