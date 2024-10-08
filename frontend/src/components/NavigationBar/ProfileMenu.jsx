import { Menu, MenuHandler, Button, Avatar, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { CalendarDaysIcon, ChevronDownIcon, PowerIcon, UserCircleIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { createElement, useEffect, useState } from "react";

import { useAuth } from "../../hooks/UseAuth";

export default function ProfileMenu({ className, placement }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      action: () => navigate("/profile"),
    },
    {
      label: "New Event",
      icon: CalendarDaysIcon,
      action: () => navigate("/new-event"),
    },
    {
      label: "New Blog",
      icon: DocumentTextIcon,
      action: () => navigate("/new-blog"),
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      action: async () => {
        await auth?.logout();
        setIsMenuOpen(false);
      },
    },
  ];

  return (
    <div className={className}>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement={placement} allowHover>
        <MenuHandler>
          <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto" placeholder={undefined}>
            <Avatar variant="circular" size="sm" alt="tania andrew" className="border border-gray-900 p-0.5" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
            <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
          </Button>
        </MenuHandler>
        <MenuList className="p-1" placeholder={undefined}>
          {profileMenuItems.map(({ label, icon, action }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem key={label} onClick={action} className={`flex items-center gap-2 rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`} placeholder={undefined}>
                {createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal" color={isLastItem ? "red" : "inherit"} placeholder={undefined}>
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}
