import mongoose, { Schema } from "mongoose";


import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      // require:true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    roles: {
      type: [String],
      enum: ["user", "moderator", "admin"],
      default: ["user"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: "text", name: "text" });

userSchema.pre("save",async function () {
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10)
  }
})

userSchema.methods.isPasswordCorrect = async function(password) {
  

  return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAcesstoken=function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    fullname:this.fullname,
    username:this.username
  },
  process.env.ACESS.TOKEN.SECRET.KEY,
  {
    expire:process.env.ACESS.TOKEN.SECRET.EXPIRY
  }
)

}

userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
    _id:this._id,

  },
  process.env.REFRESH.TOKEN.SECRET.KEY,

  {
    expire:process.env.REFRESH.TOKEN.SECRET.EXPIRY
  }


)
}

export const User = mongoose.model("User", userSchema);
export { User as Users };
