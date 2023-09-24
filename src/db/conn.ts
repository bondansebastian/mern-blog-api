import mongoose from "mongoose";

export default {
    connectToServer: function (callback: any) {
        let uri = process.env.ATLAS_URI;
        const password = process.env.ATLAS_PASSWORD;

        if (uri === undefined) {
            throw new Error("Undefined Atlas URI");
        }
        
        if (password === undefined) {
            throw new Error("Undefined Atlas password");
        }
        
        uri = uri.replace('<password>', encodeURIComponent(password));

        mongoose.connect(uri)
            .then(() => {
                console.log("Successfully connected to MongoDB."); 
            })
            .catch(error => {
                callback(error);
            });
    },
};