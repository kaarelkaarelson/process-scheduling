import styles from "./Page404.module.scss";

const Page404 = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <div className={styles.messageWrapper}>
        <h2 className={styles.message}>Page Not Found.</h2>
      </div>
    </div>
  );
};

export { Page404 };
