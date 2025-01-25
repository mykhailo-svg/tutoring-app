export type ModalSize = 'large' | 'medium' | 'small';

export type ModalActions = Partial<
  Record<
    'primary' | 'secondary',
    {
      text: string;
      onAction: () => void;
      loading?: boolean;
    }
  >
>;
