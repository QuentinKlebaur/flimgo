import React from "react";
import Link from "next/link";
import RouteData from "../../../types/route_data";

interface NavbarTileProps {
  route: RouteData
}

const NavbarTile = (props : NavbarTileProps) => {
  return (
    <div>
      <li>
        <Link href={props.route.route}>
          <p>{props.route.text}</p>
        </Link>
      </li>
    </div>
  )
};

interface NavbarProps {
  routes: RouteData[]
}

const Navbar = (props: NavbarProps) => {
  return (
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              {
                props.routes.map((route, i) => <NavbarTile key={route.text} route={route} />)
              }
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navbar;