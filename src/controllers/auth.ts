import jwt from "jsonwebtoken";
import conToDb from "../connections/userDB"

class auth {
    async registration(req:any, res:any) {
        console.log("Hello");
        let a = (await conToDb)();
        console.log(a)
    }
}

export default new auth();