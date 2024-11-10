import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Analytics from "./pages/Analytics";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Report from "./pages/Report";
import DetailedAnalytics from "./pages/DetailedAnalytics";
import StudentList from "./pages/StudentList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Navigate replace to="/classes" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="classes" element={<Classes />} />
        <Route path="classes/:id" element={<Report />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="analytics/:id" element={<DetailedAnalytics />} />
        <Route path="studentlist" element={<StudentList/>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
