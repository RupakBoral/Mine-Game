import { useEffect, useState } from "react";
import "./App.css";
import bombImg from "../src/assets/bomb.webp";
import gem from "../src/assets/gem.avif";

function App() {
  const arr = [
    ["❔", "❔", "❔", "❔"],
    ["❔", "❔", "❔", "❔"],
    ["❔", "❔", "❔", "❔"],
    ["❔", "❔", "❔", "❔"],
  ];
  const [reveal, setReveal] = useState([9000]);
  const [mine, setMine] = useState({
    row: null,
    col: null,
  });
  const [bomb, setBomb] = useState(false);
  const [amount, setAmount] = useState(0);
  const [returnValue, setReturnValue] = useState(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setMine({
      row: Math.floor(Math.random() * 10) % 4,
      col: Math.floor(Math.random() * 10) % 4,
    });
  }, []);

  const handleClick = (i, j) => {
    if (!start) return;
    if (i === mine.row && j === mine.col) {
      setReturnValue(-1);
      setBomb(true);
      return;
    }
    const cellId = i * 10 + j;
    setReveal((prev) => (prev.includes(cellId) ? prev : [...prev, cellId]));
    // calculate the amount -> 5x
    setAmount(amount * 1.2);
    console.log(amount);
    // if all gems collected then reward
    if (reveal.length === 15) {
      setReturnValue(amount);
      setStart(false);
    }
  };

  const handleBet = () => {
    if (amount > 0) setStart(true);
  };

  return (
    <div className="h-screen space-y-6 flex flex-col items-center">
      <main className="flex flex-col gap-4 transition-all duration-300 ease-in-out">
        <h2>Mine Game</h2>
        <div
          className={`grid grid-cols-4 ${bomb ? "pointer-events-none" : ""}`}
        >
          {arr.map((row, i) =>
            row.map((elem, j) => (
              <div
                onClick={() => handleClick(i, j)}
                key={`${i * 10}+${j}`}
                className={`${
                  mine.row === i && mine.col === j && bomb
                    ? "bg-transparent p-0"
                    : reveal.includes(i * 10 + j)
                    ? "bg-transparent p-0"
                    : "bg-cyan-800 hover:bg-cyan-700 p-11 border-1 border-white/40 cursor-pointer transition-all duration-300"
                }`}
              >
                <img
                  className={`${
                    bomb && mine.row === i && mine.col === j
                      ? "w-full h-28 object-cover border-1 m-0"
                      : "hidden"
                  }`}
                  src={bombImg}
                />
                <img
                  className={`${
                    reveal !== null && reveal.includes(i * 10 + j)
                      ? "w-full h-28 object-contain border-1 p-0"
                      : "hidden"
                  }`}
                  src={gem}
                />
                {
                  <span
                    className={`${
                      (reveal !== null && reveal.includes(i * 10 + j)) ||
                      (bomb && mine.row === i && mine.col === j)
                        ? "hidden"
                        : "inline"
                    }`}
                  >
                    {elem}
                  </span>
                }
              </div>
            ))
          )}
        </div>
      </main>
      <section className="space-y-4">
        <div className="flex gap-6 items-center">
          <p>Enter your amount: </p>
          <input
            type="number"
            placeholder="0.00"
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white/50 p-2 text-black font-semibold rounded-sm"
          />
        </div>
        <button onClick={handleBet}>Place Bet</button>
        {returnValue > 0 ? (
          <p>Yay! you earned: {Math.floor(returnValue)}</p>
        ) : returnValue < 0 ? (
          <p>Oops! you lost! Better luck next time.</p>
        ) : start ? (
          <p>Start your game!!</p>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
