// client/src/pages/admin/ProductsManagement.jsx
const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get('/api/products')
    .then(res => setProducts(res.data))
    .catch(err => console.error(err));
}, []);