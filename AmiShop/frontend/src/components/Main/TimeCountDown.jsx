import React, { useState, useEffect } from "react";
import API from "../../api/axiosInstance";


const TimeCountDown = () => {
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    // Fetch remaining time from the backend
    const fetchRemainingTime = async () => {
      try {
        const { data } = await API.get("/sale/sale-timer", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (data.remainingTime > 0) {
          setCounter(data.remainingTime); // Set remaining time (in seconds)
        } else {
          setCounter(0); // Sale ended
        }
      } catch (error) {
        console.error("Error fetching sale timer:", error);
      }
    };

    fetchRemainingTime();
  }, []);

  useEffect(() => {
    // Decrement the counter every second
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [counter]);

  if (counter === null) {
    return <div className="text-center text-xl">Loading...</div>; // Show a loading state
  }

  if (counter <= 0) {
    return (
      <div className="text-center text-3xl text-red-600">Sale has ended!</div>
    ); // Show sale ended state
  }

  const days = Math.floor(counter / (60 * 60 * 24));
  const hours = Math.floor((counter % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((counter % (60 * 60)) / 60);
  const seconds = counter % 60;

  const handleShowItems = () => {
    alert("Displaying all festival items!"); // Replace with actual functionality
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="relative w-full bg-red-400 bg-cover bg-center h-[200px] md:h-[450px] overflow-hidden rounded-lg flex items-center justify-center text-white">
        <div>
          <img
            className="h-[200px] md:h-[450px] w-[100vw]"
            src="https://img.freepik.com/free-vector/up-fifty-percent-off-big-sale-summer-banner-fresh-cocktail-red-flower-yellow-travel_1262-13339.jpg?t=st=1732093926~exp=1732097526~hmac=9f637451cf69339178bfb8ca0fc3cc1c025f64b3bdfdbda4363e1b6d2df60b62&w=1380"
            alt=""
          />
        </div>
        {/* Countdown Timer */}
        <div className="absolute grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${days}` }}></span>
            </span>
            <div className="border-t-2 border-dotted">days</div>
            
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${hours}` }}></span>
            </span>
            <div className="border-t-2 border-dotted">hours</div>
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${minutes}` }}></span>
            </span>
            <div className="border-t-2 border-dotted">min</div>
            
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${seconds}` }}></span>
            </span>
            <div className="border-t-2 border-dotted">sec</div>
          </div>
        </div>

        {/* Right Button */}
        {/* <button
          onClick={handleShowItems}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded shadow-md"
        >
          🎉 View All Festival Items
        </button> */}
      </div>
    </div>
  );
};

export default TimeCountDown;
