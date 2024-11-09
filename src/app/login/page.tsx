"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Подключение css
import styles from './login.module.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Функция для обработки формы
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('accessToken', response.data.access);  // Сохранение accessToken
      localStorage.setItem('refreshToken', response.data.refresh); // Сохранение refreshToken
      router.push('/');

    } catch (err) {
      setError('Неправильный username или пароль');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className='video_card'>
          <label>username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Войти</button>

        <div>
            <a href="/register">Зарегистрироваться</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;