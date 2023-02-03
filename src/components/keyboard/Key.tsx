import { Note } from 'webmidi'
import { Constants } from '../../constants/constants'

type KeyProps = {
  midiNumber: number
  playNote: Note | undefined
  pcKey: string
}

function Key(props: KeyProps) {
  const { midiNumber, playNote, pcKey } = props
  const displayNoteName = (playNote?.name ?? '') + (playNote?.accidental ?? '')
  let addClassName = ''
  if (Constants.MIDI_HALF_NOTE_NUMBER.find((e) => e === midiNumber)) {
    addClassName += 'h-20 w-7 mx-[-14px] bg-slate-600 z-10 '
  } else {
    addClassName += 'h-36 w-10  '
  }

  if (playNote) {
    addClassName += 'bg-sky-600 '
  }

  return (
    <div className="flex">
      <div className={`${addClassName} border border-black flex justify-center items-end rounded-b-lg`}>
        <div className="p-2">
          {/* {displayNoteName}
          {pcKey ?? 'none'} */}
          {midiNumber}
        </div>
      </div>
    </div>
  )
}

export default Key
