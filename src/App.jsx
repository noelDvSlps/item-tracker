import "./App.css";
import { User } from "./Pages/User";
import { AuthProvider } from "./providers/authProvider";
import { Toaster } from "react-hot-toast";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Main } from "./Pages/main";
import { UserTools, userToolsLoader } from "./Pages/UserTools";
import { allItemsLoader } from "./Pages/User";
import { allUsersLoader } from "./Pages/main";
import { NotFound } from "./Pages/NotFound";
import { UserHistory, dataLoader } from "./Pages/UserHistory";
import { ErrorElement } from "./Pages/ErrorElement";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Main />} loader={allUsersLoader} />

      <Route
        // historyLoader={dataLoader}
        path="User"
        element={<User />}
        loader={allItemsLoader}
        errorElement={<ErrorElement />}
      />

      <Route
        path="UserHistory"
        element={<UserHistory />}
        loader={dataLoader}
        errorElement={<ErrorElement />}
      />
      <Route
        path="UserTools"
        element={<UserTools />}
        loader={userToolsLoader}
        errorElement={<ErrorElement />}
      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
