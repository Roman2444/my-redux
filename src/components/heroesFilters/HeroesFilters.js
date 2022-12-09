
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setActiveFilter } from '../../actions';

const HeroesFilters = () => {

    const [activ, setActiv] = useState('')
    const dispatch = useDispatch();

    const onActiveClass = (e) => {
        setActiv(e.target.name)
        dispatch(setActiveFilter(e.target.name))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={(e)=> onActiveClass(e)} name='all' className="btn btn-outline-dark active">Все</button>
                    <button onClick={(e)=> onActiveClass(e)} name='fire' className="btn btn-danger">Огонь</button>
                    <button onClick={(e)=> onActiveClass(e)} name='water' className="btn btn-primary">Вода</button>
                    <button onClick={(e)=> onActiveClass(e)} name='earth' className="btn btn-secondary">Земля</button>
                    <button onClick={(e)=> onActiveClass(e)} name='wind' className="btn btn-success">Ветер</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;