'use client';

interface AutoSubmitSelectOption {
  value: string;
  label: string;
}

interface AutoSubmitSelectProps {
  name: string;
  selected: string;
  options: AutoSubmitSelectOption[];
  className?: string;
  includeAnyOption?: boolean;
}

export default function AutoSubmitSelect({
  name,
  selected,
  options,
  className,
  includeAnyOption = false,
}: AutoSubmitSelectProps) {
  const hasSelected = selected ? options.some((option) => option.value === selected) : true;

  return (
    <select
      name={name}
      defaultValue={selected}
      className={className}
      onChange={(event) => {
        event.currentTarget.form?.requestSubmit();
      }}
    >
      {includeAnyOption ? <option value="">Any</option> : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {selected && !hasSelected ? <option value={selected}>{selected}</option> : null}
    </select>
  );
}
