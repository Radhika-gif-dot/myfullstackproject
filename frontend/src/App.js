import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import TasksToDo from "./components/TasksToDo";
import TaskUpdate from "./components/TaskUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/todos",
        element: <TasksToDo />,
      },
      {
        path: "/tasks/:id",
        element: <TaskUpdate />,
      },
    ]
  }
  
]);
function App() {
  return (
    <>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
