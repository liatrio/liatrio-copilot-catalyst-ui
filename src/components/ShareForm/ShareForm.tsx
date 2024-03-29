import React, { FormEventHandler, useRef } from "react";
import Image from "next/image";

import styles from "./ShareForm.module.scss";
import SubmitButton from "../SubmitButton/SubmitButton";
import LabeledInput, { iLabeledInput } from "../LabeledInput/LabeledInput";

export interface Props {
  enableImageURL: boolean;
  handleSubmit: Function;
}

const ShareForm = (props: Props) => {
  const labeledInput1 = useRef<iLabeledInput>(null);
  const labeledInput2 = useRef<iLabeledInput>(null);
  const labeledInput3 = useRef<iLabeledInput>(null);
  const labeledInput4 = useRef<iLabeledInput>(null);

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (
    event: any,
  ) => {
    event.preventDefault();
    await props.handleSubmit(event, {
      firstName: labeledInput1.current?.getValue(),
      title: labeledInput2.current?.getValue(),
      link: labeledInput3.current?.getValue(),
      imageUrl: labeledInput4.current?.getValue(),
    });
    clear();
  };

  const clear = () => {
    labeledInput1.current?.clear();
    labeledInput2.current?.clear();
    labeledInput3.current?.clear();
    labeledInput4.current?.clear();
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.flexChildLeft}>
          <Image
            alt="exampleCompany Logo"
            src="/dojo-logo-sm.png"
            width="400"
            height="400"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className={styles.flexChildRight}>
          <form
            data-testid="shareForm"
            className={styles.container}
            onSubmit={(e) => handleSubmitForm(e)}
          >
            <LabeledInput
              ref={labeledInput1}
              label="Contributor"
              name="firstName"
            />
            <LabeledInput ref={labeledInput2} label="Blog Title" name="title" />
            <LabeledInput ref={labeledInput3} label="Blog URL" name="link" />
            {props.enableImageURL && (
              <LabeledInput
                ref={labeledInput4}
                label="Image URL"
                name="imageUrl"
              />
            )}
            <SubmitButton label="Share" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareForm;
