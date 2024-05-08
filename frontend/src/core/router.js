import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/common/Nav";
import Test, { Test2 } from "../pages/test";
import AddMissingPersonPage from "../pages/AddMissingPersonPage";
import MissingPersonReportPage from "../pages/MissingPersonReportPage";
import MissingPersonListPage from "../pages/MissingPersonListPage";
import GuardianMainPage from "../pages/GuardianMainPage";
import GuardianSelectImgPage from "../pages/GuardianSelectImgPage";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<MissingPersonListPage />} />
          <Route path="/list" element={<MissingPersonListPage />} />
          <Route path="/add" element={<AddMissingPersonPage />} />
          <Route path="/report" element={<MissingPersonReportPage />} />
        </Route>
        <Route path="/m" element={<GuardianMainPage />} />
        <Route path="/select" element={<GuardianSelectImgPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
