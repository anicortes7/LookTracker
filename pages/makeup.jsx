import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function Makeup({ products = [] }) {
  return (
    <>
      <Navbar />
      <main className="container my-5">
        <h1 className="title-looktracker mb-4">Makeup Collection</h1>
        <div className="row">
          {products.length === 0 ? (
            <p>No hay productos cargados todavía.</p>
          ) : (
            products.map(({ name, brand, category, subcategory, image }) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={name}>
                <ProductCard
                  name={name}
                  brand={brand}
                  category={category}
                  subcategory={subcategory}
                  image={image}
                />
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
