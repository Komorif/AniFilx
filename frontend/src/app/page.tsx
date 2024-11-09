"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import styles from './video.module.css';

interface AnimeVideo {
  image: string;
  title_en: string;
  title_ru: string;
  main_genre: string;
  genre: string;
  date: number;
  description: string;
}

function groupByGenre(videos: AnimeVideo[]): Record<string, AnimeVideo[]> {
  return videos.reduce((acc: Record<string, AnimeVideo[]>, video: AnimeVideo) => {
    if (!acc[video.main_genre]) {
      acc[video.main_genre] = [];
    }
    acc[video.main_genre].push(video);
    return acc;
  }, {});
}

const genreDetails = {
  anime: {
    title: 'ЛЮБИМЫЕ АНИМЕ',
    description: 'Вам понравятся эти аниме! Приятного просмотра!',
  },
  series: {
    title: 'СЕРИАЛЫ НА ВЕЧЕР',
    description: 'Вы найдете среди них что-то по душе!',
  },
  films: {
    title: 'ФИЛЬМЫ',
    description: 'Каждый фильм может оставить разнообразные эмоции и впечатления у зрителей.',
  },
};

const getGenreInfo = (genre: string) => {
  const normalizedGenre = genre.toLowerCase();
  return genreDetails[normalizedGenre as keyof typeof genreDetails] || { title: genre, description: '' };
};

const AnimeVideoComponent: React.FC = () => {
  const [animeVideos, setAnimeVideos] = useState<AnimeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchAnimeVideos = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.get<AnimeVideo[]>('http://localhost:80', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      setAnimeVideos((prevVideos) => [...response.data, ...prevVideos]);
      setLoading(false);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          router.push('/login');
        } else {
          setError('Ошибка при получении данных');
        }
      } else {
        setError('Произошла ошибка. Попробуйте еще раз.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeVideos();
  }, []);

  const handleWiewButton = (main_genre: string, title: string) => {

    const formattedGenre = main_genre.replace(/ /g, '_');
    const formattedTitle = title.replace(/ /g, '_');

    router.push(`/videos/${encodeURIComponent(formattedGenre)}/${encodeURIComponent(formattedTitle)}`);
  };

  if (loading) return <p>Загрузка страницы</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const groupedVideos = groupByGenre(animeVideos);

  return (
    <div>
      <section>
        <div className={styles.genreContainer}>
          {Object.entries(groupedVideos).map(([main_genre, videos]) => {
            const genreInfo = getGenreInfo(main_genre);

            return (
              <div key={main_genre} className={styles.genreBlock}>
                <div className={styles.title_genre}>
                  <h2 className={styles.genreTitle}>{genreInfo.title}</h2>
                  <p className={styles.genreDescription}>{genreInfo.description}</p>
                </div>

                <div>
                  
                </div>

                <ul className={styles.genreVideos}>
                  {videos.slice(0, 6).map((video, index) => (
                    <li key={index} className={styles.animeCard}>
                      {video.image && (
                        <img
                          className={styles.animeImage}
                          src={video.image}
                          alt={video.title_ru}
                          onClick={() => handleWiewButton(video.main_genre, video.title_en)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                      <div className={styles.cardBottom}>
                        <p className={styles.subtitle}>{video.title_ru}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AnimeVideoComponent;