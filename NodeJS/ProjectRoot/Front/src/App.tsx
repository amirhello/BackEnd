import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShowProduct from "./component/Get";
import PostData from "./component/Post";


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PostData />
      <div>
        <ShowProduct />
        {/* <NewProduct idNumber={data.length} /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
