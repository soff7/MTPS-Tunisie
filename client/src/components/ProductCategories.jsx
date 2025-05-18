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
    <>
      <section className="product-categories" id="categories">
        {/* Effets visuels similaires aux autres sections */}
        <div className="categories-particles"></div>
        <div className="categories-overlay"></div>
        <div className="categories-shape-1"></div>
        <div className="categories-shape-2"></div>
        
        <div className="categories-container">
          {/* Nouvelle mise en page du titre et sous-titre centrés */}
          <div className="section-header">
            <h2 className="section-title">Nos <span className="highlight">Catégories</span> </h2>
           
          </div>
          
          {/* Grille de cartes avec les 3 catégories */}
          <div className="categories-grid">
            {categories.map((category, index) => {
              // Ensure the category title is split safely
              const categoryId = category.title.split(' ')[1]
                ? category.title.split(' ')[1].toLowerCase()
                : category.title.toLowerCase(); // Fallback to the whole title if no second word
              
              return (
                <div className="category-card" key={index}>
                  {/* Circle icon container */}
                  <div className="category-icon-container">
                    {category.icon}
                  </div>
                  
                  {/* Card title */}
                  <h3 className="category-title">{category.title}</h3>
                  
                  {/* Card description */}
                  <p className="category-description">{category.description}</p>
                  
                  {/* Button with blue border and font */}
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
      
      {/* Séparateur animé pour la transition vers la section suivante */}
      <div className="section-divider"></div>
    </>
  );
};

export default ProductCategories;