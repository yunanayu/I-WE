import { Suspense, lazy } from "react";
const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
const Login = lazy(() => import("../pages/MainPage"))
const Record = lazy(() => import("../pages/RecordPage"))

const MemberCheck = lazy(() => import("../pages/MemberCheckPage"))



const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "loginSuccess",
        element: <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path: "addInfo",
        element: <Suspense fallback={Loading}><MemberCheck/></Suspense>
    },
    {
        path: "record",
        element: <Suspense fallback={Loading}><Record/></Suspense>
    },
    
])
export default root;