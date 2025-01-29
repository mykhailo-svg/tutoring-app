// USER

export enum USER_ROLE {
  STUDENT = 'STUDENT',
  OWNER = 'OWNER',
}

export type User = {
  id: number;
  password?: string | undefined;
  email: string;
  name: string;
  role: USER_ROLE;
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

// LANGUAGES

export enum LANGUAGE_LEVEL {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}
