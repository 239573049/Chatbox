import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../app/chat/layout";
import Welcome from "../app/chat/welcome";
import Search from "../app/chat/search";
import Not from "./not";
import Settings from '../app/chat/settings'
import SettingAgent from '../app/chat/settings/agent'
import SettingCommon from '../app/chat/settings/common'


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
            },
            {
                path: "settings",
                element: <Settings />,
                children:[
                    {
                        path: "common",
                        element: <SettingCommon />
                    },
                    {
                        path: "agent",
                        element: <SettingAgent />
                    },
                    {
                        path: '',
                        element: <SettingCommon />
                    }
                ]
            }
        ],
    },
    {
        path: '*',
        element: <Not />
    }
] as RouteObject[];

export default createBrowserRouter(routes);