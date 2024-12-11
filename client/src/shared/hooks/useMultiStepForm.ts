import { ReactNode, useCallback, useMemo, useState } from 'react';

export type MultiStepsFormStep = {
  content: ReactNode;
};

export const useMultiStepForm = (steps: MultiStepsFormStep[]) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const hasNext = useMemo(() => {
    return steps.length - 1 <= activeStepIndex + 1;
  }, [activeStepIndex, steps]);

  const hasPrevious = useMemo(() => {
    return activeStepIndex - 1 >= 0;
  }, [activeStepIndex]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      setActiveStepIndex((prevIndex) => prevIndex + 1);
    }
  }, [hasNext, setActiveStepIndex]);

  const goToPrevious = useCallback(() => {
    if (hasPrevious) {
      setActiveStepIndex((prevIndex) => prevIndex - 1);
    }
  }, [hasPrevious, setActiveStepIndex]);

  const activeStep = useMemo(() => {
    return {
      index: activeStepIndex,
      content: steps[activeStepIndex].content,
    };
  }, [activeStepIndex, steps]);

  const formApi = useMemo(() => {
    return {
      activeStep,
      hasNext,
      hasPrevious,
      goToNext,
      goToPrevious,
    };
  }, [activeStep, hasNext, hasPrevious, goToNext, goToPrevious]);

  return formApi;
};
