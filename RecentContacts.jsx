import '../styles/RecentContacts.css';

const RecentContacts = () => {
  const contacts = [
    { id: 1, name: 'Ali Ben Salah', email: 'ali@example.com', subject: 'Demande de devis', date: '2023-05-15' },
    { id: 2, name: 'Marie Dupont', email: 'marie@example.com', subject: 'Support technique', date: '2023-05-14' },
    { id: 3, name: 'Mohamed Karray', email: 'mohamed@example.com', subject: 'Information produit', date: '2023-05-12' },
    { id: 4, name: 'Sophie Martin', email: 'sophie@example.com', subject: 'Demande de catalogue', date: '2023-05-10' }
  ];

  return (
    <div className="recent-contacts">
      <h2>Messages récents</h2>
      <div className="contacts-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>{contact.date}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Voir</button>
                  <button className="btn btn-sm btn-outline">Répondre</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentContacts;