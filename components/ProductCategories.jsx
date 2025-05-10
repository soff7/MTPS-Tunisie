import { FaCubes, FaTint, FaPuzzlePiece } from 'react-icons/fa';
import '../styles/ProductCategories.css';

const ProductCategories = () => {
  const categories = [
    {
      icon: <FaCubes className="category-icon" />,
      title: 'Tubes PVC',
      description: 'Tubes en polychlorure de vinyle pour applications industrielles et construction'
    },
    {
      icon: <FaTint className="category-icon" />,
      title: 'Tubes PE',
      description: 'Tubes en polyéthylène pour applications eau potable et industrielles'
    },
    {
      icon: <FaPuzzlePiece className="category-icon" />,
      title: 'Accessoires',
      description: 'Raccords et pièces complémentaires pour vos installations de tuyauterie'
    }
  ];

  return (
    <section className="product-categories" id="categories">
      <div className="container">
        <h2 className="section-title">Nos Catégories des Produits</h2>
        <div className="categories-grid">
          {categories.map((category, index) => {
            // Ensure the category title is split safely
            const categoryId = category.title.split(' ')[1]
              ? category.title.split(' ')[1].toLowerCase()
              : category.title.toLowerCase(); // Fallback to the whole title if no second word

            return (
              <div className="category-card" key={index}>
                <div className="category-icon-container">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
                <a
                  href={`#${categoryId}`}
                  className="category-button"
                >
                  Voir produits
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;