import { Home } from "@/pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { ROUTES } from "./router";
export function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
