import { RouterProvider } from "react-router";
import Router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@components/ui/sonner";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <RouterProvider router={Router} />
    </QueryClientProvider>
  );
}

export default App;
