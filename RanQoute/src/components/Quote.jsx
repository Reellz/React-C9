function Quote({ quote, author }) {
  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">"{quote}"</h1>
      <h2 className="text-lg text-gray-600">- {author}</h2>
    </div>
  );
}

export default Quote;
