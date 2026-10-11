import { useState, useRef } from 'react';
import './style.css';

const COLS = 6;
const ROWS = 4;
const CELL = 40;

const COOKIES = [
  {
    id: 'strawberry',
    name: 'いちご',
    kind: 'strawberry',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
  },
  {
    id: 'flower',
    name: 'お花',
    kind: 'flower',
    shape: [[0, 0], [1, 0], [2, 0], [1, 1]],
  },
  {
    id: 'heart',
    name: 'ハート',
    kind: 'heart',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
  },
  {
    id: 'mint',
    name: 'ミント',
    kind: 'mint',
    shape: [[0, 0], [1, 0], [2, 0], [3, 0]],
  },
  {
    id: 'star',
    name: 'お星さま',
    kind: 'star',
    shape: [[0, 0], [1, 0], [1, 1], [2, 1]],
  },
  {
    id: 'chocolate',
    name: 'チョコ',
    kind: 'chocolate',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
  },
];

function rotateShape(shape) {
  const rotated = shape.map(([x, y]) => [-y, x]);
  const minX = Math.min(...rotated.map(([x]) => x));
  const minY = Math.min(...rotated.map(([, y]) => y));

  return rotated.map(([x, y]) => [x - minX, y - minY]);
}

function getSize(shape) {
  return {
    width: Math.max(...shape.map(([x]) => x)) + 1,
    height: Math.max(...shape.map(([, y]) => y)) + 1,
  };
}

