import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ServicePage from "../pages/ServicePage";
import Portfolio from "../pages/Portfolio";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import LearnMore from "../pages/LearnMore";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />

      <Route path="/service" element={<ServicePage />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/learn-more" element={<LearnMore />} />
    </Route>
  )
);

export { router };
