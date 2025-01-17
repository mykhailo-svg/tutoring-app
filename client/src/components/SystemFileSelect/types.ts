export type SystemFileSelectApi = {
  openFileSelect: () => void;
};

export type SystemFileSelectValidation = {
  files: { type: 'image'; extensions: (string | 'all')[] }[];
};
