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
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },   // schema pic has 1 cardinality, needs update.
            //Or not.
    content: { 
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    // post_type: Boolean, //looks and feels off. Will re-evaluate later.
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
    genre: String,

    description: String,

    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
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
        //default Uknown.
    },
    creator_name: {
        type: String,
        default: 'Uknown'
    }
});



const artistSchema = new mongoose.Schema({
    info: String,
    profile_pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: '646b3fcf7ad7900b3a7c785b'
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


//Pre defined Indexes:
//Should probably have names of creators stored in artwork anyways.(!)
artSchema.index({name: 'text',creator_name: 'text', genre: 'text', summary: 'text'},
     {name: 'artworks_search_index',
 weights: {name: 3, creator_name: 2, genre: 1, summary: 1}});


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


