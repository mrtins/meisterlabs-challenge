interface CreateButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

export default function CreateButton({
  label,
  className,
  onClick,
}: CreateButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`rounded text-white px-2 py-1 shadow-md hover:drop-shadow-lg focus:ring focus:outline-none ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
