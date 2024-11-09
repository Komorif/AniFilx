"use client";
import "./globals.css";

import React, { useEffect, useState } from 'react';

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;

  
}>) {
  const [highlightPosition, setHighlightPosition] = useState<number | null>(null);
  const [isHighlightActive, setIsHighlightActive] = useState(false);

  const navButtons = [
    { id: 'films', label: 'Фильмы', link: '/videos/films', imageSrc: 'http://localhost/media/images/films.png'},
    { id: 'anime', label: 'Аниме', link: '/videos/anime', imageSrc: 'http://localhost/media/images/anime.png'},
    { id: 'series', label: 'Сериалы', link: '/videos/series', imageSrc: 'http://localhost/media/images/series.png'},
    { id: 'contacts', label: 'Контакты', link: '#', imageSrc: 'http://localhost/media/images/contacts.png'},
    { id: 'about', label: 'О нас', link: '#', imageSrc: 'http://localhost/media/images/about.png'},    
  ];

  const handleMouseEnter = (index: number) => {
    setHighlightPosition(16 + index * 54);
    setIsHighlightActive(true);
  };

  const handleMouseLeave = () => {
    setIsHighlightActive(false);
  };

  return (
      <html lang="ru">
      <body>

        <div id="nav_bar">
          <input id="nav_toggle" type="checkbox"/>
          <div id="nav_header">
            <a id="nav_title" href="/" target="_blank">
            <i>AniFlix</i>

              {/*<i><img src="http://localhost/media/images/icon-test.png"
               width="35" height="35" alt="logo"/>AniFlix</i> {/*Здесь Логотип сайта*/}

            </a>
            <label htmlFor="nav_toggle">
              <span id="nav_toggle_burger"></span>
            </label>
            <hr/>
          </div>

        {/* Кнопки */}
        <div id="nav_content">
          {navButtons.map((button, index) => (
            <div
              key={button.id}
              className="nav_button"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}>

              <i><img src={button.imageSrc} alt={button.label} /></i> {/*Здесь Кнопки сайта*/}

              <span>
                <a href={button.link}>{button.label}</a>
              </span>
            </div>
          ))}
          <hr />
          <div
            id="nav_content_highlight"
            style={{
              top: highlightPosition ? `${highlightPosition}px` : '16px',
              opacity: isHighlightActive ? 1 : 0,
              transition: 'top 0.2s ease, opacity 0.2s ease',
            }}
          ></div>
        </div>


        {/* Footer Toggle Input */}
        <input id="nav_footer_toggle" type="checkbox" />

        {/* Пользователь */}
        <div id="nav_footer">
          <div id="nav_footer_heading">
            
            {/*Аватарка*/}
            <div id="nav_footer_avatar">
              <img
                src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" 
                alt="Avatar"
              />
            </div>

            <div id="nav_footer_titlebox">
              <a id="nav_footer_title" href="/account/" target="_blank">
                Komori
              </a>
              <span id="nav_footer_subtitle">Admin</span>
            </div>
            <label htmlFor="nav_footer_toggle">

              {/*<i><img src="http://localhost/media/images/icon.png" width="35" height="35" alt="logo"/></i> {/*Скролинг*/}

            </label>
          </div>
          <div id="nav_footer_content"></div>
        </div>

        </div>


      {children}
      </body>
      </html>
  );
}