  import mongoose, { Schema } from "mongoose";

  const productSchema = new Schema(
    {
      productName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      sellingPrice: {
        type: Number,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      productImage:[ {
        public_id: String,
        url: String,
        //   required: true,
      }],
      quantity: {
        type: Number,
        required: true,
      },
      discountPercentage: {
        type: Number,
        // required: true,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      // discountPersent: {
      //     type: Number,
      // },
    },
    { timestamps: true }
  );

  export const Product = mongoose.model("Product", productSchema);
