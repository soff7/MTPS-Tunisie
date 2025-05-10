import { FaChartLine, FaIndustry, FaAward } from 'react-icons/fa';
import '../styles/History.css';

const History = () => {
  const milestones = [
    {
      year: '2000',
      icon: <FaIndustry />,
      title: 'Fondation',
      description: 'Création de MTPS avec une petite usine de fabrication.'
    },
    {
      year: '2008',
      icon: <FaChartLine />,
      title: 'Expansion',
      description: 'Agrandissement de nos installations et doublement de notre capacité de production.'
    },
    {
      year: '2015',
      icon: <FaAward />,
      title: 'Certification',
      description: 'Obtention de la certification ISO 9001 pour notre système de management de la qualité.'
    },
    {
      year: '2022',
      icon: <FaIndustry />,
      title: 'Innovation',
      description: 'Lancement de notre nouvelle gamme de tubes plastiques écologiques.'
    }
  ];

  return (
    <section className="history section-padding">
      <div className="container">
        <h2 className="section-title">Notre Histoire</h2>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
              <div className="timeline-content">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-icon">{milestone.icon}</div>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;