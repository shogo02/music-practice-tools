import { useEffect, useRef } from 'react'
import { Note } from 'webmidi'
import { Accidental } from '../../constants/type'
import { StaffNotation } from './ScoreNote'

type ScoreProps = {
  notesInChord: Array<Note>
  selectedAccidental: Accidental
}

export function Score(props: ScoreProps) {
  const { notesInChord, selectedAccidental } = props

  return (
    <div className="">
      <StaffNotation />
    </div>
  )
}
