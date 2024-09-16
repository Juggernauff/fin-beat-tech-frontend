import styles from "./SelectAction.module.scss";

export default function SelectAction({ onSelectChange }) {
  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <div className={styles.selectActionContainer}>
      <label htmlFor="select-action">Выберите действие: </label>
      <select id="select-action" onChange={handleChange}>
        <option value="post_entities">Отправить сущности</option>
        <option value="get_entities">Получить сущности</option>
      </select>
    </div>
  );
}
