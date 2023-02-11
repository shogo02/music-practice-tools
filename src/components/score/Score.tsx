import { useEffect, useRef } from 'react'
import { Note } from 'webmidi'
import abcjs from 'abcjs'
import { Accidental, ChordType, DiatonicRoot } from '../../constants/type'
import './ScoreStyle.css'

type ScoreProps = {
  selectedDiatonicRoot: DiatonicRoot
  chordType: ChordType
  displayNortesInChord: Note[]
}

export function Score(props: ScoreProps) {
  const { selectedDiatonicRoot, displayNortesInChord, chordType } = props
  const displayNotes = displayNortesInChord
    .map((e) => {
      let result = e.number < 24 ? e.name : e.name.toLowerCase()
      if (e.accidental && chordType === 'random') {
        if (e.accidental === '#') {
          result = `^${result}`
        } else {
          result += 'b'
        }
      }
      return result
    })
    .join('')

  abcjs.renderAbc(
    'abcjs',
    `K:${selectedDiatonicRoot}
    [${displayNotes}]8|`,
    {
      paddingtop: 10,
      paddingbottom: 10,
      paddingleft: 80,
      paddingright: 80,
      staffwidth: 147,
      // wrap: { minSpacing: 0, maxSpacing: 0, preferredMeasuresPerLine: 4 },
      // viewportHorizontal: true,
      // viewportVertical: true,
      // responsive: 'resize',
    }
  )

  return <div id="abcjs" className="" />
}
