import { useEffect, useReducer } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Shoe from "@/components/Shoe";
import { cartReducer, initialState } from "./reducers/cartReducer";

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />
      <div className="container py-6">
        <h1 className="mb-6 text-2xl font-bold text-center uppercase text-zinc-700">
          Articulos seleccionados
        </h1>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {state.data.map((shoe) => (
            <Shoe shoe={shoe} dispatch={dispatch} key={shoe.id} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default App;
