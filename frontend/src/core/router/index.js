import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import GuardianMainPage from "../../pages/GuardianMainPage";
import GuardianSelectImgPage from "../../pages/GuardianSelectImgPage";
import GuardianShowResultPage from "../../pages/GuardianShowResultPage";
import PrivateRoute from "./PrivateRoute";
import MissingPersonListPage from "../../pages/MissingPersonListPage";
import AddMissingPersonPage from "../../pages/AddMissingPersonPage";
import MissingPersonReportPage from "../../pages/MissingPersonReportPage";
import Nav from "../../components/common/Nav";

function Router() {
  const isAuthenticated = !!localStorage.getItem("jwtToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/m" element={<GuardianMainPage />} />
        <Route path="/select" element={<GuardianSelectImgPage />} />
        <Route path="/result" element={<GuardianShowResultPage />} />
        {/* <Route element={<PrivateRoute />}>
          <Route element={<Nav />}>
            <Route path="/add" element={<AddMissingPersonPage />} />
            <Route path="/report" element={<MissingPersonReportPage />} />
          </Route>
        </Route>
        <Route element={<Nav />}>
          <Route path="/list" element={<MissingPersonListPage />} />
        </Route> */}

        {/* <Route element={<Nav />}>
          <Route path="/list" element={<MissingPersonListPage />} />
          <Route path="/add" element={<AddMissingPersonPage />} />
          <Route path="/report" element={<MissingPersonReportPage />} />
        </Route> */}
        <Route element={<Nav />}>
          <Route path="/list" element={<MissingPersonListPage />} />
          <Route path="/add" element={<PrivateRoute element={<AddMissingPersonPage />} />} />
          <Route path="/report" element={<PrivateRoute element={<MissingPersonReportPage />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
