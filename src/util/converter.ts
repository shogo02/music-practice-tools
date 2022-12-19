

export function convertMusicalSymbols(text: String) {
    return text.replaceAll('#', '<sup>&#9839;</sup>').replaceAll('b', '<sup>&#9837;</sup>');
}