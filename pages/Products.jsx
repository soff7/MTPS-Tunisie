import { useState } from 'react';
import ProductsHero from '../components/ProductsHero';
import ProductCategories from '../components/ProductCategories';
import ProductCatalog from '../components/ProductCatalog';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Optionnellement, faire défiler jusqu'au catalogue
    document.getElementById('product-catalog').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <ProductsHero onSearch={handleSearch} />
      <ProductCategories />
      <ProductCatalog searchQuery={searchQuery} />
    </main>
  );
};

export default Products;