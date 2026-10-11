import { useState } from 'react';
import './style.css';
const WIDTH = 6;
const HEIGHT = 4;
const COOKIES = [
  { id: 1, name: 'いちごクッキー', emoji: '🍓', color: '#f8d4d9', shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { id: 2, name: 'お花クッキー', emoji: '🌼', color: '#f7e7a9', shape: [[0, 0], [1, 0], [2, 0], [1, 1]] },
  { id: 3, name: 'ハートクッキー', emoji: '💗', color: '#f6c4d5', shape: [[0, 0], [1, 0], [0, 1]] },
  { id: 4, name: '抹茶クッキー', emoji: '🍵', color: '#c9dfb9', shape: [[0, 0], [1, 0], [2, 0]] },
  { id: 5, name: '星クッキー', emoji: '⭐', color: '#f4df91', shape: [[0, 0], [1, 0], [1, 1]] },
  { id: 6, name: 'チョコクッキー', emoji: '🍪', color: '#dfbd9e', shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
];
function rotateShape(shape) {
  const rotated = shape.map(([x, y]) => [y, -x]);
  const minX = Math.min(...rotated.map(([x]) => x));
  const minY = Math.min(...rotated.map(([, y]) => y));
  return rotated.map(([x, y]) => [x - minX, y - minY]);
}
export default function App() {
  const [board, setBoard] = useState(
    Array.from({ length: WIDTH * HEIGHT }, () => null)
  );
  const [selectedId, setSelectedId] = useState(1);
  const [rotations, setRotations] = useState({});
  const [placed, setPlaced] = useState([]);
  const [message, setMessage] = useState('クッキーを選んで、缶の中に並べてね。');
  const [history, setHistory] = useState([]);
  const selectedCookie = COOKIES.find((cookie) => cookie.id === selectedId);
  const currentShape = selectedCookie
    ? Array.from({ length: rotations[selectedId] || 0 }).reduce(
        (shape) => rotateShape(shape),
        selectedCookie.shape
      )
    : [];
  function saveHistory() {
    setHistory((previous) => [
      ...previous,
      { board: [...board], placed: [...placed] },
    ]);
  }
  function placeCookie(index) {
    if (!selectedCookie || placed.includes(selectedId)) {
      setMessage('このクッキーはすでに缶に入っているよ。');
      return;
    }
    const startX = index % WIDTH;
    const startY = Math.floor(index / WIDTH);
    const cells = currentShape.map(([x, y]) => ({
      x: startX + x,
      y: startY + y,
    }));
    const fits = cells.every(
      ({ x, y }) =>
        x >= 0 &&
        x < WIDTH &&
        y >= 0 &&
        y < HEIGHT &&
        board[y * WIDTH + x] === null
    );
    if (!fits) {
      setMessage('そこには置けないみたい。別の場所を試してね。');
      return;
    }
    saveHistory();
    const nextBoard = [...board];
    cells.forEach(({ x, y }) => {
      nextBoard[y * WIDTH + x] = selectedId;
    });
    const nextPlaced = [...placed, selectedId];
    setBoard(nextBoard);
    setPlaced(nextPlaced);
    setMessage(
      nextPlaced.length === COOKIES.length
        ? 'できあがり！すてきなクッキー缶になったね！'
        : 'いい感じ！次のクッキーも並べてみよう。'
    );
  }
  function rotateCookie() {
    if (!selectedCookie || placed.includes(selectedId)) {
      return;
    }
    setRotations((previous) => ({
      ...previous,
      [selectedId]: ((previous[selectedId] || 0) + 1) % 4,
    }));
  }
  function undo() {
    if (history.length === 0) {
      setMessage('戻せる操作がないよ。');
      return;
    }
    const previous = history[history.length - 1];
    setBoard(previous.board);
    setPlaced(previous.placed);
    setHistory((items) => items.slice(0, -1));
    setMessage('ひとつ前に戻したよ。');
  }
  function resetGame() {
    setBoard(Array.from({ length: WIDTH * HEIGHT }, () => null));
    setPlaced([]);
    setRotations({});
    setHistory([]);
    setSelectedId(1);
    setMessage('新しいクッキー缶を作ろう！');
  }
  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">A LITTLE COOKIE STORY</p>
        <h1>クッキー缶づくり</h1>
        <p className="subtitle">小さなクッキーを、きれいに詰めよう。</p>
      </header>
      <section className="game-card">
        <div className="tin-heading">
          <span>MY COOKIE TIN</span>
          <span>
            {placed.length} / {COOKIES.length}
          </span>
        </div>
        <div className="cookie-tin">
          <div className="cookie-grid">
            {board.map((cookieId, index) => {
              const cookie = COOKIES.find((item) => item.id === cookieId);
              return (
                <button
                  key={index}
                  type="button"
                  className={`grid-cell ${cookie ? 'filled' : ''}`}
                  style={
                    cookie
                      ? { backgroundColor: cookie.color }
                      : undefined
                  }
                  onClick={() => placeCookie(index)}
                  aria-label={`缶のマス ${index + 1}`}
                >
                  {cookie ? cookie.emoji : ''}
                </button>
              );
            })}
          </div>
        </div>
        <p className="message" role="status">
          {message}
        </p>
        <h2>クッキーを選ぶ</h2>
        <div className="cookie-list">
          {COOKIES.map((cookie) => (
            <button
              key={cookie.id}
              type="button"
              className={`cookie-choice ${
                selectedId === cookie.id ? 'selected' : ''
              } ${placed.includes(cookie.id) ? 'used' : ''}`}
              onClick={() => {
                setSelectedId(cookie.id);
                setMessage(`${cookie.name}を選んだよ。`);
              }}
              disabled={placed.includes(cookie.id)}
            >
              <span className="cookie-emoji">{cookie.emoji}</span>
              <span className="cookie-name">{cookie.name}</span>
              {placed.includes(cookie.id) && (
                <span className="check-mark">✓</span>
              )}
            </button>
          ))}
        </div>
        <div className="action-buttons">
          <button type="button" onClick={rotateCookie}>
            ↻ 回転
          </button>
          <button type="button" onClick={undo}>
            ↶ ひとつ戻す
          </button>
          <button type="button" onClick={resetGame}>
            ♡ やり直す
          </button>
        </div>
      </section>
      <footer className="app-footer">
        <p>take your time, enjoy a little sweetness.</p>
      </footer>
    </main>
  );
}
