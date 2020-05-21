export default function makeId(name) {
    return name.toLowerCase().replace(/\s/g, '-');
}
