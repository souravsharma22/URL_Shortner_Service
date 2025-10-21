import mongoose from "mongoose";

async function connectmongodb(url) {
    await mongoose.connect(url)
    
}

export default connectmongodb;