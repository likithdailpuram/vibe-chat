import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice";
import refreshSideBar from "./refreshSidebar";
export const Store = configureStore({
  reducer: {
    themeKey: themeSliceReducer,
    refreshKey: refreshSideBar,
  },
});
