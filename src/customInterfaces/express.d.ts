declare namespace Express {
  export interface Request {
    user :{
      roles: string[];
      username: string;
      _id: string;
    }
  }
}