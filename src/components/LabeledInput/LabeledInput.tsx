import React, { useState, forwardRef, useImperativeHandle } from "react";

import styles from "./LabeledInput.module.scss";
export interface Props {
  label: string;
  name: string;
  initialValue?: string;
}
export interface iLabeledInput {
  clear(): void;
  getValue(): string;
}

const LabeledInput = forwardRef<iLabeledInput, Props>((props: Props, ref) => {
  const [value, setValue] = useState(props.initialValue);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    clear() {
      setValue("");
    },

    getValue() {
      return value ?? "";
    },
  }));
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input
        data-testid={"input" + props.name}
        className={styles.input}
        name={props.name}
        type={
          props.name === "link" || props.name === "imageUrl" ? "url" : "text"
        }
        value={value || ""}
        onChange={handleChange}
        required
      />
    </div>
  );
});

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
