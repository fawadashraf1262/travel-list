import { useState } from "react";

export default function App() {
  const [items, setItems ] = useState([])
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items}/>
      <Stats />
    </div>

  )
}

function Logo() {
  return <h1>🌴complementory💼</h1>
}

function Form( { onAddItems }) {
  const [description, setDescription ] = useState("")
  const [quantity, setQuantity ] = useState(1)

  function handleSubmit(e){
    e.preventDefault();
 
    if(!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    //nothing to commit i just want to maintain my streaks
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥵 trip</h3>
      <h2>Hrelo</h2>
      <select value={quantity} onChange={(e) => { setQuantity(Number(e.target.value))}}>
        {Array.from({ length: 20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." 
      value={description}
      onChange={(e) => {
        setDescription(e.target.value)
      }}
      />
      <button>Add </button>
    </form>
  );
}

function PackingList( {items} ) {
  return (
    <div className="list">
      <ul>
        {items.map((unique) => (
          <Item item={unique} key={unique.id}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>👦 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  )
}
