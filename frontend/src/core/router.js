import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/common/Nav";
import Test, { Test2 } from "../pages/test";
import AddMissingPersonPage from "../pages/AddMissingPersonPage";
import MissingPersonReportPage from "../pages/MissingPersonReportPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Test />} />
          <Route path="/a" element={<Test2 />} />
          <Route path="/add" element={<AddMissingPersonPage />} />
          <Route path="/report" element={<MissingPersonReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
