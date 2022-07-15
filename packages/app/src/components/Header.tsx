import { Link } from "react-router-dom";
import { Fragment } from "react";
import styled from "styled-components";
import { PozitionHorizontalLogo } from "./images/PozitionHorizontalLogo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/solid";

const HeaderLink = styled(Link).attrs({
  className: `
    uppercase

    font-semibold
    hover:text-gray-200

    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-gray-300
    via-gray-100
    to-gray-300
  `,
})``;

export const Header = () => (
  <Popover className="relative bg-black-800 shadow">
    <div className="mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center py-6 md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <span className="sr-only">Pozition</span>
            <PozitionHorizontalLogo />
          </a>
        </div>
        <div className="-mr-2 -my-2 lg:hidden">
          <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden lg:flex space-x-10 bg-gray-800 py-2 px-4 rounded-2xl">
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/new">Pozition</HeaderLink>
          <HeaderLink to="/gallery">Gallery</HeaderLink>
        </div>
        <div className="hidden justify-end lg:flex lg:flex-1 lg:w-0">
          <ConnectButton label="Connect" />
        </div>
      </div>
    </div>

    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="rounded-lg shadow-lg bg-black-700 divide-y-2 divide-gray-200">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <PozitionHorizontalLogo />
              <div className="-mr-2">
                <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col py-6 px-5 space-y-6">
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/new">Pozition</HeaderLink>
            <HeaderLink to="/gallery">Gallery</HeaderLink>
            <ConnectButton label="Connect Wallet" />
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
);
