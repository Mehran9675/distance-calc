import useFetch from "@/lib/hooks/useFetch";
import { Autocomplete } from "@mantine/core";
import END_POINTS from "@/lib/constants/endPonts";
import { FC } from "react";

interface Props {
  onChange: (value: string) => void;
  itemsToHide: string[];
  name: string;
}

const CityAutoComplete: FC<Props> = (props) => {
  const { response: data } = useFetch<string[]>(END_POINTS.CITIES);
  return (
    <Autocomplete
      required
      nothingFound="No Resutls"
      data={(data || []).filter((city) => !props.itemsToHide.includes(city))}
      className="mt-2"
      name={props.name}
      onItemSubmit={({ value }) => props.onChange(value)}
    />
  );
};
export default CityAutoComplete;
