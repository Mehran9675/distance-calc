import { FC, HTMLProps } from "react";

const Show: FC<HTMLProps<HTMLDivElement> & { if?: boolean }> = (props) =>
  props.if ? props.children : null;
export default Show;
