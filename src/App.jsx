import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Posts from "./pages/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import Post from "./components/Post";
import RootLayout from "./layout/RootLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-post" element={<Post />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