function CookieArt({ kind }) {
  return (
    <svg
      className={`cookie-art cookie-art-${kind}`}
      viewBox="0 0 100 100"
      aria-label={kind}
      role="img"
    >
      <defs>
        <radialGradient id={`${kind}-biscuit`} cx="30%" cy="25%" r="85%">
          <stop offset="0%" stopColor="#ffe9b6" />
          <stop offset="65%" stopColor="#eab36b" />
          <stop offset="100%" stopColor="#b9773c" />
        </radialGradient>

        <radialGradient id={`${kind}-jam`} cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#ff9da6" />
          <stop offset="100%" stopColor="#c83248" />
        </radialGradient>

        <filter id={`${kind}-shadow`} x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2"
            floodColor="#8d5b35"
            floodOpacity=".3"
          />
        </filter>
      </defs>

      <g
        filter={`url(#${kind}-shadow)`}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {kind === 'strawberry' && (
          <>
            <path
              d="M50 8 C61 8 66 18 76 18 C91 18 95 34 88 47 C83 58 69 79 50 91 C31 79 17 58 12 47 C5 34 9 18 24 18 C34 18 39 8 50 8Z"
              fill={`url(#${kind}-biscuit)`}
              stroke="#ad703a"
              strokeWidth="3"
            />
            <path
              d="M50 25 C63 25 73 35 73 48 C73 61 62 70 50 70 C38 70 27 61 27 48 C27 35 37 25 50 25Z"
              fill={`url(#${kind}-jam)`}
              stroke="#f9d8ad"
              strokeWidth="3"
            />
            <path
              d="M37 37 Q42 31 47 35"
              fill="none"
              stroke="#fff2d7"
              strokeWidth="4"
            />
            {[[37, 47], [62, 43], [44, 59], [58, 58], [51, 39]].map(
              ([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="1.7" fill="#ffe9c5" />
              )
            )}
          </>
        )}

        {kind === 'flower' && (
          <>
            <path
              d="M50 6 C61 6 61 25 68 30 C78 24 91 31 87 42 C85 49 75 50 72 53 C82 62 78 76 67 76 C60 76 56 69 51 67 C49 80 42 92 33 84 C26 78 32 67 32 61 C19 65 8 57 15 47 C18 41 28 41 32 37 C24 27 31 16 41 22 C47 25 48 16 50 6Z"
              fill={`url(#${kind}-biscuit)`}
              stroke="#ae713d"
              strokeWidth="2.5"
            />
            <circle
              cx="50"
              cy="49"
              r="13"
              fill="#e8aa2d"
              stroke="#c78920"
              strokeWidth="3"
            />
            <circle cx="46" cy="45" r="3" fill="#fff0b3" />
          </>
        )}

        {kind === 'heart' && (
          <>
            <path
              d="M50 88 C42 79 10 57 9 35 C8 18 26 10 39 20 L50 29 L61 20 C74 10 92 18 91 35 C90 57 58 79 50 88Z"
              fill={`url(#${kind}-biscuit)`}
              stroke="#b1743c"
              strokeWidth="3"
            />
            <path
              d="M50 76 C40 67 19 50 18 35 C18 25 28 20 38 27 L50 37 L62 27 C72 20 82 25 82 35 C81 50 60 67 50 76Z"
              fill="#f38da1"
              stroke="#ffe6c4"
              strokeWidth="3"
            />
            {[[34, 39], [63, 37], [29, 49], [71, 49], [42, 59], [58, 60]].map(
              ([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2" fill="#fff1d7" />
              )
            )}
          </>
        )}

        {kind === 'mint' && (
          <>
            <path
              d="M10 78 C11 39 40 10 89 12 C86 54 59 87 10 78Z"
              fill="#b8ca80"
              stroke="#7e9954"
              strokeWidth="3"
            />
            <path
              d="M15 73 Q46 49 82 17"
              fill="none"
              stroke="#f5edc2"
              strokeWidth="4"
            />
            {[
              [28, 58, 25, 44],
              [41, 48, 36, 32],
              [55, 37, 51, 24],
              [38, 57, 50, 68],
              [53, 45, 67, 54],
              [67, 32, 77, 40],
            ].map(([x1, y1, x2, y2], i) => (
              <path
                key={i}
                d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2} ${x2} ${y2}`}
                fill="none"
                stroke="#799653"
                strokeWidth="2"
              />
            ))}
          </>
        )}

        {kind === 'star' && (
          <>
            <path
              d="M50 6 L62 34 L92 37 L69 57 L76 88 L50 72 L24 88 L31 57 L8 37 L38 34Z"
              fill={`url(#${kind}-biscuit)`}
              stroke="#ad703b"
              strokeWidth="3"
            />
            <path
              d="M50 15 L60 39 L83 41 L65 57 L71 78 L50 65 L29 78 L35 57 L17 41 L40 39Z"
              fill="#f8d891"
              stroke="#fff0c8"
              strokeWidth="2"
            />
            {[[50, 29], [37, 47], [64, 47], [42, 58], [58, 58]].map(
              ([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="1.8" fill="#fff8df" />
              )
            )}
          </>
        )}

        {kind === 'chocolate' && (
          <>
            <path
              d="M50 8 C65 8 70 18 80 23 C92 30 92 43 87 52 C91 66 78 79 66 81 C54 93 38 89 29 82 C14 80 7 67 12 53 C5 39 16 25 29 22 C35 12 42 8 50 8Z"
              fill={`url(#${kind}-biscuit)`}
              stroke="#ad713e"
              strokeWidth="3"
            />
            {[[34, 31], [59, 29], [73, 43], [47, 47], [28, 52], [39, 67], [62, 68], [72, 57]].map(
              ([x, y], i) => (
                <g key={i}>
                  <ellipse cx={x} cy={y + 1} rx="5" ry="5.5" fill="#70402e" />
                  <ellipse cx={x - 1} cy={y - 1} rx="2" ry="2" fill="#a97450" />
                </g>
              )
            )}
          </>
        )}
      </g>
    </svg>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(COLS * ROWS).fill(null));
  const [placed, setPlaced] = useState({});
  const [rotations, setRotations] = useState({});
  const [drag, setDrag] = useState(null);
  const [message, setMessage] = useState('クッキーをつまんで、缶の中に運んでね。');
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

    const current = {
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

    const next = {
      ...current,
      x: event.clientX,
      y: event.clientY,
    };

    dragRef.current = next;
    setDrag(next);
  }

  function endDrag(event) {
    const current = dragRef.current;

    if (!current || current.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDrag(null);

    const moved =
      Math.abs(current.x - current.startX) > 8 ||
      Math.abs(current.y - current.startY) > 8;

    if (!moved) return;

    const rect = tinRef.current?.getBoundingClientRect();

    if (
      !rect ||
      current.x < rect.left ||
      current.x >= rect.right ||
      current.y < rect.top ||
      current.y >= rect.bottom
    ) {
      setMessage('缶の中までクッキーを運んでね。');
      return;
    }

    const cellWidth = rect.width / COLS;
    const cellHeight = rect.height / ROWS;

    const centerCol = Math.floor((current.x - rect.left) / cellWidth);
    const centerRow = Math.floor((current.y - rect.top) / cellHeight);

    const size = getSize(current.shape);

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
      setMessage('そこには入らないみたい。空いている場所を試してね。');
      return;
    }

    const nextBoard = [...board];

    cells.forEach(({ col, row }) => {
      nextBoard[row * COLS + col] = current.cookie.id;
    });

    const minCol = Math.min(...cells.map((cell) => cell.col));
    const minRow = Math.min(...cells.map((cell) => cell.row));

    const nextPlaced = {
      ...placed,
      [current.cookie.id]: {
        cells,
        col: minCol,
        row: minRow,
        shape: current.shape,
      },
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

  function renderPlacedCookie(cookie) {
    const item = placed[cookie.id];

    if (!item) return null;

    const size = getSize(item.shape);

    return (
      <button
        key={cookie.id}
        type="button"
        className="placed-cookie"
        style={{
          gridColumn: `${item.col + 1} / span ${size.width}`,
          gridRow: `${item.row + 1} / span ${size.height}`,
        }}
        onClick={() => removeCookie(cookie.id)}
        aria-label={`${cookie.name}を取り出す`}
      >
        <CookieArt kind={cookie.kind} />
      </button>
    );
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

      <section className="tin-panel">
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
                {board.map((id, index) => (
                  <div
                    key={index}
                    className={`tin-cell ${id ? 'occupied' : ''}`}
                  />
                ))}

                {COOKIES.map(renderPlacedCookie)}
              </div>
            </div>
          </div>
        </div>

        <div className="message-card" role="status">
          <span className="message-icon">♥</span>
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

            return (
              <article className="cookie-card" key={cookie.id}>
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
                >
                  <CookieArt kind={cookie.kind} />
                </div>

                <p className="cookie-label">{cookie.name}</p>
                <p className="cookie-hint">つまんで運ぶ</p>
              </article>
            );
          })}
        </div>
      </section>

      {drag && (
        <div
          className="drag-preview"
          style={{ left: drag.x, top: drag.y }}
          aria-hidden="true"
        >
          <CookieArt kind={drag.cookie.kind} />
        </div>
      )}

      <div className="bottom-actions">
        <button
          type="button"
          className="reset-button"
          onClick={resetGame}
        >
          ↻　最初からやり直す
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
            <div className="success-cookie">
              <CookieArt kind="strawberry" />
            </div>
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
