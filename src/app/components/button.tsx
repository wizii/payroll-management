type ButtonProps = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
};

export default function Button(props: ButtonProps) {
  const { label, onClick, isDisabled = false } = props;

  return (
    <button
      className={`bg-[#ff220f] text-white text-sm border border-transparent rounded px-2 py-4 lg:w-1/5 md:1/3 sm:w-1/2 self-end mb-4 hover:shadow-md ${
        isDisabled
          ? 'opacity-50'
          : 'hover:bg-white hover:text-[#ff220f] hover:border hover:border-[#ff220f]'
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
