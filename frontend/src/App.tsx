import { useState } from "react";
import { Button } from "./components/ui/button";
import "./index.css"; // Make sure Tailwind is imported

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-4xl font-bold">Vite + React + Tailwind + ShadCN</h1>

      <p className="text-lg">
        Tailwind test: <span className="text-blue-500">blue text</span>
      </p>

      <Button onClick={() => setCount(count + 1)}>
        ShadCN Button: Count is {count}
      </Button>

      <Button variant="secondary" size="sm">
        Secondary Small Button
      </Button>
    </div>
  );
}

export default App;
