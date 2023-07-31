import { useState } from "react";

export default function App() {
  const [items, setItems ] = useState([])
  function handleAddItems(loro) {
    setItems((items) => [...items, loro]);
  }

  function handleDeleteItem(id) {
    setItems(items=> items.filter(item=> item.id !== id))
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem}/>
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
    
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥵 trip</h3>
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

function PackingList( {items, onDeleteItem} ) {
  return (
    <div className="list">
      <ul>
        {items.map((unique) => (
          <Item item={unique} onDeleteItem={onDeleteItem} key={unique.id}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
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
