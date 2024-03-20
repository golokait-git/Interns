import { historyA } from "./history";

export default function normalHistory() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("/api/dashboard/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(historyA.setHistoryData(data));
    } catch (error) {
      dispatch(historyA.setHistoryData(data));
    }
  };
}
