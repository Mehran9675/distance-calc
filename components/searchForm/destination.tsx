import { PlusCircleIcon } from "lucide-react";
import { FC, ReactElement, useMemo, useState } from "react";
import {
  CrossCircledIcon,
  DotsVerticalIcon,
  ValueIcon,
} from "@radix-ui/react-icons";
import UnionIcon from "@/lib/icons/union.svg";
import Show from "@/lib/show";
import CityAutoComplete from "@/components/searchForm/cityAutoComplete";

interface Props {
  values: Record<string, string>;
  setValues: (values: Record<string, string>) => void;
}

const Destination: FC<Props> = ({ values, setValues }) => {
  const [count, setCount] = useState(0);
  const destArray = useMemo(() => {
    const newValues = { ...values };
    delete newValues.origin;
    delete newValues.destination;
    return Object.keys(newValues);
  }, [values]);

  const alreadySelectedCities = useMemo(() => {
    const result: string[] = [];
    for (const key in values) {
      result.push(values[key]);
    }
    return result;
  }, [values]);

  const addDestination = () => {
    setCount((count) => count + 1);
    setValues({ ...values, [count]: "" });
  };

  const removeDestination = (key: string) => () => {
    const newValues = { ...values };
    delete newValues[key];
    setValues(newValues);
  };

  const handleChangeIntermitentDestination = (key: string) => (value: string) =>
    setValues({ ...values, [key]: value });

  const renderDestinations = () => {
    const renders: ReactElement[] = [];
    destArray.forEach((key) => {
      renders.push(
        <label key={key} className="relative">
          Intermittent destination:
          <CityAutoComplete
            onChange={handleChangeIntermitentDestination(key)}
            name={key}
            itemsToHide={alreadySelectedCities}
          />
          <CrossCircledIcon
            onClick={removeDestination(key)}
            className="absolute right-[-30px] top-[45%] translate-y-1/2 text-blue-400 cursor-pointer"
          />
        </label>
      );
    });

    return renders;
  };

  const renderDots = () => {
    const renders: ReactElement[] = [];
    destArray.forEach((_, index) => {
      const isLast = index === destArray.length - 1;
      renders.push(
        <>
          <DotsVerticalIcon />
          <DotsVerticalIcon />
          <DotsVerticalIcon />
          <DotsVerticalIcon />
          <Show if={isLast}>
            <UnionIcon />
          </Show>
          <Show if={!isLast}>
            <ValueIcon />
          </Show>
        </>
      );
    });
    return renders;
  };

  return (
    <div className="flex w-full items-center">
      <span className="flex flex-col justify-center items-center mr-10">
        <ValueIcon />
        <DotsVerticalIcon />
        <DotsVerticalIcon />
        <DotsVerticalIcon />
        <DotsVerticalIcon />
        <Show if={!!destArray.length}>
          <ValueIcon />
        </Show>
        <Show if={!destArray.length}>
          <UnionIcon />
        </Show>
        {renderDots()}
      </span>
      <div className="text-xs space-y-3 flex flex-col w-3/5">
        <label>
          City of Origin:
          <CityAutoComplete
            name="origin"
            onChange={handleChangeIntermitentDestination("origin")}
            itemsToHide={alreadySelectedCities}
          />
        </label>
        {renderDestinations()}
        <label>
          City of destination:
          <CityAutoComplete
            name="destination"
            onChange={handleChangeIntermitentDestination("destination")}
            itemsToHide={alreadySelectedCities}
          />
        </label>
        <label
          onClick={addDestination}
          className="relative flex items-center text-blue-300"
        >
          <PlusCircleIcon className="absolute left-[-59px] scale-75 cursor-pointer" />
          <a>Add destination</a>
        </label>
      </div>
    </div>
  );
};
export default Destination;
