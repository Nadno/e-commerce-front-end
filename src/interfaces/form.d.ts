import { ChangeEvent } from "react";

export default interface FormProps <T> {
  data: T,
  handleChange(e: ChangeEvent): void;
}