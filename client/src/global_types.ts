export type User = {
  id: number;
  password: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
};

export enum TokenType {
  RESET_PASSWORD = 'resetPassword',
  REFRESH = 'refresh',
  EMAIL_VERIFICATION = 'emailVerification',
}

export type Token = {
  id: number;
  user: number;
  expires: string;
  value: string;
  type: TokenType;
};
