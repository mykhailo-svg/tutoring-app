export type User = {
  id: number;
  password?: string | undefined;
  email: string;
  name: string;
  isEmailVerified: boolean;
};

// AUTH
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

// COOKIES

export enum COOKIES_NAME {
  ACCESS_TOKEN = 'AccessToken',
  REFRESH_TOKEN = 'RefreshToken',
}
