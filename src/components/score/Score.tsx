import { useEffect, useRef } from 'react'
import { Note } from 'webmidi'
import abcjs from 'abcjs'
import { Accidental, DiatonicRoot } from '../../constants/type'
import './ScoreStyle.css'

type ScoreProps = {
  selectedDiatonicRoot: DiatonicRoot
  displayNortesInChord: Note[]
}

export function Score(props: ScoreProps) {
  const { selectedDiatonicRoot, displayNortesInChord } = props
  const staffwidth = (root: DiatonicRoot) => {
    if (root === 'C') return 77
    if (root === 'G') return 96
    return 147
  }

  abcjs.renderAbc(
    'abcjs',
    `K:${selectedDiatonicRoot}
    [${displayNortesInChord.map((e) => e.name).join('')}]2|`,
    {
      paddingtop: 0,
      paddingbottom: 0,
      paddingleft: 0,
      paddingright: 0,
      staffwidth: staffwidth(selectedDiatonicRoot),
      // viewportHorizontal: true,
      // viewportVertical: true,
      // responsive: 'resize',
    }
  )

  return <div id="abcjs" className="h-[65px]" />
}
