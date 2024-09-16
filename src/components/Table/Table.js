import { useState, useEffect, useCallback } from "react";
import styles from "./Table.module.scss";
import { fetchEntities } from "../../api/api";
import Filter from "../Filter/Filter";

export default function Table() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    minId: "",
    maxId: "",
    minCode: "",
    maxCode: "",
    value: "",
  });
  const size = 100;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    handleFilterSubmit();
  };

  const handleFilterSubmit = () => {
    setPage(1);
    setData([]);
  };

  useEffect(() => {
    handleSubmit();
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      const responseData = await fetchEntities(page, size, filter);
      if (responseData.length === 0)
        return;
      setData((prevData) => [...prevData, ...responseData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Json is invalid!");
    }
  }, [page, size, filter]);

  return (
    <div className={styles.tableContainer}>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleFilterSubmit={handleFilterSubmit}
      />

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

      <button onClick={handleSubmit}>Загрузить ещё {size} данных</button>
    </div>
  );
}
