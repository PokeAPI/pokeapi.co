import items from './items.json';
import locations from './locations.json';
import machines from './machines.json';
import moves from './moves.json';
import pokemon from './pokemon.json';
import resourceLists from './resource-lists.json';

export default [
    {
        name: 'Items',
        resources: items,
    },
    {
        name: 'Locations',
        resources: locations,
    },
    {
        name: 'Machines',
        resources: machines,
    },
    {
        name: 'Moves',
        resources: moves,
    },
    {
        name: 'Pokemon',
        resources: pokemon,
    },
];

export {resourceLists};
