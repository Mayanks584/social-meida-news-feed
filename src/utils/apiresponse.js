
/*

this is a thing i use when my all thing is doing well 



*/

class apiresponse {
    constructor(statuscode,data,message="sucesss"){
        this.statuscode=statuscode
        this.data=data
        this.message=message
        this.sucesss=statuscode<400
    }
}

export {apiresponse}