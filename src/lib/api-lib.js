export async function getMovies(page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Movie/?page=${page}`,
      {
        cache: "no-store",
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

export const getAnimeData = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/AnimeData/${id}`,
      {
        cache: "no-store",
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
        cache: "no-store",
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

export const searchMovie = async (keyword, page) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/searchMovie/${keyword}?page=${page}`,
      {
        cache: "no-store",
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
export const searchAnime = async (keyword, page) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/searchAnime/${keyword}?page=${page}`,
      {
        cache: "no-store",
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
