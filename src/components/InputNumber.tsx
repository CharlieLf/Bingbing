const InputNumber: React.FC = () => {
    return (
        <div className="flex justify-between items-center border-black border rounded">
            <button className="w-10 h-10 bg-black text-white cursor-pointer border-r text-xl font-bold hover:bg-white hover:text-black active:bg-teal-600 active:text-white">
                -
            </button>

            <input type="number" min={1} className="w-14 h-10 text-center text-sm appearance-none focus:outline-none no-spin"/>
            
            <button className="w-10 h-10 bg-black text-white cursor-pointer border-l text-xl font-bold hover:bg-white hover:text-black active:bg-teal-600 active:text-white">
                +
            </button>
        </div>
    )
}

export default InputNumber;