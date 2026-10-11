import { useMemo, useState } from 'react'
import {
RotateCw,
Undo2,
Menu,
Sparkles,
Heart,
Flower2
} from 'lucide-react'

const WIDTH = 6
const HEIGHT = 4

const COOKIES = [
{
id: ‘jam’,
name: ‘ジャムクッキー’,
icon: ‘🍪’,
color: ‘#e8b96f’,
cells: [[0, 0], [1, 0], [0, 1], [1, 1]],
note: ‘まんなかにジャム’
},
{
id: ‘flower’,
name: ‘お花のクッキー’,
icon: ‘🌼’,
color: ‘#e8cd86’,
cells: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
note: ‘お花のかたち’
},
{
id: ‘heart’,
name: ‘ハートクッキー’,
icon: ‘💗’,
color: ‘#e9a5a5’,
cells: [[0, 0], [1, 0], [0, 1], [1, 1]],
note: ‘ピンクのアイシング’
},
{
id: ‘swirl’,
name: ‘しぼりクッキー’,
icon: ‘🥮’,
color: ‘#dcb77c’,
cells: [[0, 0], [1, 0], [0, 1], [1, 1]],
note: ‘くるくる模様’
},
{
id: ‘rabbit’,
name: ‘うさぎクッキー’,
icon: ‘🐇’,
color: ‘#ead1a0’,
cells: [[0, 0], [1, 0], [0, 1]],
note: ‘ちいさなうさぎ’
},
{
id: ‘choco’,
name: ‘チョコクッキー’,
icon: ‘🍫’,
color: ‘#a87859’,
cells: [[0, 0], [1, 0], [0, 1], [1, 1]],
note: ‘カカオの香り’
}
]

function rotateCells(cells) {
const rotated = cells.map(([x, y]) => [-y, x])
const minX = Math.min(…rotated.map(([x]) => x))
const minY = Math.min(…rotated.map(([, y]) => y))

return rotated.map(([x, y]) => [x - minX, y - minY])
}

function cellKey(x, y) {
return ${x},${y}
}

