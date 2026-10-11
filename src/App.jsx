import { useState, useRef } from 'react';
import './style.css';

const COLS = 6;
const ROWS = 4;
const CELL = 27;

const COOKIES = [
  {
    id: 'strawberry',
    name: 'いちご',
    color: '#e9b46f',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
    kind: 'strawberry',
  },
  {
    id: 'flower',
    name: 'お花',
    color: '#edc779',
    shape: [[0, 0], [1, 0], [2, 0], [1, 1]],
    kind: 'flower',
  },
  {
    id: 'heart',
    name: 'ハート',
    color: '#e9b46f',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
    kind: 'heart',
  },
  {
    id: 'mint',
    name: 'ミント',
    color: '#b9c987',
    shape: [[0, 0], [1, 0], [2, 0], [3, 0]],
    kind: 'mint',
  },
  {
    id: 'star',
    name: 'お星さま',
    color: '#e9b46f',
    shape: [[0, 0], [1, 0], [1, 1], [2, 1]],
    kind: 'star',
  },
  {
    id: 'chocolate',
    name: 'チョコ',
    color: '#d9a365',
    shape: [[0, 0], [1, 0], [0, 1], [1, 1]],
    kind: 'chocolate',
  },
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

function CookieArt({ kind, size = 76 }) {
  const id = `cookie-${kind}`;

  const common = {
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
  };

  return (
    <svg
      className={`cookie-art cookie-art-${kind}`}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`${kind}クッキー`}
    >
      <defs>
        <radialGradient id={`${id}-biscuit`} cx="35%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#ffe6aa" />
          <stop offset="55%" stopColor="#edb96f" />
          <stop offset="100%" stopColor="#bd783d" />
        </radialGradient>

        <radialGradient id={`${id}-jam`} cx="35%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#ff9a9e" />
          <stop offset="65%" stopColor="#d94350" />
          <stop offset="100%" stopColor="#a92738" />
        </radialGradient>

        <linearGradient id={`${id}-mint`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e9a8" />
          <stop offset="55%" stopColor="#b7ca7b" />
          <stop offset="100%" stopColor="#839f59" />
        </linearGradient>

        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2.5"
            floodColor="#95613b"
            floodOpacity="0.28"
          />
        </filter>
      </defs>

      <g filter={`url(#${id}-shadow)`} {...common}>
        {kind === 'strawberry' && (
          <>
            <path
              d="M50 9 C59 9 64 17 72 17 C83 17 91 29 91 41 C91 52 83 59 79 68 C74 80 63 91 50 91 C37 91 26 80 21 68 C17 59 9 52 9 41 C9 29 17 17 28 17 C36 17 41 9 50 9 Z"
              fill={`url(#${id}-biscuit)`}
              stroke="#b77b43"
              strokeWidth="2"
            />
            <path
              d="M50 17 C59 17 64 24 72 24 C79 24 84 32 84 41 C84 50 77 57 73 65 C68 76 59 83 50 83 C41 83 32 76 27 65 C23 57 16 50 16 41 C16 32 21 24 28 24 C36 24 41 17 50 17 Z"
              fill="#f8d99c"
              stroke="#fceac2"
              strokeWidth="2"
            />
            <path
              d="M50 30 C61 30 70 39 70 49 C70 61 61 69 50 69 C39 69 30 61 30 49 C30 39 39 30 50 30 Z"
              fill={`url(#${id}-jam)`}
              stroke="#b94b42"
              strokeWidth="2"
            />
            <path
              d="M39 39 Q43 34 48 35"
              stroke="#ffe5d0"
              strokeWidth="3"
              opacity="0.8"
            />
            {[
              [28, 33], [72, 34], [24, 54], [76, 54],
              [36, 74], [64, 74], [48, 23], [51, 77],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="#fff0c8" />
            ))}
          </>
        )}

        {kind === 'flower' && (
          <>
            <path
              d="M50 5 C58 5 61 19 67 24 C73 17 86 17 90 25 C94 33 84 42 79 48 C88 53 94 65 88 72 C82 79 70 72 63 68 C62 80 57 93 49 93 C40 93 37 80 36 68 C28 74 16 79 10 71 C4 63 13 52 21 47 C12 41 5 31 11 24 C18 16 30 23 36 27 C39 16 42 5 50 5 Z"
              fill={`url(#${id}-biscuit)`}
              stroke="#b77b43"
              strokeWidth="2"
            />
            <path
              d="M50 12 C57 12 59 24 64 29 C70 24 80 23 84 29 C87 36 77 42 72 47 C79 52 86 62 81 68 C76 74 65 66 60 64 C59 74 56 86 50 86 C44 86 41 74 40 64 C33 68 24 74 19 68 C14 62 21 52 28 47 C22 42 13 35 18 29 C23 23 33 27 39 30 C42 20 44 12 50 12 Z"
              fill="#ffe4a5"
              stroke="#fff0c8"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="49"
              r="12"
              fill="#e4a92f"
              stroke="#c48722"
              strokeWidth="2"
            />
            <circle cx="46" cy="45" r="3" fill="#fff0b5" />
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * Math.PI) / 4;
              return (
                <circle
                  key={i}
                  cx={50 + Math.cos(angle) * 27}
                  cy={49 + Math.sin(angle) * 27}
                  r="1.5"
                  fill="#fff5d7"
                />
              );
            })}
          </>
        )}

        {kind === 'heart' && (
          <>
            <path
              d="M50 87 C43 79 11 57 10 35 C9 18 25 10 38 18 L50 28 L62 18 C75 10 91 18 90 35 C89 57 57 79 50 87 Z"
              fill={`url(#${id}-biscuit)`}
              stroke="#b77b43"
              strokeWidth="2.5"
            />
            <path
              d="M50 77 C40 67 19 51 18 35 C17 24 27 18 37 24 L50 35 L63 24 C73 18 83 24 82 35 C81 51 60 67 50 77 Z"
              fill="#f28fa0"
              stroke="#ffe2bd"
              strokeWidth="3"
            />
            <path
              d="M28 31 Q31 25 37 29"
              fill="none"
              stroke="#fff4e7"
              strokeWidth="3"
            />
            {[
              [37, 42], [61, 41], [29, 48], [70, 51],
              [41, 58], [56, 60], [50, 48], [50, 69],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.8" fill="#fff0d6" />
            ))}
          </>
        )}

        {kind === 'mint' && (
          <>
            <path
              d="M12 75 C12 37 39 11 86 12 C86 49 62 85 12 75 Z"
              fill={`url(#${id}-mint)`}
              stroke="#829a58"
              strokeWidth="2.5"
            />
            <path
              d="M17 71 Q45 49 79 17"
              fill="none"
              stroke="#f0edbd"
              strokeWidth="4"
            />
            {[
              [31, 54, 24, 39],
              [43, 44, 34, 29],
              [55, 34, 48, 21],
              [39, 59, 51, 69],
              [53, 46, 67, 55],
              [65, 32, 76, 38],
            ].map(([x1, y1, x2, y2], i) => (
              <path
                key={i}
                d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 5} ${x2} ${y2}`}
                fill="none"
                stroke="#7e9957"
                strokeWidth="2"
              />
            ))}
            <path
              d="M17 71 Q45 49 79 17"
              fill="none"
              stroke="#f8f0c5"
              strokeWidth="1"
            />
          </>
        )}

        {kind === 'star' && (
          <>
            <path
              d="M50 7 L62 34 L91 36 L69 55 L76 85 L50 69 L24 85 L31 55 L9 36 L38 34 Z"
              fill={`url(#${id}-biscuit)`}
              stroke="#b77b43"
              strokeWidth="2.5"
            />
            <path
              d="M50 15 L60 38 L84 40 L66 55 L72 77 L50 64 L28 77 L34 55 L16 40 L40 38 Z"
              fill="#f9d895"
              stroke="#ffedbe"
              strokeWidth="2"
            />
            <path
              d="M50 23 L57 41 L75 42 L61 53 L65 70 L50 60 L35 70 L39 53 L25 42 L43 41 Z"
              fill="none"
              stroke="#e9b96e"
              strokeWidth="1.5"
              strokeDasharray="2 4"
            />
            {[
              [50, 29], [36, 46], [64, 46], [42, 57], [58, 57],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.7" fill="#fff5d9" />
            ))}
          </>
        )}

        {kind === 'chocolate' && (
          <>
            <path
              d="M50 8 C63 8 68 15 77 18 C88 22 92 35 90 48 C94 61 83 76 72 80 C62 90 38 92 28 82 C14 78 7 65 10 51 C6 37 16 24 27 20 C34 11 41 8 50 8 Z"
              fill={`url(#${id}-biscuit)`}
              stroke="#ae713e"
              strokeWidth="2.5"
            />
            <path
              d="M50 15 C62 15 68 22 75 24 C84 29 86 38 84 49 C88 60 78 71 69 75 C60 84 40 85 31 77 C20 73 14 62 16 51 C12 39 21 29 30 25 C37 18 42 15 50 15 Z"
              fill="#e8b76e"
              stroke="#f8d79c"
              strokeWidth="2"
            />
            {[
              [36, 31], [60, 28], [72, 43], [48, 47],
              [27, 51], [38, 67], [62, 67], [72, 57],
            ].map(([x, y], i) => (
              <g key={i}>
                <ellipse
                  cx={x}
                  cy={y + 1}
                  rx="4.5"
                  ry="5"
                  fill="#75412e"
                />
                <ellipse
                  cx={x - 1}
                  cy={y - 1}
                  rx="2"
                  ry="2"
                  fill="#b17a55"
                />
              </g>
            ))}
          </>
        )}
      </g>
    </svg>
  );
}

