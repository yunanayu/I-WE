import { Suspense, lazy } from "react";
const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
// const Login = lazy(() => import("../pages/LoginPage"))
const Auth = lazy(() => import("../pages/AuthPage"))



const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    // {
    //     path: "login",
    //     element: <Suspense fallback={Loading}><Login/></Suspense>
    // },
    {
        path: "auth",
        element: <Suspense fallback={Loading}><Auth/></Suspense>
    },
    
])
export default root;