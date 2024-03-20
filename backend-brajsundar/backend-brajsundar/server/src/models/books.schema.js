import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: [true, "BookName is required"],
    },
    bookLink: {
        type: String,
        required: [true, "BookLink is required"],
    },
    bookDetail: {
        type: String,
        required: [true, "BookDetail is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    bookThumbnail: {
        type: String,
        required: [true, "BookThumbnail is required"],
    },
    preBook: {
        type: String,
        required: [true, "PreBook is required"],
    },
},
    { timestamps: true },
);

const Book = mongoose.model("Books", bookSchema);

export default Book;