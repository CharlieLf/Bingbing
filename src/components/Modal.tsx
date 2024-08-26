interface Props {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
    const handleInnerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    return (
        <div onClick={onClose} className="fixed flex w-full h-full bg-black bg-opacity-50 items-center justify-center">
            <div onClick={handleInnerClick} className="bg-white h-fit w-fit p-8 rounded-2xl">
                {children}
            </div>
        </div>
    )
}

export default Modal;