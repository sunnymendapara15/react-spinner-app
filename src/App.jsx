import { useState } from 'react';

const initialItems = ['Pizza night', 'Quick coffee', 'Outdoor walk'];

function App() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');

  const trimmedValue = newItem.trim();
  const canSpin = items.length > 0 && !spinning;

  const handleAddItem = () => {
    const value = newItem.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setNewItem('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddItem();
    }
  };

  const handleSpin = () => {
    if (!canSpin) return;
    setSpinning(true);
    setResult('');
    const chosen = items[Math.floor(Math.random() * items.length)];
    window.setTimeout(() => {
      setSpinning(false);
      setResult(chosen);
    }, 2000);
  };

  return (
    <div className="App">
      <main>
        <p className="eyebrow">Simple spinner</p>
        <h1>Pick a winner with a spin</h1>
        <p className="subtitle">
          Add names, meals, or activities and spin to have the wheel choose one at random.
        </p>

        <section className="input-group">
          <input
            type="text"
            placeholder="Add a name or item"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={handleAddItem} disabled={!trimmedValue}>
            Add
          </button>
        </section>

        <div className="items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <span className="item-badge" key={`${item}-${index}`}>
                {item}
              </span>
            ))
          ) : (
            <p className="empty-state">Start by adding at least one option.</p>
          )}
        </div>

        <div className="spinner-zone">
          <div className={`spinner-wheel ${spinning ? 'spinning' : ''}`}>
            <div className="spinner-label">
              {items.length ? `${items.length} choices` : 'No choices'}
            </div>
          </div>
          <div className="spinner-pointer" aria-hidden="true" />
        </div>

        <button className="spin-button" type="button" onClick={handleSpin} disabled={!canSpin}>
          {spinning ? 'Spinning…' : 'Spin the wheel'}
        </button>

        {result && (
          <div className="result-card" role="status" aria-live="polite">
            <p className="result-label">Result</p>
            <p className="result-value">{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
