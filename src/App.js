import { AppBar, Toolbar } from "@mui/material";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  NavLink,
  useNavigate,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import EditPage from "./pages/EditPage";
import {NoticeSnackbar} from "./components/NoticeSnackbar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/main" className="font-bold select-none self-stretch flex items-center mr-auto">l1li1li1l</NavLink>
          
            {location.pathname == "/main" && (
              <NavLink to="/write" className="select-none self-stretch flex items-center">
                할 일 추가
              </NavLink>
            )}
            {location.pathname != "/main" && (
              <span to="/main" className="select-none self-stretch flex items-center cursor-pointer" onClick={()=>navigate(-1)}>
                리스트
              </span>
            )}
          
        </Toolbar>
      </AppBar>
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;
