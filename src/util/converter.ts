

export function convertMusicalSymbols(text: String) {
    return text.replace('#', '<sup>&#9839;</sup>').replace('b', '<sup>&#9837;</sup>');
}