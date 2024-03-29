import React from "react";

import styles from "./SubmitButton.module.scss";

export interface Props {
  label: string,
}

const SubmitButton: React.FC<Props> = ({label}) => {
  return (
    <input
      className={styles.submitbutton}
      type="submit"
      value={label}
    />
  );
};

export default SubmitButton;
