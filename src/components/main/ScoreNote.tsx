import note from '../../assets/21085.png'
import trebleClef from '../../assets/20131.png'

export function StaffNotation() {
  return (
    <div className="flex w-40 h-24 flex-col p-5">
      <div className="w-full h-0 border-t-2 border-black pb-3" />
      <div className="w-full h-0 border-t-2 border-black pb-3" />
      <div className="w-full h-0 border-t-2 border-black pb-3" />
      <div className="w-full h-0 border-t-2 border-black pb-3" />
      <div className="w-full h-0 border-t-2 border-black pb-3" />
      {/* <div className="absolute mt-[-5px] w-[12px] h-[12px] rounded-full bg-white" /> */}
      <img className="absolute" src={trebleClef} alt="" width="1.8%" height="1.8%" />
      <img className="absolute" src={note} alt="" width="1.8%" height="1.8%" />
    </div>
  )
}
