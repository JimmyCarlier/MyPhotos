import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import './Root.css';
import NotFound from "./Pages/NotFound";
import UploadContest from "./Pages/Members/UploadContest";
// Router singleton created
const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

// RouterProvider added
export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/inscription" element={<SignUp />} />
      <Route path="/connexion" element={<SignIn />} />
      <Route path="/member/upload" element={<UploadContest />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}