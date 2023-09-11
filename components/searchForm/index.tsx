import PassengerCount from "@/components/searchForm/passengerCount";
import { Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import Destination from "@/components/searchForm/destination";
import { useState } from "react";
import { Values } from "@/components/searchForm/types";

const SearchForm = () => {
  const [values, setValues] = useState<Values>({
    count: 0,
    travelDate: new Date(),
  } as Values);

  const handleIncreaseCount = () =>
    setValues({ ...values, count: values.count + 1 });
  const handleDecreaseCount = () =>
    values.count - 1 !== 0 && setValues({ ...values, count: values.count - 1 });

  const handleUpdateJourney = (newJourney: Record<string | number, string>) =>
    setValues({ ...values, journey: newJourney });

  return (
    <form
      action={"/results"}
      method="GET"
      className="w-full flex flex-col items-center"
    >
      <div className="flex items-start justify-between w-full">
        <Destination values={values.journey} setValues={handleUpdateJourney} />
        <div className="flex-col mt-6 space-y-10">
          <PassengerCount
            count={values.count}
            increaseCount={handleIncreaseCount}
            decreaseCount={handleDecreaseCount}
          />
          <DatePickerInput
            required
            value={values.travelDate}
            className="whitespace-nowrap"
            name="date"
            valueFormat="DD/MM/YYYY"
            placeholder="Pick date"
          />
        </div>
      </div>
      <Button color="dark" type="submit" className="mt-8 bg-stone-800">
        Submit
      </Button>
    </form>
  );
};
export default SearchForm;
