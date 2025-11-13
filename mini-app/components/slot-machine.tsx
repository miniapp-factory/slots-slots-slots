"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Share from "./share";

const fruits = ["apple", "banana", "cherry", "orange", "lemon"] as const;
type Fruit = typeof fruits[number];

function getRandomFruit(): Fruit {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [columns, setColumns] = useState<Fruit[][]>([
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWin(false);
    const interval = setInterval(() => {
      setColumns((prev) => {
        const newCols = prev.map((col) => [
          getRandomFruit(),
          ...col.slice(0, 2),
        ]);
        return newCols;
      });
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      const centerRow = columns.map((col) => col[1]);
      const allSame = centerRow.every((f) => f === centerRow[0]);
      setWin(allSame);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col items-center">
            {col.map((fruit, j) => (
              <img
                key={j}
                src={`/${fruit}.png`}
                alt={fruit}
                className="w-16 h-16 object-contain"
              />
            ))}
          </div>
        ))}
      </div>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </Button>
      {win && (
        <div className="mt-4 text-green-600">
          <p>Congratulations! You won a fruit prize!</p>
          <Share text="I just won a fruit slot machine! 🎉" className="mt-2" />
        </div>
      )}
    </div>
  );
}
