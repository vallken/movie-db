//Movies

export async function getMovieData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Movie/MovieData/${id}`,
      {
        cache: "force-cache",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export const searchMovie = async (keyword, page) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Movie/searchMovie/${keyword}?page=${page}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export async function getMovies(page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Movie/?page=${page}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

//Drama

export async function getDramaData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Drama/DramaData/${id}`,
      {
        cache: "force-cache",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export const searchDrama = async (keyword, page) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Drama/searchDrama/${keyword}?page=${page}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export async function getDramas(page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Drama/?page=${page}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

//Anime

export const getAnimeData = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Anime/AnimeData/${id}`,
      {
        cache: "force-cache",
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export async function getAnime(page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Anime/?page=${page}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

export const searchAnime = async (Keyword, page) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Anime/searchAnime/${Keyword}?page=${page}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
