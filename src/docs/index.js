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
    {
        name: 'Resource Lists/Pagination',
        resources: resourceLists,
        description:
            "Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API. By default, a list \"page\" will contain up to 20 resources. If you would like to change this just add a 'limit' query parameter to the GET request, e.g. `?limit=60`. You can use 'offset' to move to the next page, e.g. `?limit=60&offset=60`.",
        endOfSection: true,
    },
    {name: 'Berries', resources: berries},
    {name: 'Contests', resources: contests},
    {name: 'Encounters', resources: encounters},
    {name: 'Evolution', resources: evolution},
    {name: 'Games', resources: games},
    {name: 'Items', resources: items},
    {name: 'Locations', resources: locations},
    {name: 'Machines', resources: machines},
    {name: 'Moves', resources: moves},
    {name: 'Pokémon', resources: pokemon, endOfSection: true},
    {name: 'Utility', resources: utility},
];
