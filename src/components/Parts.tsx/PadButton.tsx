import parse from 'html-react-parser';
import { convertMusicalSymbols } from '../../util/converter';


type PadButtonProps = {
    text: string;
    isTrue?: boolean;
    onClick?: any;
}

function PadButton(props: PadButtonProps) {
  let className = 'h-10 leading-10 text-sm rounded-[50px] shadow-[10px_10px_20px_#c4c4c4,-10px_-10px_20px_#ffffff] text-center text-';
  if(props.isTrue) className += " text-red-400";

  return (
    <div onClick={props.onClick} className={className} >
        { parse(props.text) }
    </div>
  )
}

export default PadButton