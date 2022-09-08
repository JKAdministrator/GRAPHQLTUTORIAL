import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import NotFound from "./pages/NotFound";
import System from "./pages/System";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<>Personal page</>}></Route>
            <Route path="/system/*" element={<System />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
