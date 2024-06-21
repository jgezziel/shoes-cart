import useCart from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Shoe from "@/components/Shoe";

function App() {
  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <div className="container py-6">
        <h1 className="mb-6 text-2xl font-bold text-center uppercase text-zinc-700">
          Articulos seleccionados
        </h1>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {data.map((shoe) => (
            <Shoe shoe={shoe} addToCart={addToCart} key={shoe.id} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default App;
