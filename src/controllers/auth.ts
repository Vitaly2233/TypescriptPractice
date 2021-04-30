import jwt from "jsonwebtoken";
import * as connection from "../connections/userDB"

let con:any;
class auth {
  async registration(req: any, res: any) {
    con = await connection.conToDb();
  }
}

export default new auth();