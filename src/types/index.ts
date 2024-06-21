export type Shoe = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
};

export type CartItem = Shoe & {
  quantity: number;
};

export type ShoeID = Shoe["id"];
