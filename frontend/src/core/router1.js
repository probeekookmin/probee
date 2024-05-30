import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/common/Nav";
import Test, { Test2 } from "../pages/test";
import AddMissingPersonPage from "../pages/AddMissingPersonPage";
import MissingPersonReportPage from "../pages/MissingPersonReportPage";
import MissingPersonListPage from "../pages/MissingPersonListPage";
import GuardianMainPage from "../pages/GuardianMainPage";
import GuardianSelectImgPage from "../pages/GuardianSelectImgPage";
import GuardianShowResultPage from "../pages/GuardianShowResultPage";
import LoginPage from "../pages/LoginPage";

function Router1() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Nav />}>
          <Route path="/" element={<MissingPersonListPage />} />
          <Route path="/list" element={<MissingPersonListPage />} />
          <Route path="/add" element={<AddMissingPersonPage />} />
          <Route path="/report" element={<MissingPersonReportPage />} />
        </Route>
        <Route path="/m" element={<GuardianMainPage />} />
        <Route path="/select" element={<GuardianSelectImgPage />} />
        <Route path="/result" element={<GuardianShowResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router1;
