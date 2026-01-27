import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.jsx";
import { AppWrapper } from "./components/common/PageMeta.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <Provider store={store}>
          <App />
        </Provider>

      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
