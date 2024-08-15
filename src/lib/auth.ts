import { cookies } from "next/headers";

export const getToken = () => {
  const myAuthtoken = cookies().get("auth-token");
  return myAuthtoken?.value;
};

export const setToken = (authToken: string) => {
  return cookies().set({
    name: "auth-token",
    value: authToken,
    httpOnly: true, // limit client side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3600,
  });
};
export const getRefreshToken = () => {
  const myAuthRefreshtoken = cookies().get("auth-refresh-token");
  return myAuthRefreshtoken?.value;
};

export const setRefreshToken = (authRefreshToken: string) => {
  return cookies().set({
    name: "auth-refresh-token",
    value: authRefreshToken,
    httpOnly: true, // limit client side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3600,
  });
};
export const deleteTokens = () => {
  cookies().delete("auth-refresh-token");
  return cookies().delete("auth-token");
};
