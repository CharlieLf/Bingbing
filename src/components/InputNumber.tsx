interface Props {
    value: number;
    updateValue: (value: number) => void;
}

const InputNumber: React.FC<Props> = ({ value, updateValue }) => {
    return (
        <div className="flex justify-between items-center border-black border rounded">
            <button
                onClick={() => updateValue(value - 1)}
                className="w-10 h-10 bg-black text-white cursor-pointer border-r text-xl font-bold hover:bg-white hover:text-black active:text-white">
                -
            </button>

            <div className="w-14 h-10 text-center text-sm appearance-none focus:outline-none no-spin flex items-center justify-center">
                {value}
            </div>

            <button onClick={() => updateValue(value + 1)}
                className="w-10 h-10 bg-black text-white cursor-pointer border-l text-xl font-bold hover:bg-white hover:text-black active:text-white">
                +
            </button>
        </div>
    )
}

export default InputNumber;