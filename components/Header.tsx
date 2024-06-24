import React from "react";
import Link from "next/link";
import { getSession, logout } from "@actions";

const Header = async () => {
  const session = await getSession();

  return (
    <header className="bg-gray-100 py-6">
   
      <div className="mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1 ms-7">
            <Link href="/" className="text-black no-underline">
              <h1 className="text-2xl">Cooking Recipes</h1>
            </Link>
          </div>
          <div className="flex-1 items-center text-right mr-7">
            <ul className="flex justify-end space-x-2 text-black no-underline">
              <li>
                {session.is_admin && (
                  <Link href="/administration" className="text-black no-underline">
                    Userverwaltung
                  </Link>
                )}
              </li>
              <li>
                <Link
                  href="/recipes"
                  className="text-black no-underline hover:font-bold"
                >
                  Rezepte
                </Link>
              </li>
      
              {session.isLoggedIn ? (
                <li>

                  <Link
                    href="/profile"
                    className="text-black no-underline hover:font-bold"
                  >
                    {session.username}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="text-black no-underline hover:font-bold"
                  >
                    Login
                  </Link>
                </li>
              )}
                {session.isLoggedIn && (
                <li>
                  <Link
                    href="/login/logout"
                    className="text-black no-underline hover:font-bold"
                  
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
