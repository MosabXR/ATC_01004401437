import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Collapse,
} from "@material-tailwind/react";

import {
  TicketIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../common/LoginModal";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const DefaultNavbar = () => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logout } = useAuth();
  const [openLoginModal, setOpenLoginModal] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <div className="mr-4 hidden lg:block">
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Link to={"/tickets"}>
          <IconButton variant="text" color="black">
            <TicketIcon className="h-4 w-4" />
          </IconButton>
        </Link>
        {/* This has a little bug on refresh it disappears */}
        {user && user.role === "admin" && (
          <Link to="/admin">
            <IconButton variant="text" color="black">
              <Cog6ToothIcon className="h-4 w-4" />
            </IconButton>
          </Link>
        )}
        <IconButton
          variant="text"
          color="black"
          onClick={() => {
            logout();
            navigate("/");
            toast.success("Logged out successfully");
          }}
        >
          <PowerIcon className="h-4 w-4" />
        </IconButton>
      </ul>
    </div>
  );

  const navListMobile = (
    <div className="mr-4 flex">
      <ul className="mt-2 mb-4 flex flex-grow gap-2">
        <IconButton variant="text" color="black">
          <Cog6ToothIcon className="h-4 w-4" />
        </IconButton>
        <IconButton variant="text" color="black">
          <TicketIcon className="h-4 w-4" />
        </IconButton>
        <IconButton
          variant="text"
          color="black"
          onClick={() => {
            logout();
            navigate("/");
            toast.success("Logged out successfully");
          }}
        >
          <PowerIcon className="h-4 w-4" />
        </IconButton>
      </ul>
    </div>
  );

  const navAuth = (
    <div className="flex items-center gap-x-1">
      <Link to="#" onClick={() => setOpenLoginModal(true)}>
        <Button variant="text" size="sm" className="hidden lg:inline-block">
          <span>Log In</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Sign up</span>
        </Button>
      </Link>
    </div>
  );

  const navAuthMobile = (
    <div className="flex items-center gap-x-1">
      <Link
        to="#"
        onClick={() => setOpenLoginModal(true)}
        className="flex-grow"
      >
        <Button fullWidth variant="text" size="sm">
          <span>Log In</span>
        </Button>
      </Link>
      <Link to="/signup" className="flex-grow">
        <Button fullWidth variant="gradient" size="sm">
          <span>Sign up</span>
        </Button>
      </Link>
    </div>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-0 py-2 lg:py-4">
      <div className="container">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to={"/"}>
            <Typography
              variant="h4"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              <div className="flex justify-center items-center gap-2">
                <TicketIcon className="h-8 w-8" />
                TicketGo
              </div>
              {/* <img src={logo} alt="logo" className="w-10 h-10" /> */}
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            {user || localStorage.getItem("token") ? navList : navAuth}

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {user || localStorage.getItem("token")
            ? navListMobile
            : navAuthMobile}
        </Collapse>
        <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      </div>
    </Navbar>
  );
};

export default DefaultNavbar;
