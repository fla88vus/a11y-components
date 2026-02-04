type SelectionMode = 'single' | 'multiple';

interface UseSelectionParams<T extends string | string[]> {
  mode: SelectionMode;
  value: T;
  onChange: (next: T) => void;
}

export function useSelection<T extends string | string[]>({
  mode,
  value,
  onChange,
}: UseSelectionParams<T>) {
  // Check if item is selected
  const isSelected = (item: string) => {
    if (mode === 'single') return value === item;
    return (value as string[]).includes(item);
  };

  // Update selection
  const select = (item: string, checked?: boolean) => {
    if (mode === 'single') {
      onChange(item as T);
    } else {
      const current = value as string[];
      const next = checked ? [...current, item] : current.filter((v) => v !== item);
      onChange(next as T);
    }
  };

  return { isSelected, select };
}
