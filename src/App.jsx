import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home/Home";
import { ROUTES } from "./router";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
