import cities from "@/lib/cities.json";
export function GET() {
  return Response.json(
    cities.map((city) => {
      return city[0];
    })
  );
}
