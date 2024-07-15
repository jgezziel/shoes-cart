import type { CartItem } from "@/types";
import IconCart from "./IconCart";
import { type Dispatch, useMemo } from "react";
import type { CartActions } from "@/reducers/cartReducer";

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
};

const Header = ({ cart, dispatch }: HeaderProps) => {
  //state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce((total, { price, quantity }) => total + price * quantity, 0),
    [cart]
  );

  const handleClearCart = () => {
    const confirm = window.confirm("¿Estás seguro de vaciar el carrito?");
    if (!confirm) return;
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <>
      <header className="bg-zinc-900">
        <div className="container py-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl font-semibold text-white">Tennis Cart</h2>
            <div className="relative __cart-cont">
              <button
                type="button"
                className="p-2 bg-white rounded text-zinc-900 __cart-btn"
              >
                <IconCart className=" size-8" />
              </button>
              <div className="bg-white w-fit px-3 py-6 rounded absolute top-0 border right-0 hidden min-w-[288px] __cart-dropdown">
                {isEmpty ? (
                  <p className="my-4 text-xl font-semibold text-center text-zinc-400">
                    El carrito esta vacio
                  </p>
                ) : (
                  <>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="hidden p-2 border sm:block">Imagen</th>
                          <th className="p-2 border">Articulo</th>
                          <th className="p-2 border">Precio</th>
                          <th className="p-2 border">Cantidad*</th>
                          <th className="p-2 border-b" />
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr className="border-b" key={item.id}>
                            <td className="hidden p-2 sm:block">
                              <img
                                className="object-cover w-20 rounded"
                                src={`/img/${item.image}`}
                                alt={`imagen guitarra ${item.name}`}
                              />
                            </td>
                            <td className="p-2 border-l">{item.name}</td>
                            <td className="p-2 text-center">${item.price}</td>
                            <td className="p-2">
                              <div className="flex items-center justify-center gap-x-3">
                                <button
                                  type="button"
                                  className="px-1 text-white transition-all rounded bg-zinc-900 hover:bg-zinc-700 disabled:bg-zinc-200 disabled:text-zinc-500"
                                  {...(item.quantity === 1 && {
                                    disabled: true,
                                  })}
                                  onClick={() =>
                                    dispatch({
                                      type: "DECREASE_QUANTITY",
                                      payload: { id: item.id },
                                    })
                                  }
                                >
                                  &#8722;
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  type="button"
                                  className="px-1 text-white transition-all rounded bg-zinc-900 hover:bg-zinc-700 disabled:bg-zinc-200 disabled:text-zinc-500"
                                  {...(item.quantity === 3 && {
                                    disabled: true,
                                  })}
                                  onClick={() =>
                                    dispatch({
                                      type: "INCREASE_QUANTITY",
                                      payload: { id: item.id },
                                    })
                                  }
                                >
                                  &#43;
                                </button>
                              </div>
                            </td>
                            <td className="p-2 text-center border">
                              <button
                                type="button"
                                className="font-medium text-white transition-all bg-red-500 rounded-full hover:bg-red-600 size-8"
                                onClick={() =>
                                  dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: { id: item.id },
                                  })
                                }
                              >
                                &#10005;
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="my-4 text-lg text-right">
                      Total a pagar:
                      <span className="font-bold"> ${cartTotal}</span>
                    </p>
                    <p className="mb-3 text-sm text-zinc-400">
                      *Un máximo de 3 artículos por tipo
                    </p>
                  </>
                )}
                <button
                  type="button"
                  className="w-full py-2 font-bold text-white transition-all bg-red-500 rounded hover:bg-red-600 focus:bg-red-100 focus:text-red-500 focus:ring-1 focus:ring-red-200 focus:scale-95 disabled:bg-zinc-200 disabled:text-zinc-500 disabled:cursor-not-allowed"
                  onClick={handleClearCart}
                  disabled={isEmpty}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
