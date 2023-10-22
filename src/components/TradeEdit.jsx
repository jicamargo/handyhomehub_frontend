import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrades, updateRemoveTrade } from '../redux/reducers/tradesSlice';
import { getUserRole } from '../utils/userStorage';
import loadingImage from '../assets/images/loading.gif';

const TradeDelete = () => {
  const dispatch = useDispatch();
  const isAdmin = getUserRole() === 'admin';
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);

  useEffect(() => {
    dispatch(fetchTrades(true));
  }, [dispatch]);

  if (!isAdmin) {
    return (
      <div className="text-center mt-4 font-semibold text-red-500 w-full">
        You must be an admin to see this page
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-4">
        <img
          src={loadingImage}
          alt="Loading..."
        />
      </div>
    );
  }

  const OpenEditTrade = (tradeId) => {
    const updatedTrade = {
      id: tradeId,
    };
    dispatch(updateRemoveTrade(updatedTrade));
  };

  return (
    <div className="text-center mt-4 w-full">
      <h2 className="text-3xl font-semibold mb-4 text-neutral-800">
        Trades Administration
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Click on a trade to edit its details
      </p>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="flex flex-row justify-between bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
          >
            <img
              src={trade.image}
              alt={trade.name}
              className="top-0 left-0 w-20"
            />
            <h5 className="font-semibold text-black text-shadow w-60">
              {trade.name}
            </h5>
            <button
              type="button"
              className="w-20 text-sm px-4 py-4 rounded-md shadow-md bg-red-500 text-white hover:bg-red-600 hover:text-white transition-colors"
              onClick={() => OpenEditTrade(trade.id)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeDelete;
