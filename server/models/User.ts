import bcrypt from 'bcrypt';
import { model, Model, Schema } from 'mongoose';
import { IUser } from '../types';

const SALT_WORK_FACTOR = 10;
export interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    github_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile_link: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    token: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser, UserModel>('User', UserSchema);
export default User;
