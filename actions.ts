"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import axios from "axios";


const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error Request Data:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
  } else {
    console.error("Unexpected Error:", error);
  }
};

export const getSession = async () => {

  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }



  return session;
}

export const register = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;


  try {
    const response = await axios.post(
      "http://152.67.77.19:3000/auth/register",
      new URLSearchParams({
        username: formUsername,
        password: formPassword,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = response.data;

    const session = await getSession();

    session.username = formUsername;
    session.accessToken = data.access_token;
    session.isLoggedIn = true;

    await session.save();


    return { success: true };
  } catch (error) {
    handleAxiosError(error);

    return { error: "An error occurred during registration." };
  }
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;


  try {
    const response = await axios.post(
      "http://152.67.77.19:3000/auth/login",
      new URLSearchParams({
        username: formUsername,
        password: formPassword,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  

    const data = response.data;

    const session = await getSession();


    session.username = formUsername;
    session.accessToken = data.access_token;
    session.isLoggedIn = true;

    const checkIfAdmin = await axios.post(
      "http://152.67.77.19:3000/auth/is_admin",
      {},
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    console.log("checkIfAdmin", checkIfAdmin.data);
    session.is_admin = checkIfAdmin.data;

    await session.save();

    return { success: true };
  } catch (error) {
    handleAxiosError(error);
    return { error: "An error occurred during registration." };
  }
};
export const logout = async (prevState: { error: undefined | string }) => {
  try {
    const session = await getSession();
    session.destroy();
    console.log("Session destroyed");
    return { success: true };
  }
  catch (error) {
    console.error("Logout Error:", error);
    return { error: "An error occurred during logout." };
  }

};
