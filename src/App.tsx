import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RepoData from "./components/RepoData";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Todos from "./components/Todos";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <RepoData /> */}
      <Todos />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
