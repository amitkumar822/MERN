1. const categoryProducts = await Product.distinct("category");
   👉 distinct :- this function finds all products by category and another field like (category, price, photo ...)



<!-- JWT -->
comment:- secure: true, after deploy on server we can use it

 res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 1000, // 1 day
  });