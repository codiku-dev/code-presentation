import { Home } from "@/pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