function CookiePiece({ cookie, size = 27 }) {
  return (
    <span
      className={`cookie-piece cookie-piece-${cookie.kind}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <CookieArt kind={cookie.kind} size={size * 1.85} />
    </span>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(COLS * ROWS).fill(null));
  const [placed, setPlaced] = useState({});
  const [rotations, setRotations] = useState({});
  const [message, setMessage] = useState(
    'クッキーをつまんで、缶の中に運んでね。'
  );
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

  function renderCookieOnBoard(id, index) {
    if (!id) return null;

    const cookie = COOKIES.find((item) => item.id === id);

    if (!cookie) return null;

    const item = placed[id];

    if (!item) return null;

    const firstCell = item.cells[0];
    const currentCell = {
      col: index % COLS,
      row: Math.floor(index / COLS),
    };

    const isFirst =
      currentCell.col === firstCell.col &&
      currentCell.row === firstCell.row;

    if (!isFirst) return null;

    const shape = getShape(cookie);
    const size = shapeSize(shape);

    return (
      <button
        key={`placed-${id}`}
        type="button"
        className={`placed-cookie placed-cookie-${cookie.kind}`}
        style={{
          gridColumn: `${firstCell.col + 1} / span ${size.width}`,
          gridRow: `${firstCell.row + 1} / span ${size.height}`,
        }}
        onClick={() => removeCookie(id)}
        aria-label={`${cookie.name}を缶から取り出す`}
      >
        <div
          className="placed-cookie-shape"
          style={{
            width: size.width * CELL,
            height: size.height * CELL,
          }}
        >
          {shape.map(([x, y], i) => (
            <span
              key={i}
              className="placed-cookie-piece"
              style={{
                left: x * CELL,
                top: y * CELL,
                width: CELL,
                height: CELL,
              }}
            >
              <CookieArt kind={cookie.kind} size={CELL * 1.35} />
            </span>
          ))}
        </div>
      </button>
    );
  }

  return (
    <main className="storybook">
      <header className="page-header">
        <div className="brand-mark">
          <span>✿</span>
        </div>

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

          <div className="heading-copy">
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

                {board.map((id, index) =>
                  id ? renderCookieOnBoard(id, index) : null
                )}
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

          <div className="heading-copy">
            <h2>FRESHLY BAKED</h2>
            <p>クッキーをつまんで缶へ運ぼう</p>
          </div>
        </div>

        <div className="cookie-tray">
          {COOKIES.filter((cookie) => !placed[cookie.id]).map((cookie) => {
            const shape = getShape(cookie);
            const size = shapeSize(shape);

            return (
              <article className={`cookie-card card-${cookie.kind}`} key={cookie.id}>
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
                  <div
                    className="cookie-shape"
                    style={{
                      width: size.width * CELL,
                      height: size.height * CELL,
                    }}
                  >
                    {shape.map(([x, y], index) => (
                      <span
                        key={index}
                        className="cookie-piece"
                        style={{
                          left: x * CELL,
                          top: y * CELL,
                          width: CELL,
                          height: CELL,
                        }}
                      >
                        <CookieArt kind={cookie.kind} size={CELL * 1.65} />
                      </span>
                    ))}
                  </div>
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
          aria-hidden="true"
        >
          <CookieArt kind={drag.cookie.kind} size={70} />
        </div>
      )}

      <div className="bottom-actions">
        <button
          type="button"
          className="reset-button"
          onClick={resetGame}
        >
          <span className="reset-icon">↻</span>
          最初からやり直す
        </button>
      </div>

      <footer className="page-footer">
        <span>✧</span>
        made with love & a little sweetness
        <span>✧</span>
      </footer>

      {finished && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-decoration">✿ ♡ ✿</div>
            <p className="success-eyebrow">WONDERFUL!</p>
            <h2>できあがり！</h2>

            <div className="success-cookie-art">
              <CookieArt kind="strawberry" size={95} />
            </div>

            <p className="success-message">
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
