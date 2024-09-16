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
  };

  const handleSubmit = useCallback(async () => {
    try {
      const responseData = await fetchEntities(page, size, filter);
      setData((prevData) => [...prevData, ...responseData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Json is invalid!");
    }
  }, [page, size, filter]);

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    handleSubmit();
  };

  const handleFilterSubmit = () => {
    setPage(1);
    setData([]);
    handleSubmit();
  };


  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

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

      <button onClick={loadMoreData}>Загрузить ещё {size} данных</button>
    </div>
  );
}
