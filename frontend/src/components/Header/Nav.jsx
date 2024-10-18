import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authStatus) {
      const fetchUser = async () => {
        const token = sessionStorage.getItem("accessToken");

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/current-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching the user data", error);
        }
      };
      fetchUser();
    }
  }, [authStatus]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: !authStatus,
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Account",
      slug: "/account",
      active: authStatus,
    },
  ];

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="bg-white rounded-3xl lg:rounded-full shadow-xl my-2  text-black mx-4">
        <Container>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/">
              <Logo />
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
              onClick={handleToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`w-full md:block md:w-auto ${
                isMenuOpen ? "block" : "hidden"
              }`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-block px-6 py-1 duration-200 font-mono  border-b-2 border-b-white hover:border-b-teal-400 "
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

export default Nav;
