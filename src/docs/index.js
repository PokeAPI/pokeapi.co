import berries from './berries.json';
import contests from './contests.json';
import encounters from './encounters.json';
import evolution from './evolution.json';
import games from './games.json';
import items from './items.json';
import locations from './locations.json';
import machines from './machines.json';
import moves from './moves.json';
import pokemon from './pokemon.json';

import resourceLists from './resource-lists.json';
import utility from './utility.json';

export default [
    {name: 'Berries', resources: berries},
    {name: 'Contests', resources: contests},
    {name: 'Encounters', resources: encounters},
    {name: 'Evolution', resources: evolution},
    {name: 'Games', resources: games},
    {name: 'Items', resources: items},
    {name: 'Locations', resources: locations},
    {name: 'Machines', resources: machines},
    {name: 'Moves', resources: moves},
    {name: 'Pokemon', resources: pokemon},
];

export {resourceLists, utility};
