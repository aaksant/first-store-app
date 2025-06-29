return (
  <section className="max-w-6xl mx-auto px-4 py-8">
    <div className="mb-8">
      <Link
        to="/"
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        <ChevronLeft className="mr-1" size={20} />
        <span>Back to home</span>
      </Link>
    </div>

    <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm">
      <article>
        <img
          src={image}
          alt={name}
          className="object-cover rounded-tl-lg rounded-bl-lg"
        />
      </article>

      <article className="p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-blue-950 mb-2">{name}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {alcoholicInfo}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Glass</h2>
            <p className="text-gray-700">{glass}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              How to make it
            </h2>
            <p className="text-gray-700 leading-relaxed">{instructions}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
);
