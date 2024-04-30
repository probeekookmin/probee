import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/common/Nav";
import Test, { Test2 } from "../pages/test";
import AddMissingPersonPage from "../pages/AddMissingPersonPage";
import MissingPersonReportPage from "../pages/MissingPersonReportPage";
import GuardianMainPage from "../pages/GuardianMainPage";
import GuardianSelectImgPage from "../pages/GuardianSelectImgPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Test />} />
          <Route path="/list" element={<Test2 />} />
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
