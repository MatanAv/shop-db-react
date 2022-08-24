import {
  Header,
  Navbar,
  UserPage,
  AdminPage,
  ProductsPage,
} from "./services/componentsManager";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<UserPage />} />
            <Route exact path='/admin' element={<AdminPage />} />
            <Route exact path='/products' element={<ProductsPage />} />
            <Route exact path='/orders' element={<ProductsPage />} />
            <Route exact path='/cancellations' element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
