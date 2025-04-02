import { Routes, Route } from "react-router";
import AuthProvider from "./AuthProvider";
import useInitializeLocalStorage from "./useInitializeLocalStorage";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";


function App() {
  useInitializeLocalStorage();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            {/* <Route element={<PrivateRoute />}>
              <Route path="/" element={<TodoApp />} />
            </Route>
            <Route element={<PrivateRoute />}>
                Route path="/discussion" element={<DiscussionPage />} />
             </Route> */}
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