export default function App() {
const [placed, setPlaced] = useState([])
const [selected, setSelected] = useState(‘jam’)
const [rotations, setRotations] = useState({})
const [message, setMessage] = useState(
‘クッキーを選んで、缶の中にそっと置いてね。’
)
const [showMenu, setShowMenu] = useState(false)
const [completed, setCompleted] = useState(false)

const usedIds = new Set(placed.map(item => item.id))
const selectedCookie =
COOKIES.find(cookie => cookie.id === selected) || COOKIES[0]

const selectedCells = useMemo(() => {
let cells = selectedCookie.cells

for (let i = 0; i < (rotations[selected] || 0); i++) {
  cells = rotateCells(cells)
}
return cells

}, [selectedCookie, selected, rotations])

const occupied = useMemo(() => {
return new Set(
placed.flatMap(item =>
item.cells.map(([x, y]) => cellKey(x, y))
)
)
}, [placed])

function placeCookie(x, y) {
if (completed) {
setMessage(‘この缶はできあがり！ 新しく遊んでみてね。’)
return
}

if (usedIds.has(selected)) {
  setMessage('そのクッキーはもう缶に入っているよ。')
  return
}
const newCells = selectedCells.map(([dx, dy]) => [
  x + dx,
  y + dy
])
const isInvalid = newCells.some(([cx, cy]) =>
  cx < 0 ||
  cy < 0 ||
  cx >= WIDTH ||
  cy >= HEIGHT ||
  occupied.has(cellKey(cx, cy))
)
if (isInvalid) {
  setMessage('そこは少しせまいみたい。別の場所を試してね。')
  return
}
setPlaced(previous => [
  ...previous,
  {
    id: selected,
    cells: newCells
  }
])
setMessage(`${selectedCookie.name}をつめたよ。いい調子！`)

}

function undo() {
if (completed || placed.length === 0) return

const last = placed[placed.length - 1]
setPlaced(previous => previous.slice(0, -1))
setSelected(last.id)
setMessage('ひとつ前に戻したよ。')

}

function rotate() {
if (completed || usedIds.has(selected)) {
setMessage(‘回転させたいクッキーを選んでね。’)
return
}

setRotations(previous => ({
  ...previous,
  [selected]: ((previous[selected] || 0) + 1) % 4
}))
setMessage(`${selectedCookie.name}をくるっと回したよ。`)

}

function finish() {
if (placed.length !== COOKIES.length) {
setMessage(‘まだ缶に入っていないクッキーがあるよ。’)
return
}

setCompleted(true)
setMessage('できあがり！ かわいいクッキー缶になったね。')

}

function restart() {
setPlaced([])
setSelected(‘jam’)
setRotations({})
setCompleted(false)
setMessage(‘新しいクッキー缶をつくろう！’)
}

return (
♡
Cookie TinPuzzle

      <p>
        クッキーをつめて、<br />
        あなただけのかわいい<br />
        クッキー缶をつくりましょう。
      </p>
    </section>
    <section className="chapter">
      <span>✿</span>
      <div>
        <small>ちいさな おかしやさん</small>
        <strong>ステージ 1</strong>
      </div>
    </section>
    <button
      className="icon-button"
      onClick={() => setShowMenu(value => !value)}
      aria-label="メニュー"
    >
      <Menu size={20} />
      <small>メニュー</small>
    </button>
  </header>
  {showMenu && (
    <section className="menu-note">
      <h2>あそびかた</h2>
      <p>
        クッキーを選んでから、缶の空いているマスをタップしてね。
        「まわす」で回転、「もどす」でひとつ前に戻せるよ。
      </p>
      <button
        className="paper-button"
        onClick={() => setShowMenu(false)}
      >
        とじる
      </button>
    </section>
  )}
  <section className="status">
    <span>きょうのクッキー缶</span>
    <strong>✿ {placed.length} / {COOKIES.length}</strong>
  </section>
  <section className="tin-wrap">
    <div className="tin">
      <div className="tin-inner">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${WIDTH}, 1fr)`,
            gridTemplateRows: `repeat(${HEIGHT}, 1fr)`
          }}
        >
          {Array.from(
            { length: WIDTH * HEIGHT },
            (_, index) => {
              const x = index % WIDTH
              const y = Math.floor(index / WIDTH)
              const piece = placed.find(item =>
                item.cells.some(
                  ([cx, cy]) => cx === x && cy === y
                )
              )
              const cookie = piece
                ? COOKIES.find(item => item.id === piece.id)
                : null
              return (
                <button
                  key={index}
                  className={`cell ${cookie ? 'filled' : ''}`}
                  style={
                    cookie
                      ? { '--cookie-color': cookie.color }
                      : undefined
                  }
                  onClick={() => {
                    if (cookie) {
                      setMessage(`${cookie.name}が入っているよ。`)
                    } else {
                      placeCookie(x, y)
                    }
                  }}
                  aria-label={`マス ${x + 1},${y + 1}`}
                >
                  {cookie && <span>{cookie.icon}</span>}
                </button>
              )
            }
          )}
        </div>
      </div>
      <div className="tin-rim">
        ✿ Le petit atelier ✿
      </div>
    </div>
  </section>
  <section className="message" aria-live="polite">
    <Sparkles size={16} />
    <span>{message}</span>
  </section>
  <section className="cookie-paper">
    <div className="section-heading">
      <Flower2 size={18} />
      <h2>つかうクッキー</h2>
      <span>ひとつ選んでね</span>
    </div>
    <div className="cookie-list">
      {COOKIES.map(cookie => (
        <button
          key={cookie.id}
          className={[
            'cookie-choice',
            selected === cookie.id ? 'active' : '',
            usedIds.has(cookie.id) ? 'used' : ''
          ].join(' ')}
          onClick={() => {
            if (completed) return
            setSelected(cookie.id)
            setMessage(
              `${cookie.name}を選んだよ。缶の空いている場所をタップしてね。`
            )
          }}
        >
          <span
            className="cookie-art"
            style={{ '--cookie-color': cookie.color }}
          >
            {cookie.icon}
          </span>
          <span className="cookie-name">{cookie.name}</span>
          {usedIds.has(cookie.id) && (
            <span className="check">✓</span>
          )}
        </button>
      ))}
    </div>
    <p className="cookie-note">
      {selectedCookie.note}
    </p>
  </section>
  <section className="actions">
    <button
      className="paper-button"
      onClick={rotate}
      disabled={completed}
    >
      <RotateCw size={17} />
      まわす
    </button>
    <button
      className="paper-button"
      onClick={undo}
      disabled={completed || placed.length === 0}
    >
      <Undo2 size={17} />
      もどす
    </button>
    {completed ? (
      <button className="primary-button" onClick={restart}>
        <Heart size={16} />
        もう一度
      </button>
    ) : (
      <button className="primary-button" onClick={finish}>
        <Heart size={16} />
        できあがり
      </button>
    )}
  </section>
  {completed && (
    <section className="completion">
      <span>🎀</span>
      <h2>できあがり！</h2>
      <p>すてきなクッキー缶ができたね。</p>
    </section>
  )}
  <footer>
    <span>✿</span>
    ひとつずつ、たいせつにつめて。
    <span>✿</span>
  </footer>
</main>

)
}
