import App from "./App";
import AgentDashboard from "./pages/AgentDashboard";
import ListingDetails from "./pages/ListingDetails";
import Listings from "./pages/Listings";
import ContactPage from "./pages/ContactPage";
import AddListingPage from "./pages/AddListingPage";
import EditListingPage from "./pages/EditListingPage";
import { ThemeProvider } from "./context/themeContext";
import Login from "./pages/Auth";
import LoginForm from "./components/Forms/LoginForm";



const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/dashboard',
        element: (
          <ThemeProvider>
            <AgentDashboard />
          </ThemeProvider>
        ),
      },
    {
        path: '/properties',
        element: <Listings />,
    },
    {
        path: '/property-details/:id',
        element: <ListingDetails />,
    },
    {
        path: '/contact-us',
        element: <ContactPage/>,
    },
     {
        path: '/login',
        element: <Login/>,
    },
    {
        path: "/dashboard/add-listing",
        element: <AddListingPage />
    },
    {
        path: "/dashboard/edit-listing/:id",
        element: <EditListingPage />
    }
   
]

export default routes