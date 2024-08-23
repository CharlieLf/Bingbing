interface Props{
    label: string,
    data: string,
    inputOnChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<Props> = ({label, data, inputOnChange}) => {
    return(
        <div>
            <label>{label}</label>
            <input onChange={inputOnChange} className='w-full p-3 border-black border'/>
        </div>
    )
}

export default Input;