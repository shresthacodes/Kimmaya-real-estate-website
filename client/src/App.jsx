import "./App.css";
import { Suspense, useState } from "react";
import Layout from "./components/Layout/Layout";
import Website from "./pages/Website";
import Properties from "./pages/Properties/Properties";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";

import "bootstrap/dist/css/bootstrap.min.css";
import AddPropertyModal from "./components/AddPropertyModal/AddPropertyModal";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import UserDetailContext from "./Context/UserDetailContext";
// Import the Chatbot component

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="property/create" element={<AddPropertyModal />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
