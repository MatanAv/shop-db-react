import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Header,
  Navbar,
  ReciptsPage,
  ProductsPage,
  ReciptView,
  Inventory,
} from "./services/componentsManager";

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path='/products' element={<ProductsPage />} />
            <Route path='recipts' element={<ReciptsPage />}>
              <Route path='actives' element={<ReciptsPage />} />
              <Route path='history' element={<ReciptsPage />} />
            </Route>
            <Route path='view'>
              <Route path='order'>
                <Route path=':id' element={<ReciptView />} />
              </Route>
              <Route path='invoice'>
                <Route path=':id' element={<ReciptView />} />
              </Route>
            </Route>
            <Route path='/inventory' element={<Inventory />} />
          </Routes>
        </main>
      </>
    </Router>
  );
};

export default App;
