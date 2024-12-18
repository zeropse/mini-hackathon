import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Posts from "./pages/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import PostDetails from "./pages/PostDetails";
import RootLayout from "./layout/RootLayout";
import Feedback from "./components/Feedback";
import SearchResults from "./pages/SearchResults";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/:username/:id" element={<PostDetails />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
