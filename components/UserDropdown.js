import React from 'react';
import { createPopper } from '@popperjs/core';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from './useUser';
import Logout from './Logout';
import defaultAvatar from '../public/img/krclogo.jpg';

export default function UserDropdown() {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const {
    data: { authenticatedItem: user },
  } = useUser();

  return (
    <>
      <button
        type="button"
        className="text-blueGray-500 block rounded-full"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          if (dropdownPopoverShow) {
            closeDropdownPopover();
          } else {
            openDropdownPopover();
          }
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <Image
              alt={user?.name || 'user'}
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={user.avatar?.image.publicUrlTransformed || defaultAvatar}
              width={48}
              height={48}
            />
          </span>
        </div>
      </button>
      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? 'block ' : 'hidden '
        }bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`}
      >
        <Link href="/updateuser">
          <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
            ??????????????????
          </a>
        </Link>

        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <Logout className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 text-left" />
      </div>
    </>
  );
}
