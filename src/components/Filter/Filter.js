import React from "react";
import styles from "./Filter.module.scss";

export default function Filter({ filter, handleFilterChange, handleFilterSubmit }) {
  return (
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
  );
}