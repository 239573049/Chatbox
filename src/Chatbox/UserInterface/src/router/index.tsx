import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../app/chat/layout";
import Welcome from "../app/chat/welcome";
import Search from "../app/chat/search";
import Not from "./not";

const routes = [
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Welcome />
            },
            {
                path: "/search",
                element: <Search />
            }
        ],
    },
    {
        path: '*',
        element: <Not />
    }
] as RouteObject[];

export default createBrowserRouter(routes);