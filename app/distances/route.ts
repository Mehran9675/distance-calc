import haversine from "haversine-distance";
import cities from "@/lib/cities.json";

export async function POST(req: Request) {
  const payload = (await req.json()) || {};
  for (const key in payload.journey) {
    if (payload.journey[key] === "Dijon") return Response.error();
    const coordinates = cities.filter(
      (city) => city[0] === payload.journey[key]
    )[0];
    payload.journey[key] = {
      latitude: coordinates[1],
      longitude: coordinates[2],
      value: coordinates[0],
    };
  }
  const distances: Record<
    number,
    { from: string; to: string; distance: number }
  > = {};
  let totalDistance = 0;
  const sortedCities: (string | number)[] = [];
  for (const key in payload.journey) {
    if (!isNaN(Number(key))) sortedCities.push(key);
  }
  sortedCities.sort();
  sortedCities.unshift("origin");
  sortedCities.push("destination");
  sortedCities.forEach((key, index) => {
    if (index + 1 === sortedCities.length) return;
    const origin = payload.journey[key];
    const destination = payload.journey[sortedCities[index + 1]];
    const distance =
      haversine(
        { latitude: origin.latitude, longitude: origin.longitude },
        { latitude: destination.latitude, longitude: destination.longitude }
      ) / 1000;
    distances[index] = {
      from: origin.value,
      to: destination.value,
      distance,
    };
    totalDistance += distance;
  });

  return Response.json({
    distances,
    totalDistance,
  });
}
