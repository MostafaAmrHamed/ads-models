export type SignupUserWithEmail = {
  name: string;
  email: string;
  password: string;
  role: string;
};
export type SignupUserWithPhone = {
  name: string;
  role: string;
};
export type LoginUserWithEmail = {
  email: string;
  password: string;
};
export type LoginUserWithPhone = {
  phone: string;
};
export type User = {
  name: string;
  email: string;
  phone: string;
  role: string;
  loggedIn: boolean;
};
export type Ad = {
  id: number;
  title: string;
  type: string;
  from: string;
  to: string;
  link: string;
};
export type UpdateAd = {
  id: number;
  title: string;
  type: string;
  from: string;
  to: string;
  link: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setOption: React.Dispatch<React.SetStateAction<boolean>>;
};
