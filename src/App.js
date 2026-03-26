import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");

  // GET products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // ADD product
  const addProduct = () => {
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name })
    })
    .then(res => res.json())
    .then(newProduct => {
      setProducts([...products, newProduct]);
      setName("");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product App</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product"
      />
      <button onClick={addProduct}>Add</button>

      <h2>Products:</h2>

      {products.map((p) => (
        <div key={p.id}>
          {p.name}
        </div>
      ))}
    </div>
  );
}

export default App;