
Jingee Mok
4:15 PM (16 minutes ago)
to me

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const F1ResultsApp = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("https://ergast.com/api/f1/2025/results.json?limit=1000");
        const data = await response.json();
        const races = data?.MRData?.RaceTable?.Races || [];
        setResults(races);
      } catch (error) {
        console.error("Failed to fetch race results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const filteredResults = results.filter(race =>
    race.raceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="text-center py-20 bg-black">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-4 text-red-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          F1 World 2025 🏁
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Live race results, standings, and everything Formula 1 – beautifully delivered.
        </motion.p>
      </header>

      <main className="p-6 max-w-6xl mx-auto font-sans">
        <div className="flex justify-center mb-10">
          <Input
            placeholder="🔍 Search Grand Prix..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border rounded-lg text-black"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading race results...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map(race => (
              <motion.div
                key={race.round}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-lg rounded-2xl border border-gray-700 bg-gray-800">
                  <CardContent className="p-5">
                    <h2 className="text-xl font-bold mb-2 text-white">
                      {race.raceName} 🇺🇳
                    </h2>
                    <p className="text-sm text-gray-300">📍 {race.Circuit.circuitName}</p>
                    <p className="text-sm text-gray-400">
                      📅 {race.date} – {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                    </p>
                    <div className="mt-4">
                      <h3 className="text-md font-semibold mb-1 text-gray-200">🥇 Top 3 Finishers:</h3>
                      <ol className="list-decimal ml-5 text-sm text-gray-300">
                        {race.Results?.slice(0, 3).map((result, index) => (
                          <li key={index}>
                            {result.Driver.givenName} {result.Driver.familyName} ({result.Constructor.name})
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default F1ResultsApp;
