import Contacts from "@/assets/icons/Contacts";
import Leads from "@/assets/icons/Leads";
import UserSetting from "@/assets/icons/UserSettings";
import Users from "@/assets/icons/Users";

export const sidebar_data = [
  {
    display_name: "Contact",
    redirect: "/contact-management",
    icon: Contacts,
    item: [],
  },
  {
    display_name: "Leads",
    redirect: "/lead-management",
    icon: Leads,
    item: [],
  },
  {
    display_name: "Admin",
    redirect: "/admin",
    icon: UserSetting,
    item: [
      {
        display_name: "Users",
        redirect: "/admin/users",
        icon: Users,
      },
      {
        display_name: "Dashboard",
        redirect: "/admin/dashboard",
        icon: Leads,
      },
    ],
  },
  // {
  //   display_name: "List",
  //   redirect: "/",
  //   icon: "H",
  //   item: [
  //     {
  //       display_name: "Test 1",
  //       redirect: "/",
  //       icon: "H",
  //     },
  //     {
  //       display_name: "Test 2",
  //       redirect: "/",
  //       icon: "H",
  //     },
  //   ],
  // },
];
