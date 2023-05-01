import { useEffect, useState } from "react";

const useListAPI = ({ getFunction }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await getFunction();
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, getData };
};

export default useListAPI;
