import styles from "./LoadingMessage.module.scss";
export interface Props {}

export interface Props {
  children: React.ReactNode;
}

const LoadingMessage: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>Warning!</div>
      <div className={styles.message}>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default LoadingMessage;
