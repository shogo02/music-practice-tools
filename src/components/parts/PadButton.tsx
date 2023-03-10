import parse from 'html-react-parser'
import { convertMusicalSymbols } from '../../util/converter'

type PadButtonProps = {
  id: string
  checked: boolean
  onChange: any
  text: string
}

function PadButton(props: PadButtonProps) {
  const { id, checked, onChange, text } = props
  let className = 'h-8 leading-8 text-m text-center rounded-[10px] cursor-pointer'
  if (checked) {
    className += ' font-bold text-red-400 shadow-[inset_2px_2px_10px_#b5b5b5,inset_-2px_-2px_10px_#ffffff]'
  } else {
    className += ' shadow-[2px_2px_10px_#c4c4c4,-2px_-2px_10px_#ffffff]'
  }

  return (
    <div>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="hidden" />
      <label htmlFor={id}>
        <div className={className}>{text}</div>
      </label>
    </div>
  )
}

export default PadButton
