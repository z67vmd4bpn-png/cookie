import { useState, useRef } from 'react';
import './style.css';

const COLS = 6;
const ROWS = 4;

const COOKIES = [
  {
    id: 'strawberry',
    name: 'いちご',
    kind: 'strawberry',
    color: '#f4b2bd',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
  },
  {
    id: 'flower',
    name: 'お花',
    kind: 'flower',
    color: '#f5d78c',
    shape: [[0, 0], [1, 0], [2, 0], [1, 1]],
  },
  {
    id: 'heart',
    name: 'ハート',
    kind: 'heart',
    color: '#f3a9bd',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
  },
  {
    id: 'mint',
    name: 'ミント',
    kind: 'mint',
    color: '#c7d99a',
    shape: [[0, 0], [1, 0], [2, 0], [3, 0]],
  },
  {
    id: 'star',
    name: 'お星さま',
    kind: 'star',
    color: '#f5d98c',
    shape: [[0, 0], [1, 0], [1, 1], [2, 1]],
  },
  {
    id: 'chocolate',
    name: 'チョコ',
    kind: 'chocolate',
    color: '#d9a66c',
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
    <svg viewBox="0 0 100 100" className={`cookie-art ${kind}`}>
      <defs>
        <linearGradient id="biscuit" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffe9b5" />
          <stop offset="100%" stopColor="#d99b53" />
        </linearGradient>
        <linearGradient id="jam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9da8" />
          <stop offset="100%" stopColor="#d83f58" />
        </linearGradient>
      </defs>

      {kind === 'strawberry' && (
        <>
          <path
            d="M50 12 C62 3 73 18 83 20 C99 29 91 49 79 64 L50 89 L21 64 C9 49 1 29 17 20 C27 18 38 3 50 12Z"
            fill="url(#biscuit)"
            stroke="#b87b43"
            strokeWidth="4"
          />
          <circle cx="50" cy="46" r="24" fill="url(#jam)" stroke="#ffe8c2" strokeWidth="4" />
          <path d="M37 36 Q44 27 51 34" fill="none" stroke="#fff2d9" strokeWidth="4" strokeLinecap="round" />
          {[[34, 49], [51, 37], [63, 48], [44, 61], [60, 62]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#ffe8c2" />
          ))}
        </>
      )}

      {kind === 'flower' && (
        <>
          <path
            d="M50 5 C61 5 61 25 68 31 C80 23 92 32 86 43 C83 50 73 50 70 54 C83 64 76 78 65 75 C60 74 56 68 51 66 C49 80 40 93 32 82 C27 75 32 66 32 61 C18 65 7 56 15 46 C20 40 28 41 32 36 C24 25 32 15 42 22 C47 26 48 14 50 5Z"
            fill="url(#biscuit)"
            stroke="#b87b43"
            strokeWidth="3"
          />
          <circle cx="50" cy="49" r="14" fill="#e5a923" stroke="#c88920" strokeWidth="3" />
          <circle cx="45" cy="44" r="4" fill="#fff0b9" />
        </>
      )}

      {kind === 'heart' && (
        <>
          <path
            d="M50 88 C40 77 9 56 9 34 C9 16 28 10 40 22 L50 31 L60 22 C72 10 91 16 91 34 C91 56 60 77 50 88Z"
            fill="url(#biscuit)"
            stroke="#b87b43"
            strokeWidth="4"
          />
          <path
            d="M50 75 C38 64 19 49 19 35 C19 25 29 21 39 29 L50 39 L61 29 C71 21 81 25 81 35 C81 49 62 64 50 75Z"
            fill="#f38eaa"
            stroke="#fff0d3"
            strokeWidth="3"
          />
          {[[35, 40], [65, 39], [29, 51], [71, 51], [43, 58], [58, 59]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#fff1d8" />
          ))}
        </>
      )}

      {kind === 'mint' && (
        <>
          <path
            d="M10 78 C12 39 42 11 90 12 C86 54 59 87 10 78Z"
            fill="#bfd28f"
            stroke="#809953"
            strokeWidth="4"
          />
          <path d="M15 73 Q47 48 82 17" fill="none" stroke="#f7edc7" strokeWidth="4" />
          {[
            [28, 59, 25, 44],
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
              stroke="#809953"
              strokeWidth="2"
            />
          ))}
        </>
      )}

      {kind === 'star' && (
        <>
          <path
            d="M50 5 L62 34 L94 37 L70 58 L77 91 L50 73 L23 91 L30 58 L6 37 L38 34Z"
            fill="url(#biscuit)"
            stroke="#b87b43"
            strokeWidth="4"
          />
          <path
            d="M50 17 L59 40 L82 42 L64 57 L69 78 L50 65 L31 78 L36 57 L18 42 L41 40Z"
            fill="#f9df9d"
            stroke="#fff0cf"
            strokeWidth="3"
          />
          {[[50, 30], [39, 48], [61, 48], [42, 59], [58, 59]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#fff8df" />
          ))}
        </>
      )}

      {kind === 'chocolate' && (
        <>
          <path
            d="M50 8 C65 8 72 18 80 24 C94 32 91 45 87 53 C92 68 77 80 66 81 C54 92 38 89 29 82 C14 80 7 67 12 53 C5 39 16 25 29 22 C36 12 42 8 50 8Z"
            fill="url(#biscuit)"
            stroke="#ad713e"
            strokeWidth="4"
          />
          {[[34, 31], [59, 29], [73, 43], [47, 47], [28, 52], [39, 67], [62, 68], [72, 57]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#70412e" />
              <circle cx={x - 1} cy={y - 1} r="1.7" fill="#a97550" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

function CookiePiece({ cookie, onPointerDown, onPointerMove, onPointerUp }) {
  return (
    <div
      className={`cookie-piece ${cookie.kind}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <CookieArt kind={cookie.kind} />
    </div>
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

    const shape = getShape(cookie);

    const current = {
      cookie,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      shape,
    };

    dragRef.current = current;
    setDrag(current);

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is not available in every browser.
    }
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
      setMessage('そこには置けないみたい。空いている場所を試してね。');
      return;
    }

    const nextBoard = [...board];

    cells.forEach(({ col, row }) => {
      nextBoard[row * COLS + col] = current.cookie.id;
    });

    const nextPlaced = {
      ...placed,
      [current.cookie.id]: {
        cells,
        col: startCol,
        row: startRow,
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

  function renderCookieInTin(cookie) {
    const item = placed[cookie.id];
    if (!item) return null;

    return item.cells.map(({ col, row }, index) => (
      <button
        key={`${cookie.id}-${index}`}
        type="button"
        className="tin-cookie"
        style={{
          gridColumn: col + 1,
          gridRow: row + 1,
          '--cookie-color': cookie.color,
        }}
        onClick={() => removeCookie(cookie.id)}
        aria-label={`${cookie.name}を取り出す`}
      >
        <CookieArt kind={cookie.kind} />
      </button>
    ));
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
                {COOKIES.map(renderCookieInTin)}
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
            const size = getSize(shape);

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
                  className="cookie-piece-grid"
                  style={{
                    gridTemplateColumns: `repeat(${size.width}, 34px)`,
                    gridTemplateRows: `repeat(${size.height}, 34px)`,
                  }}
                  onPointerDown={(event) => startDrag(event, cookie)}
                  onPointerMove={moveDrag}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                >
                  {shape.map(([x, y], index) => (
                    <div
                      key={index}
                      className="tray-cookie"
                      style={{
                        gridColumn: x + 1,
                        gridRow: y + 1,
                        '--cookie-color': cookie.color,
                      }}
                    >
                      <CookieArt kind={cookie.kind} />
                    </div>
                  ))}
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
          style={{
            left: drag.x,
            top: drag.y,
          }}
        >
          {drag.shape.map(([x, y], index) => (
            <div
              key={index}
              className="preview-cookie"
              style={{
                left: x * 30,
                top: y * 30,
                '--cookie-color': drag.cookie.color,
              }}
            >
              <CookieArt kind={drag.cookie.kind} />
            </div>
          ))}
        </div>
      )}

      <div className="bottom-actions">
        <button type="button" className="reset-button" onClick={resetGame}>
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
