import { FaCubes, FaTint } from 'react-icons/fa';
import '../styles/ProductCategories.css';

const ProductCategories = () => {
  const categories = [
    {
      icon: <FaCubes className="category-icon" />,
      title: 'Tubes PVC',
      description: 'Tubes en polychlorure de vinyle pour applications industrielles et construction',
      id: 'pvc'
    },
    {
      icon: <FaTint className="category-icon" />,
      title: 'Tubes PE',
      description: 'Tubes en polyéthylène pour applications eau potable et industrielles',
      id: 'pehd' // Utilisé 'pehd' pour correspondre à ProductCatalog.jsx
    },
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
            <h2 className="section-title">Nos <span className="highlight">Catégories</span></h2>
          </div>
          
          {/* Grille de cartes avec les 3 catégories */}
          <div className="categories-grid">
            {categories.map((category, index) => (
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
                  href={`#products?category=${category.id}`} // Ajout d'un paramètre d'URL pour la catégorie
                  className="category-button"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector('#products');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                      // Simuler le clic sur l'onglet correspondant dans ProductCatalog
                      const tab = document.querySelector(`.catalog-tab[data-tab="${category.id}"]`);
                      if (tab) tab.click();
                    }
                  }}
                >
                  Voir produits
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Séparateur animé pour la transition vers la section suivante */}
      <div className="section-divider"></div>
    </>
  );
};

export default ProductCategories;