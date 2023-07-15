import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const AllRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AllRoutes;
