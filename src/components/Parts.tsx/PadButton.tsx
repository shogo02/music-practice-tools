
type PadButtonProps = {
    text: string;
}

function PadButton(props: PadButtonProps) {
  return (
    <div className='h-10 leading-10 text-xs rounded-[50px] bg-[#e6e6e6] shadow-[10px_10px_20px_#c4c4c4,-10px_-10px_20px_#ffffff]
    text-center '>
        {props.text}
    </div>
  )
}

export default PadButton