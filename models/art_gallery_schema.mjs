import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    }
});

const postSchema = new mongoose.Schema({
    edited: [{ // idea is edited[0] is publication date and rest is dates of edits.
        type: Date,
        required: true
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images'
    }],   // schema pic has 1 cardinality, needs update.
    content: { 
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    post_type: Boolean, //looks and feels off. Will re-evaluate later.
    authors: [{  //refers to editors too, author is editor[0].
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admins',
        required: true
    }]
});


const imagesSchema = new mongoose.Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String
    }
});


const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    genre: String,

    capacity: {
        max: {
            type: Number,
            required: true
        },
        current: {
            type: Number
        }
    },

    description: String,

    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images'
    }],
});

const artSchema = new mongoose.Schema({
    summary: String,
    genre: String,
    creation_date: Date,
    name: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artists'
    }
});

const artistSchema = new mongoose.Schema({
    info: String,
    profile_pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images'
    },
    born: Date,
    died: Date,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
});


const galleryModel = 
{
    admin: mongoose.model("Admin", adminSchema),
    artist: mongoose.model("Artist", artistSchema),
    art: mongoose.model("Art", artSchema),
    post: mongoose.model("Post", postSchema),
    image: mongoose.model("Image", imagesSchema),
    room: mongoose.model("Room", roomSchema)

};

export default galleryModel;


