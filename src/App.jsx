import { useRef, useState } from "react";
import logo from "./assets/bunnyLogo.png";
import "./styles/App.css";
import { findBestCart } from "./utils/findBestCart";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [items, setItems] = useState([]);
  const addItemRef = useRef(null);
  const formRef = useRef(null);
  const minCartRef = useRef(null);
  const maxCartRef = useRef(null);
  const [validCarts, setValidCarts] = useState([]);
  const [invalidCarts, setInvalidCarts] = useState([]);

  function addItem(e) {
    e.preventDefault();
    const newItem = parseInt(addItemRef.current.value);
    if (newItem > 0 && !isNaN(newItem)) {
      setItems((prevItems) => [...prevItems, parseInt(newItem)]);
    }
    formRef.current.reset();
  }

  function calcCart() {
    const minCart = parseInt(minCartRef.current.value);
    const maxCart = parseInt(maxCartRef.current.value);
    const { validCarts, invalidCarts } = findBestCart(items, minCart, maxCart);
    setValidCarts(validCarts);
    setInvalidCarts(invalidCarts);
  }

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Bunny logo" />
      </div>
      <h1>Cart Bunny</h1>
      <div className="card">
        <div className="minmax">
          <div>
            <label htmlFor="minCart">Min</label>
            <input
              type="number"
              id="minCart"
              name="minCart"
              ref={minCartRef}
              required
            />
          </div>
          <div>
            <label htmlFor="maxCart">Max</label>
            <input
              type="number"
              id="maxCart"
              name="maxCart"
              ref={maxCartRef}
              required
            />
          </div>
        </div>
        <form ref={formRef}>
          <input
            type="number"
            id="addItem"
            name="addItem"
            ref={addItemRef}
            required
          />
          <button onClick={addItem}>Add item</button>
        </form>
        {items.length > 0 ? (
          <div>
            <h4>Original cart: </h4>
            <p>{items.join(", ")}</p>
          </div>
        ) : (
          ""
        )}
        <button onClick={calcCart}>Calculate best cart split</button>
        {validCarts.length > 0 ? (
          <div>
            <h4>Valid carts: </h4>
            <ul>
              {validCarts.map((cart, index) => {
                return (
                  <li key={uuidv4()}>
                    <p>
                      <strong>Cart {index + 1}:</strong> {cart.join(", ")}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
        {invalidCarts.length > 0 ? (
          <div>
            <h4>Invalid carts: </h4>
            <ul>
              {invalidCarts.map((cart, index) => {
                return (
                  <li key={uuidv4()}>
                    <p>
                      <strong>Cart {index + 1}:</strong> {cart.join(", ")}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="read-the-docs">Save money. Cart bunny.</p>
    </>
  );
}

export default App;
