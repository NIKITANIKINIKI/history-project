import React, { MouseEvent, useState } from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import "swiper/css";
import SwipperBlock from "./components/SwipperBlock";
import CircleBlock from "./components/CircleBlock";
import { gsap } from "gsap";


const App: React.FC = () => {


  const data = [
    {
      period: "1990-2000",
      event: [
        {
          name: 'Наука',
          data: [
            { date: '1990', text: '11 февраля — Запуск зонда "Галилео" для исследования Юпитера.' },
            { date: '1992', text: '15 декабря — Открытие квантового эффекта Холла при нулевом магнитном поле.' },
            { date: '1995', text: '7 декабря — Открытие планеты 51 Пегаса b.' },
            { date: '1998', text: '29 июля — Запуск миссии "Deep Space 1".' },
            { date: '1999', text: '15 октября — Запуск проекта "Кассини" к Сатурну.' }
          ]
        },
        {
          name: 'Технологии',
          data: [
            { date: '1991', text: '6 августа — Тим Бернерс-Ли представил концепцию Всемирной паутины (WWW).' },
            { date: '1995', text: '24 августа — Выпуск операционной системы Windows 95.' },
            { date: '1997', text: '4 сентября — Основана компания Google.' },
            { date: '1998', text: '20 ноября — Начато строительство МКС.' },
            { date: '1999', text: '7 октября — Презентация первого коммерческого DVD.' }
          ]
        },
        {
          name: 'Политика',
          data: [
            { date: '1991', text: '26 декабря — Распад Советского Союза.' },
            { date: '1992', text: '7 февраля — Подписание Маастрихтского договора о создании ЕС.' },
            { date: '1993', text: '1 января — Официальное разделение Чехословакии.' },
            { date: '1994', text: '6 апреля — Начало геноцида в Руанде.' },
            { date: '1999', text: '1 января — Введение евро как официальной валюты ЕС.' }
          ]
        }
      ]
    },
    {
      period: "2000-2010",
      event: [
        {
          name: 'Наука',
          data: [
            { date: '2001', text: '15 февраля — Завершение расшифровки человеческого генома.' },
            { date: '2004', text: '3 января — Посадка марсохода "Спирит" на Марс.' },
            { date: '2005', text: '14 января — Аппарат "Гюйгенс" достиг поверхности Титана.' },
            { date: '2006', text: '24 августа — Переопределение статуса Плутона как карликовой планеты.' },
            { date: '2008', text: '10 сентября — Запуск Большого адронного коллайдера в ЦЕРН.' }
          ]
        },
        {
          name: 'Технологии',
          data: [
            { date: '2001', text: '23 октября — Презентация первого iPod.' },
            { date: '2004', text: '9 февраля — Основание Facebook.' },
            { date: '2007', text: '9 января — Apple анонсировала iPhone.' },
            { date: '2008', text: '2 сентября — Выпуск браузера Google Chrome.' },
            { date: '2009', text: '22 октября — Выпуск Windows 7.' }
          ]
        },
        {
          name: 'Культура',
          data: [
            { date: '2000', text: '1 июля — Премьера фильма "Гладиатор".' },
            { date: '2001', text: '21 ноября — Премьера фильма "Гарри Поттер и философский камень".' },
            { date: '2003', text: '17 декабря — Премьера "Возвращения короля".' },
            { date: '2004', text: '7 мая — Премьера фильма "Троя".' },
            { date: '2009', text: '18 декабря — Премьера фильма "Аватар".' }
          ]
        }
      ]
    },
    {
      period: "2010-2020",
      event: [
        {
          name: 'Наука',
          data: [
            { date: '2012', text: '4 июля — Обнаружен бозон Хиггса на Большом адронном коллайдере.' },
            { date: '2014', text: '12 ноября — Посадка зонда "Фила" на комету 67P.' },
            { date: '2015', text: '14 июля — Пролёт "Новые горизонты" мимо Плутона.' },
            { date: '2017', text: '26 октября — Успешное обнаружение гравитационных волн от слияния нейтронных звезд.' },
            { date: '2019', text: '10 апреля — Опубликовано первое изображение черной дыры.' }
          ]
        },
        {
          name: 'Технологии',
          data: [
            { date: '2010', text: '3 апреля — Запуск первого iPad.' },
            { date: '2012', text: '4 сентября — Выпуск Tesla Model S.' },
            { date: '2015', text: '30 сентября — Выпуск Microsoft Windows 10.' },
            { date: '2016', text: '14 апреля — Запуск Tesla Model 3.' },
            { date: '2019', text: '20 марта — Выход видеоигры "Sekiro: Shadows Die Twice".' }
          ]
        },
        {
          name: 'Политика',
          data: [
            { date: '2011', text: '15 марта — Начало гражданской войны в Сирии.' },
            { date: '2016', text: '23 июня — Референдум о выходе Великобритании из ЕС (Brexit).' },
            { date: '2014', text: '18 марта — Аннексия Крыма Россией.' },
            { date: '2019', text: '24 октября — Великобритания отложила дату выхода из ЕС.' },
            { date: '2020', text: '3 ноября — Президентские выборы в США.' }
          ]
        },
        {
          name: 'Культура',
          data: [
            { date: '2012', text: '15 июля — Финал сериала "Во все тяжкие".' },
            { date: '2017', text: '17 июля — Премьера 7 сезона "Игры престолов".' },
            { date: '2019', text: '29 мая — Премьера сериала "Чернобыль".' },
            { date: '2020', text: '16 июля — Выход фильма "Тенет".' },
            { date: '2015', text: '18 декабря — Премьера "Звёздные войны: Пробуждение силы".' }
          ]
        },
        {
          name: 'Спорт',
          data: [
            { date: '2012', text: '27 июля — Открытие Летних Олимпийских игр в Лондоне.' },
            { date: '2014', text: '12 июня — Чемпионат мира по футболу в Бразилии.' },
            { date: '2016', text: '5 августа — Открытие Летних Олимпийских игр в Рио-де-Жанейро.' },
            { date: '2018', text: '14 июня — Чемпионат мира по футболу в России.' },
            { date: '2020', text: '24 июля — Летние Олимпийские игры в Токио перенесены из-за пандемии COVID-19.' }
          ]
        }
      ]
    }
  ];
  
  
  const [curentPeriod, setCurentPeriod]=useState<number>(1)
  const [currentData, setCurrentData]=useState<number>(0)

  return (
    <div className="content">
      <div className="line"></div>
      <div className="circle"></div>
      <div className="mobile-line"></div>
      <div className="cross">
        <div className="left-line"></div>
        <div className="right-line"></div>
        <div className="bottom-line"></div>
        <div className="years-date">
          <span className="blue-text">
          {data[curentPeriod-1].period.split('-')[0]}
          </span>
          <span className="pink-text">
          {data[curentPeriod-1].period.split('-')[1]}
          </span>
        </div>
        <CircleBlock event={data[curentPeriod-1].event} setCurrentData={setCurrentData} currentData={currentData} curentPeriod={curentPeriod}/>
        <div className="label">Исторические даты</div>
        <div className="switching">
          <label>{'0'+String(curentPeriod)+'/0'+data.length}</label>
          <div className={`buttons` }>
            <button 
            onClick={() => { if(curentPeriod>1) 
              setCurentPeriod((prev) => prev-1)
            }}
            className={(1<curentPeriod) ? 'active' : ''}
            >
              <svg
                className="left-button"
                // width="10"
                // height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
            onClick={() => { if(curentPeriod<data.length)
              setCurentPeriod((prev) => prev+1)
            }}
            className={(curentPeriod<data.length) ? 'active' : ''}
            >
              <svg
                className="right-button"
                // width="10"
                // height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
        
        <SwipperBlock  event={data[curentPeriod-1].event[currentData]}/>
        
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
