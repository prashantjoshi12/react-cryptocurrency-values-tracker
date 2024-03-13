import React, { useEffect, useState } from "react";
import { useFetchListMutation } from "../API/ apiSlice";

import staticData from "../data/coin.json";
import useDarkSide from "../hooks/useDarkSide";

function Coins() {
  const [fetchList, { isLoading, isSuccess, isError }] = useFetchListMutation();
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [colorTheme, setTheme] = useDarkSide();

  useEffect(() => {
    async function fetchCoins() {
      const { data } = await fetchList();  
          if(data){
            setCoins(data);
          }else{
            // In case if API dosen't works then use static data from json
            setCoins(staticData);
          }
     
    }
    fetchCoins()
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="w-1/2 m-auto ">
        <div className="p-4 flex justify-center">
          <input
            type="text"
            className=" border-2 border-black p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Provide the coin name"
            onChange={handleChange}
          />
          <button
            className={`fa-solid ${
              colorTheme === "dark" ? "fa-moon" : "fa-sun"
            } font-bold py-2 px-4 rounded ml-2`}
            onClick={() => setTheme(colorTheme)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              {filteredCoins.length != 0 && (
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Price Change</th>
                  <th className="px-4 py-2">Market Cap</th>
                </tr>
              )}
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr key={coin.id} className="text-center">
                  <td className="border px-4 py-2">
                    <div className="flex justify-start items-center">
                      <img className="w-10" src={coin.image} alt="crypto" />
                      <h1 className="ml-2">{coin.name}</h1>
                    </div>
                  </td>
                  <td className="border px-4 py-2">Rs.{coin.current_price}</td>
                  <td className="border px-4 py-2">
                    {coin.price_change_percentage_24h < 0 ? (
                      <p className="text-red-500">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    ) : (
                      <p className="text-green-500">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    Rs.{coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
              {filteredCoins.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-2 text-red-500 font-bold "
                  >
                    No coins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Coins;
