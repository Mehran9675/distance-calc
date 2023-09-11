import DecreaseIcon from "@/lib/icons/decrease.svg";
import IncreaseIcon from "@/lib/icons/increase.svg";
import { FC, useState } from "react";
import { GetInputProps } from "@mantine/form/lib/types";
import { Values } from "@/components/searchForm/types";

interface Props {
  increaseCount: () => void;
  decreaseCount: () => void;
  count: number;
}

const PassengerCount: FC<Props> = (props) => {
  return (
    <div className="flex items-center justify-between border-slate-200 border rounded p-1">
      <button type="button" onClick={props.decreaseCount}>
        <DecreaseIcon />
      </button>
      <input
        required
        pattern={"[1-9]{1,5}"}
        name="count"
        value={props.count}
        className="border-none w-10 text-center pointer-events-none"
      />
      <button type="button" onClick={props.increaseCount}>
        <IncreaseIcon />
      </button>
    </div>
  );
};
export default PassengerCount;
