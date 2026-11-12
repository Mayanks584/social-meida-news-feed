const asynchandler = (request) =>{
    return (req,res,next) =>{
        Promise.resolve(request(req,res,next)).catch((err)=> next(err));
    }
}

export{asynchandler}


// async function always return a promise 