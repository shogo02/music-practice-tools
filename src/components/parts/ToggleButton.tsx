type ToggleButtonProps = {
  trueText: string
  falseText: string
  isTrue?: boolean
  onClick?: any
}

function ToggleButton(props: ToggleButtonProps) {
  const { trueText, falseText, isTrue, onClick } = props
  const addClassName = isTrue ? 'justify-end' : ''
  return (
    // TODO 後で水平方向の位置を揃える
    <div className="flex">
      <div>{falseText}</div>
      <div
        onClick={onClick}
        className={`${addClassName} bg-[#dedede] flex items-center h-5 w-10 rounded-full shadow-[inset_1px_1px_2px_#b5b5b5,inset_-1px_-1px_2px_#ffffff] cursor-pointer`}
      >
        <div className="rounded-full h-5 w-5 bg-slate-200 bg-gradient-radial from-[#ffffff] to-[#dddddd] shadow-[1px_1px_1px_#b5b5b5]" />
      </div>
      <div>{trueText}</div>
    </div>
  )
}

export default ToggleButton
