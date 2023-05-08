import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Moive from "./routes/Movie";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Moive />} />
      </Routes>
    </>
  );
}

export default App;
