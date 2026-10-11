import { useState, useRef } from 'react';
import './style.css';

const COLS = 6;
const ROWS = 4;

const COOKIES = [
  { id: 'strawberry', name: 'いちご', emoji: '🍓', color: '#f7d5dc', shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { id: 'flower', name: 'お花', emoji: '🌼', color: '#f7e5a9', shape: [[0, 0], [1, 0], [2, 0], [1, 1]] },
  { id: 'heart', name: 'ハート', emoji: '💗', color: '#f5c4d4', shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { id: 'mint', name: 'ミント', emoji: '🌿', color: '#d5e6c9', shape: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { id: 'star', name: 'お星さま', emoji: '⭐', color: '#f5df9e', shape: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { id: 'chocolate', name: 'チョコ', emoji: '🍪', color: '#e4c5a5', shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
];

function rotateShape(shape) {
  const next = shape.map(([x, y]) => [-y, x]);
  const minX = Math.min(...next.map(([x]) => x));
  const minY = Math.min(...next.map(([, y]) => y));
  return next.map(([x, y]) => [x - minX, y - minY]);
}

function shapeSize(shape) {
  return {
    width: Math.max(...shape.map(([x]) => x)) + 1,
    height: Math.max(...shape.map(([, y]) => y)) + 1,
  };
}

export default function App() {
  const [board, setBoard] = useState(Array(COLS * ROWS).fill(null));
  const [placed, setPlaced] = useState({});
  const [rotations, setRotations] = useState({});
  const [message, setMessage] = useState('クッキーをつまんで、缶の中に運んでね。');
  const [drag, setDrag] = useState(null);
  const [finished, setFinished] = useState(false);
  const tinRef = useRef(null);
  const dragRef = useRef(null);

  function getShape(cookie) {
    let shape = cookie.shape;
    for (let i = 0; i < (rotations[cookie.id] || 0); i += 1) {
      shape = rotateShape(shape);
    }
    return shape;
  }

  function startDrag(event, cookie) {
    if (placed[cookie.id] || finished) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const current = {
      id: cookie.id,
      cookie,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      shape: getShape(cookie),
    };

    dragRef.current = current;
    setDrag(current);
  }

  function moveDrag(event) {
    const current = dragRef.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const next = { ...current, x: event.clientX, y: event.clientY };
    dragRef.current = next;
    setDrag(next);
  }

  function endDrag(event) {
    const current = dragRef.current;
    if (!current || current.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDrag(null);

    const moved =
      Math.abs(current.x - current.startX) > 10 ||
      Math.abs(current.y - current.startY) > 10;

    if (!moved) {
      setMessage('クッキーを指でつかんで、缶の中まで運んでね。');
      return;
    }

    const tin = tinRef.current;
    if (!tin) return;

    const rect = tin.getBoundingClientRect();

    if (
      current.x < rect.left ||
      current.x > rect.right ||
      current.y < rect.top ||
      current.y > rect.bottom
    ) {
      setMessage('缶の中にクッキーを運んでみてね。');
      return;
    }

    const cellWidth = rect.width / COLS;
    const cellHeight = rect.height / ROWS;
    const centerCol = Math.floor((current.x - rect.left) / cellWidth);
    const centerRow = Math.floor((current.y - rect.top) / cellHeight);
    const size = shapeSize(current.shape);

    const startCol = centerCol - Math.floor(size.width / 2);
    const startRow = centerRow - Math.floor(size.height / 2);

    const cells = current.shape.map(([x, y]) => ({
      col: startCol + x,
      row: startRow + y,
    }));

    const canPlace = cells.every(({ col, row }) =>
      col >= 0 &&
      col < COLS &&
      row >= 0 &&
      row < ROWS &&
      board[row * COLS + col] === null
    );

    if (!canPlace) {
      setMessage('そこには入らないみたい。別の場所を試してね。');
      return;
    }

    const nextBoard = [...board];

    cells.forEach(({ col, row }) => {
      nextBoard[row * COLS + col] = current.id;
    });

    const nextPlaced = {
      ...placed,
      [current.id]: { cells },
    };

    setBoard(nextBoard);
    setPlaced(nextPlaced);

    if (Object.keys(nextPlaced).length === COOKIES.length) {
      setFinished(true);
      setMessage('完成！すてきなクッキー缶ができたね。');
    } else {
      setMessage('いい感じ！次のクッキーも詰めてみよう。');
    }
  }

  function rotateCookie(cookie) {
    if (placed[cookie.id] || finished) return;

    setRotations((old) => ({
      ...old,
      [cookie.id]: ((old[cookie.id] || 0) + 1) % 4,
    }));

    setMessage(`${cookie.name}の向きを変えたよ。`);
  }

  function removeCookie(id) {
    const item = placed[id];
    if (!item) return;

    const nextBoard = [...board];

    item.cells.forEach(({ col, row }) => {
      nextBoard[row * COLS + col] = null;
    });

    const nextPlaced = { ...placed };
    delete nextPlaced[id];

    setBoard(nextBoard);
    setPlaced(nextPlaced);
    setFinished(false);
    setMessage('クッキーを缶から取り出したよ。');
  }

  function resetGame() {
    setBoard(Array(COLS * ROWS).fill(null));
    setPlaced({});
    setRotations({});
    setDrag(null);
    dragRef.current = null;
    setFinished(false);
    setMessage('新しいクッキー缶を作ろう！');
  }

  return (
    <main className="storybook">
      <header className="page-header">
        <div className="brand-mark">✿</div>
        <p className="eyebrow">THE LITTLE COOKIE SHOP</p>
        <h1>ちいさなクッキー缶</h1>
        <p className="intro">
          とっておきのお菓子を、
          <br />
          ひとつずつ詰めていこう。
        </p>
        <div className="decorative-line">✧　♡　✧</div>
      </header>

      <section className="tin-section">
        <div className="section-heading">
          <span className="heading-flower">✿</span>
          <div>
            <h2>MY COOKIE TIN</h2>
            <p>クッキーをきれいに並べてね</p>
          </div>
          <span className="count-badge">
            {Object.keys(placed).length}/{COOKIES.length}
          </span>
        </div>

        <div className="tin-outer">
          <div className="tin-rim">
            <div className="tin-inner" ref={tinRef}>
              <div className="tin-grid">
                {board.map((id, index) => {
                  const cookie = COOKIES.find((item) => item.id === id);

                  return (
                    <button
                      key={index}
                      type="button"
                      className={`tin-cell ${cookie ? 'occupied' : ''}`}
                      style={cookie ? { '--cookie-color': cookie.color } : undefined}
                      onClick={() => cookie && removeCookie(cookie.id)}
                      aria-label={cookie ? `取り出す: ${cookie.name}` : '空きマス'}
                    >
                      {cookie && <span className="placed-cookie">{cookie.emoji}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="message-card" role="status">
          <span className="message-icon">♡</span>
          <p>{message}</p>
        </div>
      </section>

      <section className="cookie-section">
        <div className="section-heading">
          <span className="heading-flower">✿</span>
          <div>
            <h2>FRESHLY BAKED</h2>
            <p>クッキーをつまんで缶へ運ぼう</p>
          </div>
        </div>

        <div className="cookie-tray">
          {COOKIES.filter((cookie) => !placed[cookie.id]).map((cookie) => {
            const shape = getShape(cookie);
            const size = shapeSize(shape);

            return (
              <div className="cookie-card" key={cookie.id}>
                <button
                  type="button"
                  className="rotate-button"
                  onClick={() => rotateCookie(cookie)}
                  aria-label={`${cookie.name}を回転`}
                >
                  ↻
                </button>

                <div
                  className="draggable-cookie"
                  onPointerDown={(event) => startDrag(event, cookie)}
                  onPointerMove={moveDrag}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  style={{ '--cookie-color': cookie.color }}
                >
                  <div
                    className="cookie-shape"
                    style={{
                      width: size.width * 27,
                      height: size.height * 27,
                    }}
                  >
                    {shape.map(([x, y], index) => (
                      <span
                        key={index}
                        className="cookie-piece"
                        style={{
                          left: x * 27,
                          top: y * 27,
                          backgroundColor: cookie.color,
                        }}
                      >
                        {index === 0 ? cookie.emoji : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="cookie-label">{cookie.name}</p>
                <p className="cookie-hint">つまんで運ぶ</p>
              </div>
            );
          })}
        </div>
      </section>

      {drag && (
        <div
          className="drag-preview"
          style={{ left: drag.x, top: drag.y, '--cookie-color': drag.cookie.color }}
        >
          {drag.cookie.emoji}
        </div>
      )}

      <div className="bottom-actions">
        <button type="button" className="reset-button" onClick={resetGame}>
          ↺　最初からやり直す
        </button>
      </div>

      <footer className="page-footer">
        ✧　made with love & a little sweetness　✧
      </footer>

      {finished && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-decoration">✿ ♡ ✿</div>
            <p className="success-eyebrow">WONDERFUL!</p>
            <h2>できあがり！</h2>
            <div className="success-cookie">🍪</div>
            <p>
              とってもすてきな
              <br />
              クッキー缶ができたね。
            </p>
            <button type="button" onClick={resetGame}>
              もう一度つくる
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
