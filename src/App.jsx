import { useState } from "react";

export default function App() {
  const [items, setItems ] = useState([])
  function handleAddItems(loro) {
    setItems((items) => [...items, loro]);
  }

  function handleDeleteItem(id) {
    setItems(items=> items.filter(item=> item.id !== id))
  }

  function toggleHandleItem(id) {
    setItems((items) => 
    items.map((item) => 
      item.id === id ? {...item, packed: !item.packed }
      : item
    )
    )
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItems={toggleHandleItem} />
      <Stats items={items} />
    </div>

  )
}

function Logo() {
  return <h1>🌴Far away💼</h1>
}

function Form( { onAddItems }) {
  const [description, setDescription ] = useState("")
  const [quantity, setQuantity ] = useState(1)

  function handleSubmit(e){
    e.preventDefault();
 
    if(!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);
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

function PackingList( {items, onDeleteItem, onToggleItems} ) {
  return (
    <div className="list">
      <ul>
        {items.map((unique) => (
          <Item item={unique} onDeleteItem={onDeleteItem} onToggleItems={onToggleItems} key={unique.id}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats( {items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numPercent = numPacked / numItems * 100;
  return (
    <footer className="stats">
      <em>👦 You have  {numItems} on your list, and you already packed {numPacked} ({numPercent} %)</em>
    </footer>
  )
}
