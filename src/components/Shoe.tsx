import type { Shoe as ShoeType } from "@/types";

type ShoeProps = {
  shoe: ShoeType;
  addToCart: (item: ShoeType) => void;
};

const Shoe = ({ shoe, addToCart }: ShoeProps) => {
  return (
    <li
      key={shoe.id}
      className="p-4 transition-all rounded shadow-md ring-1 ring-zinc-200 shadow-zinc-100 hover:shadow-zinc-200"
    >
      <article className="flex flex-col justify-between h-full">
        <header>
          <h3 className="mb-2 text-2xl font-bold text-zinc-800">{shoe.name}</h3>
          <p className="font-normal text-zinc-600">{shoe.description}</p>
        </header>
        <figure>
          <img
            className="object-contain object-center w-full h-40 my-4"
            src={`/img/${shoe.image}`}
            alt={shoe.name}
          />
        </figure>
        <footer>
          <p className="text-2xl font-bold text-right">${shoe.price}</p>
          <p className="px-2 mb-6 rounded bg-zinc-100 ring-1 ring-zinc-200 text-zinc-500 w-fit">
            {shoe.brand}
          </p>
          <button
            onClick={() => addToCart(shoe)}
            type="button"
            className="w-full py-2 font-bold text-white transition-all rounded bg-zinc-900 hover:bg-zinc-800 focus:bg-zinc-200 focus:text-zinc-900 focus:ring-1 focus:ring-zinc-300 focus:scale-95"
          >
            Agregar al carrito
          </button>
        </footer>
      </article>
    </li>
  );
};

export default Shoe;
