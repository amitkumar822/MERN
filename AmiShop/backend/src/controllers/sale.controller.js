export const SALE_END_TIME = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000); // 6 days from now

export const getSaleTimer = (req, res) => {
  const currentTime = new Date();
  const remainingTime = SALE_END_TIME - currentTime;

  if (remainingTime <= 0) {
    return res.json({ message: "Sale has ended", remainingTime: 0 });
  }

  res.json({
    remainingTime: Math.floor(remainingTime / 1000), 
    saleEndTime: SALE_END_TIME, 
  });
};
