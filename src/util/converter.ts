import { Accidental } from '../constants/type'

export function convertMusicalSymbols(text: String) {
  return text.replaceAll('#', '<sup>&#9839;</sup>').replaceAll('b', '<sup>&#9837;</sup>')
}

export function convertAccidentalToSymbole(accidental: Accidental) {
  switch (accidental) {
    case 'sharp':
      return '#'
    case 'flat':
      return 'b'
    default:
      return ''
  }
}
