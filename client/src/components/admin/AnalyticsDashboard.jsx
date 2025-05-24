// client/src/components/admin/AnalyticsDashboard.jsx
<Bar
  data={{
    labels: ['Messages', 'Utilisateurs', 'Produits'],
    datasets: [{
      data: [messageCount, userCount, productCount],
      backgroundColor: theme.colors.primary
    }]
  }}
/>