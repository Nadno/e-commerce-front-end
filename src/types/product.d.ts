interface ProductItem {
  id: number;
  price: number;
  title: string;
  description?: string;
  categoryId: number;
  image: string;
  rating: number;
}

export default ProductItem;
