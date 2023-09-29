import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import "./Root.css";
import NotFound from "./Pages/NotFound";
import PageMentionLegal from "./Pages/PageMentionLegal";
import UploadContest from "./Pages/Members/UploadContest";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import EnAttente from "./Pages/Admin/EnAttente";
import EspaceMembre from "./Pages/Members/EspaceMembre";


// Router singleton created
const router = createBrowserRouter([{ path: "*", Component: Root }]);

// RouterProvider added
export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inscription" element={<SignUp />} />
      <Route path="/connexion" element={<SignIn />} />
      <Route path="/mention" element={<PageMentionLegal />}></Route>
      <Route path="/member" element={<EspaceMembre />}></Route>
      <Route path="/member/upload" element={<UploadContest />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/en-attente" element={<EnAttente />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
