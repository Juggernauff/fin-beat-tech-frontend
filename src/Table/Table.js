import { useState } from 'react';
import styles from './Table.module.scss';

export default function Table() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        minId: '',
        maxId: '',
        minCode: '',
        maxCode: '',
        value: ''
    });
    const size = 100;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            let minId = filter.minId !== '' ? `&minId=${filter.minId}` : '';
            let maxId = filter.maxId !== '' ? `&maxId=${filter.maxId}` : '';
            let minCode = filter.minCode !== '' ? `&minCode=${filter.minCode}` : '';
            let maxCode = filter.maxCode !== '' ? `&maxCode=${filter.maxCode}` : '';
            let value = filter.value !== '' ? `&value=${filter.value}` : '';
            let url = `http://localhost:5157/api/v1/Entities?page=${page}&size=${size}${minId}${maxId}${minCode}${maxCode}${value}`;
            
            const response = await fetch(url);
            
            if (response.ok) {
                const responseData = await response.json();
                setData(prevData => [...prevData, ...responseData]);
            } else {
                console.error(`Ошибка: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Ошибка: Неверный формат JSON');
        }
    };

    const loadMoreData = () => {
        setPage(prevPage => prevPage + 1);
        handleSubmit();
    };

    const handleFilterSubmit = () => {
        setPage(1);
        setData([]);
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.filterContainer}>
                <input
                    type="number"
                    name="minId"
                    value={filter.minId}
                    onChange={handleFilterChange}
                    placeholder="Минимальный ID"
                />
                <input
                    type="number"
                    name="maxId"
                    value={filter.maxId}
                    onChange={handleFilterChange}
                    placeholder="Максимальный ID"
                />
                <input
                    type="number"
                    name="minCode"
                    value={filter.minCode}
                    onChange={handleFilterChange}
                    placeholder="Минимальный код"
                />
                <input
                    type="number"
                    name="maxCode"
                    value={filter.maxCode}
                    onChange={handleFilterChange}
                    placeholder="Максимальный код"
                />
                <input
                    type="text"
                    name="value"
                    value={filter.value}
                    onChange={handleFilterChange}
                    placeholder="Значение"
                />
                <button onClick={handleFilterSubmit}>Применить фильтр</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Порядковый номер</th>
                        <th>Код</th>
                        <th>Значение</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.code}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={loadMoreData}>
                Загрузить ещё {size} данных
            </button>
        </div>
    );
}