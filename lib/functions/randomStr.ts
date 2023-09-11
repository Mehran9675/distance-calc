const rand = () => (Math.random() + 1).toString(36).substring(5);

const DEFUALT_COUNT = 4;
const randomStr = (length?: number) => {
  const results = [];
  for (let count = 0; count < (length || DEFUALT_COUNT); ++count) {
    results.push(rand());
  }
  return results.join("-");
};
export default randomStr;
