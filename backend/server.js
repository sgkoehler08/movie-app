import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

// Express backend for TMDB API requests 

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.TMDB_API_KEY;

app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.get("/api/movies/top-rated", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});


app.get("/api/movies/search", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: API_KEY,
          query: query,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("SEARCH ERROR:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: API_KEY,
          append_to_response: "credits",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("DETAIL ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        params: { api_key: API_KEY },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

app.get("/api/movies/genre/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: API_KEY,
          with_genres: id,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genre movies" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});