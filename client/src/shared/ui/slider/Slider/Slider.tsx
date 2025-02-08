import * as RadixSlider from '@radix-ui/react-slider';
import styles from './Slider.module.scss';
import { useCallback, useMemo } from 'react';

type SliderProps = {
  step?: number;
  max?: number;
  min?: number;
  value: number;
  onChange: (value: number) => void;
  accessabilityLabel?: string;
};

export const Slider: React.FC<SliderProps> = ({
  step = 1,
  max,
  min,
  onChange,
  value = 0,
  accessabilityLabel,
}) => {
  const values = useMemo(() => [value], [value]);

  const handleChange = useCallback(
    (values: number[]) => {
      onChange(values[0] ?? 0);
    },
    [onChange]
  );

  return (
    <RadixSlider.Root
      onValueChange={handleChange}
      className={styles.root}
      value={values}
      max={max}
      min={min}
      step={step}
    >
      <RadixSlider.Track className={styles.track}>
        <RadixSlider.Range className={styles.range} />
      </RadixSlider.Track>
      <RadixSlider.Thumb className={styles.thumb} aria-label={accessabilityLabel} />
    </RadixSlider.Root>
  );
};
