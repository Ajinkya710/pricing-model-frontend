import React from "react";
import { Route, Routes } from "react-router-dom";
import ComingSoon from "./Pages/ComingSoon";
import Layout from "./Layout/Layout";
import Pricing from "./Pages/Pricing";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<ComingSoon />} />
        <Route path="/orders" element={<ComingSoon />} />
        <Route path="/customers" element={<ComingSoon />} />
        <Route path="/products" element={<ComingSoon />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/freight" element={<ComingSoon />} />
        <Route path="/integrations" element={<ComingSoon />} />
        <Route path="/settings" element={<ComingSoon />} />
      </Routes>
    </Layout>
  );
};

export default App;
