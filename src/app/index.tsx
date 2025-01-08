import MenuBar from "@/components/MenuBar";
import { AppProvider } from "./provider";
import AppRouter from "./router";
import Header from "@/components/header";

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
