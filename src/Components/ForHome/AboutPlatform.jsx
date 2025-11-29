import React from "react";

const AboutPlatform = () => {
  return (
    <section className="w-full bg-[#0d0f1a] text-white py-20">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-2 tracking-wide">
            About <span className="text-blue-500">MovieMaster Pro</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Your ultimate hub for movies — explore ratings, genres, reviews,
            collections and personalized recommendations.
          </p>
        </div>

        {/* TOP BANNER */}
        <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-xl mb-16">
          <img
            src="https://i.ibb.co/4Jgfj2p/movie-banner.jpg"
            className="w-full h-full object-cover opacity-70"
            alt="MovieMaster banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <h3 className="text-3xl font-bold mb-3">
              A Smarter Way to Explore Movies
            </h3>
            <p className="text-gray-300 max-w-md">
              Designed for movie lovers, critics, and creators. Experience
              powerful search, curated lists, and interactive movie insights.
            </p>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card */}
          <div className="bg-[#121622] p-6 rounded-2xl shadow-lg hover:bg-[#1b2234] transition border border-white/5 min-h-[200px]">
            <div className="text-blue-500 text-3xl mb-3">🎬</div>
            <h4 className="text-xl font-semibold mb-2">
              Massive Movie Database
            </h4>
            <p className="text-gray-400">
              Access thousands of movies with rich details — cast, ratings,
              reviews, posters, plot summaries and more.
            </p>
          </div>

          {/* Feature Card */}
          <div className="bg-[#121622] p-6 rounded-2xl shadow-lg hover:bg-[#1b2234] transition border border-white/5 min-h-[200px]">
            <div className="text-blue-500 text-3xl mb-3">⭐</div>
            <h4 className="text-xl font-semibold mb-2">
              Advanced Rating System
            </h4>
            <p className="text-gray-400">
              Sort and filter movies by top-rated, trending, featured and much
              more.
            </p>
          </div>

          {/* Feature Card */}
          <div className="bg-[#121622] p-6 rounded-2xl shadow-lg hover:bg-[#1b2234] transition border border-white/5 min-h-[200px]">
            <div className="text-blue-500 text-3xl mb-3">🎭</div>
            <h4 className="text-xl font-semibold mb-2">Genre Explorer</h4>
            <p className="text-gray-400">
              Browse beautifully designed genre cards for quick discovery.
            </p>
          </div>

          {/* Feature Card */}
          <div className="bg-[#121622] p-6 rounded-2xl shadow-lg hover:bg-[#1b2234] transition border border-white/5 min-h-[200px]">
            <div className="text-blue-500 text-3xl mb-3">📊</div>
            <h4 className="text-xl font-semibold mb-2">
              Smart Recommendations
            </h4>
            <p className="text-gray-400">
              MovieMaster Pro learns your taste and shows smarter suggestions
              over time.
            </p>
          </div>

          {/* Feature Card */}
          <div className="bg-[#121622] p-6 rounded-2xl shadow-lg hover:bg-[#1b2234] transition border border-white/5 min-h-[200px]">
            <div className="text-blue-500 text-3xl mb-3">📱</div>
            <h4 className="text-xl font-semibold mb-2">
              Responsive & Smooth UI
            </h4>
            <p className="text-gray-400">
              Built with modern design, smooth animations and mobile-friendly
              layouts.
            </p>
          </div>

          {/* Feature Card */}
          <div className="bg-[#121622] p-6 rounded-2xl shadow-lg hover:bg-[#1b2234] transition border border-white/5 min-h-[200px]">
            <div className="text-blue-500 text-3xl mb-3">⚡</div>
            <h4 className="text-xl font-semibold mb-2">
              Super-Fast Performance
            </h4>
            <p className="text-gray-400">
              Powered by optimized API routes and efficient database queries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;
