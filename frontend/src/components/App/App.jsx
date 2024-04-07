import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesList from '../../routes/RoutesList';
import Layout from '../Layout';

const App = ({ socket }) => (
  <>
    <div className="h-100">
      <Layout />
      <RoutesList socket={socket} />
    </div>
    <ToastContainer />
  </>
);
export default App;
