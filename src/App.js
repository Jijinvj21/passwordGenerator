import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Saved from "./pages/Saved";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <div className="App bg-indigo-400 h-screen">
      <div className="bg-indigo-400"> <Toaster
        toastOptions={{
          style: {
            background: '#808bf7',
            color: 'white',
          },
        }}
      /></div>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />     
           <Route path="/saved" element={<Saved />} />

        </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
