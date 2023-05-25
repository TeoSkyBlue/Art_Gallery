import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:true
    },

    last_name: {
        type: String,
        required:true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    adminStatus: {
        type: Boolean,
        default: false,
    },

});

const postSchema = new mongoose.Schema({
    edited: [{ // idea is edited[0] is publication date and rest is dates of edits.
        type: Date,
        required: true
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
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
        ref: 'Admin',
        required: true
    }]
});


const imagesSchema = new mongoose.Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String,
        aspectRatio: Number,
    }
});


const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true,
        required: true,
    },
    name: String,
    genre: String,

    description: String,

    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
});

const artSchema = new mongoose.Schema({
    summary: String,
    genre: String,
    creation_date: Date,
    name: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
});



const artistSchema = new mongoose.Schema({
    info: String,
    profile_pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
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


//Indexes:
artSchema.index({name: 'text', genre: 'text', summary: 'text'},
     {name: 'artworks_search_index',
 weights: {name: 2, genre: 1, summary: 1}});


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


