import { useState } from 'react'
import headerImage from './assets/sunsetpicture.png'
import './App.css'

function App() {
  const products = [
    {name: 'AMD Ryzen 5 3600', price: 245 },
    {name: 'Lego Porsche 911', price: 911 },
    {name: 'Lego MB G63 AMG', price: 63 },
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const total = selectedProduct.price * quantity;

  return (
    <div>

      <Header image={headerImage} title="Welcome to the Product Page!" />
      <OrderForm
        products={products}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}/>
      <OrderInfo
        product={selectedProduct.name}
        quantity={quantity}
        total={total}/>
    </div>
  );
}

function OrderForm({
  products,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
}) {
  const handleProductChange = (event) => {
    const product = products.find(p => p.name === event.target.value);
    setSelectedProduct(product);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <br></br>
      <b>Select product</b>
      <div className= "orderform">
        <table>
          <tbody>
            <tr>
              <td>
                <p>Product:</p>
              </td>
              <td>
                <select
                  value={selectedProduct.name}
                  onChange={handleProductChange}
                >
                  {products.map((product, index) => (
                    <option key={index} value={product.name}>
                      {product.name} - ({product.price}€)
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <p>Quantity:</p>
              </td>
              <td>
                <button onClick={decrease}>-</button>
                <span style={{ margin: '0 10px' }}>{quantity}</span>
                <button onClick={increase}>+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderInfo({ product, quantity, total }) {
  return (
    <div className="orderinfo">
      <b>Order info</b>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product}</td>
            <td>{quantity}</td>
            <td>{total}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Header(props) {
  return (
    <div className="header">
      <img src={props.image}/>
      <h1>{props.title}</h1>
    </div>
  );
}

export default App;
