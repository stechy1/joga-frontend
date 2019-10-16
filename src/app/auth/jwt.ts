export interface JWT {
  iss: string;
  iat: string;
  nbf: string;
  exp: string;
  id: string;
  role: number;
  checked: boolean;
}
