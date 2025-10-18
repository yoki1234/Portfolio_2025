import type { ButtonComponentProps } from "../DataTypes"

export const ButtonComponent= ({buttonText, handleClick}:ButtonComponentProps) => 
    <button onClick={handleClick} className="w-fill h-[48px] px-4 rounded-full bg-slate-400 text-white text-xl font-bold uppercase">{buttonText}</button>
