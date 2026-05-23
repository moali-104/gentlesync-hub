// Allow importing .js / .jsx files from the ported codebase without strict types.
declare module "*.jsx" {
  const Component: any;
  export default Component;
  export const Card: any;
  export const CardHeader: any;
  export const CardTitle: any;
  export const CardDescription: any;
  export const CardContent: any;
  export const CardFooter: any;
}
declare module "*.js" {
  const value: any;
  export default value;
  export const useAuthStore: any;
  export const useUIStore: any;
  export const USER_ROLES: any;
  export const STORAGE_KEYS: any;
  export const API_ENDPOINTS: any;
  export const login: any;
  export const register: any;
  export const logout: any;
}
