import { useState, useEffect } from "react";
import Quote from "./components/Quote";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchQuotes() {
    const response = await fetch("https://dummyjson.com/quotes");
    const data = await response.json();
    setQuotes(data.quotes);
    setCurrentIndex(Math.floor(Math.random() * data.quotes.length));
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? quotes.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {quotes.length > 0 ? (
        <>
          <Quote
            key={quotes[currentIndex].id}
            quote={quotes[currentIndex].quote}
            author={quotes[currentIndex].author}
          />
          <div className="flex gap-3 mt-6">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-xl font-medium text-gray-600 animate-pulse">
          Loading...
        </h1>
      )}
    </div>
  );
}

export default App;
