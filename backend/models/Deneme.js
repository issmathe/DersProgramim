const mongoose = require("mongoose");

const DenemeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    id: { type: String, required: true } // Özel id alanı ekle
  },
  { timestamps: true }
);

const Deneme = mongoose.model("Deneme", DenemeSchema);

module.exports = Deneme;
