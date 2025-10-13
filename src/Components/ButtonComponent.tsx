type ButtonComponentProps = {
    buttonText : String;
    handleClick : ()=> void;

}

export const ButtonComponent= ({buttonText, handleClick}:ButtonComponentProps) => 
    <button onClick={handleClick} className="w-[102px] h-[48px] rounded-full bg-slate-400 text-white text-xl">{buttonText}</button>
