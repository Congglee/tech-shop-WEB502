import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("Category", categorySchema);
