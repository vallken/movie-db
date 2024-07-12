"use client"

import React, { useState, useEffect } from 'react';
import MovieList from '../PostPage.js/MovieList';



export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('../../api/Movie/');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className=''>
        <MovieList api={posts} />
    </div>
  );
}
