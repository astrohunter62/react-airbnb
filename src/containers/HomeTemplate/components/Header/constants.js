const pages = ["Stays", "Online Experiences"];

const noUserSettings = [
    {
        label: "Sign up",
        link: "/auth/signup",
        divider: false,
    },
    {
        label: "Log in",
        link: "/auth/login",
        divider: true,
    },
    {
        label: "Host your home",
        link: "/",
        divider: false,
    },
    {
        label: "Host an experience",
        link: "/",
        divider: false,
    },
    {
        label: "Help",
        link: "/",
        divider: false,
    },
];

const withUserSettings = [
    {
        label: "Log out",
        link: "/",
        divider: true,
    },
    {
        label: "Account",
        link: "/profile",
        divider: false,
    },
    {
        label: "Host your home",
        link: "/",
        divider: false,
    },
    {
        label: "Host an experience",
        link: "/",
        divider: false,
    },
    {
        label: "Help",
        link: "/",
        divider: false,
    },
];

export { pages, noUserSettings, withUserSettings };
