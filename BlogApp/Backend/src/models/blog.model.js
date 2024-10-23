import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    blogImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
        minlength: [200, "Should caontain at least 200 characters"]
    },
    adminName: {
        type: String,
        // required: true,
    },
    // adminPhoto: {
    //     type: String,
    //     // required: true,
    // },
    
    adminPhoto: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    
    createdBy: {
        type: Schema.ObjectId,
        ref: "User",
    }
})

export const Blog = mongoose.model("Blog", blogSchema)
