import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesList from '../../Routes/RoutesList';
import Layout from '../Layout';
// prettier-ignore
const App = () => (
  <>
    <div className="h-100">
      <Layout />
      <RoutesList />
    </div>
    <ToastContainer />
  </>
);
export default App;
