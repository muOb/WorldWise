import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContexts";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

//lazy loading: we will now load each of these components here as we need them
//split our bundle into separate chunks
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <>
          {/* <h1>hello every body welcome</h1> */}
          <BrowserRouter>
            {/* there will be  a time while we navigate from one page to the other
                 where that chunk has not been downloaded yet ,so we will use
                 Suspense          
            */}
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="Product" element={<Product />} />
                <Route path="Pricing" element={<Pricing />} />
                <Route
                  path="applayout"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* to use params with react router 1.create a new route 
            2.link to that route 
            3.in that route we read the state from the url use params */}
                  <Route path="cities/:id" element={<City />} />
                  {/* To read nested Route we use outlet */}
                  {/* index element is the default child route
            if none of these other routes here matches 
            
            navigate use in nested Route
            use for redirect to special Route
            replace use if we want to go back <--
            */}
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>

                <Route path="login" element={<Login />} />
                {/* * if no component match any path */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
