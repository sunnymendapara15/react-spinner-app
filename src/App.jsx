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
    const value = trimmedValue;
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setNewItem('');
  };

  const handleRemoveItem = (indexToRemove) => {
    setItems((prev) => prev.filter((_, index) => index !== indexToRemove));
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
        <section className="hero-card">
          <p className="eyebrow">Simple spinner</p>
          <h1>Let the wheel decide what’s next</h1>
          <p className="hero-subtitle">
            Build a quick list, spin the glowing wheel, and celebrate whichever idea it lands on.
          </p>
        </section>

        <section className="panel-card">
          <div className="panel-top">
            <div className="input-row">
              <input
                type="text"
                placeholder="Add a name, meal, or activity"
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="button" onClick={handleAddItem} disabled={!trimmedValue}>
                Add item
              </button>
            </div>

            <div className="items-grid">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div className="item-chip" key={`${item}-${index}`}>
                    <span>{item}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${item}`}
                      onClick={() => handleRemoveItem(index)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-state">Start by adding at least one option.</p>
              )}
            </div>
          </div>

          <div className="panel-bottom">
            <div className="spinner-zone">
              <div className={`spinner-wheel ${spinning ? 'spinning' : ''}`}>
                <div className="spinner-label">
                  {items.length ? `${items.length} choices` : 'No choices yet'}
                </div>
              </div>
              <div className="spinner-pointer" aria-hidden="true" />
            </div>

            <button className="spin-button" type="button" onClick={handleSpin} disabled={!canSpin}>
              {spinning ? 'Spinning…' : 'Spin the wheel'}
            </button>
          </div>
        </section>

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
