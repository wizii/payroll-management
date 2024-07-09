type ButtonProps = {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button(props: ButtonProps) {
    return (
        <button 
            className="bg-[#ff220f] text-white border border-transparent rounded px-2 py-4 w-1/5 self-end mb-4 hover:shadow-md hover:bg-white hover:text-[#ff220f] hover:border hover:border-[#ff220f]"
            onClick={props.onClick}
        >
          {props.label}
        </button>
    )
}
