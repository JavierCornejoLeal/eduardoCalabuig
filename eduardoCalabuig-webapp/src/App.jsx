import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from "./pages/Productos";
// otras importaciones...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Otras rutas */}
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
