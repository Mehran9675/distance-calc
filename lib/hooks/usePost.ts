import { useState } from "react";

const usePost = <R = Record<string, any>, T = Record<string, any>>(
  endPoint: string
) => {
  const [response, setResponse] = useState<R | null>(null);
  const [isPosting, setIsPosting] = useState(true);
  const [error, setError] = useState(false);

  const post = (endPoint: string) => async (body: T) => {
    try {
      setError(false);
      setIsPosting(true);
      const data = await (
        await fetch(endPoint, {
          body: JSON.stringify(body),
          method: "POST",
        })
      ).json();
      setResponse(data);
    } catch (e) {
      setError(true);
      throw e;
    } finally {
      setIsPosting(false);
    }
  };

  return { error, response, isPosting, post: post(endPoint) } as const;
};
export default usePost;
