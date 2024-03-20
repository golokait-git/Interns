import { dbConn } from "lib/db";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
 
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "PUT") {
    // Create a new user

    const email_check = await findUser(req.body.emailnewr);

    if (email_check) {
      const data = {
        message: "email already exists",
        status: "1",
        updated_at: new Date().toISOString(),
      };
      res.status(200).json(data);
    } else {
      // referalid Chceck
      if (req.body.referal) {
        const referal = await referalId(req.body.referal);
        
        if (referal) {
          const user = await createUser(req.body);
          res.status(201).json({ user });
        } else {
          res
            .status(201)
            .json({
              message: "Referal Id not Valid",
              error: "refer",
              status: "3",
            });
        }
      } else {
        const user = await createUser(req.body);
        res.status(201).json({ user });
      }
    }
  } else if (req.method === "GET") {
    // Find a user by email
    const email = req.query.email;
    const user = await findUser({ email });
    res.status(200).json({ user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

async function createUser({ referal, first, last, emailnewr, passwordnewr }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(passwordnewr, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    token: uuidv4(),
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    emailnewr,
    hash,
    salt,
    first,
    last,
    passwordnewr,
    emailnewr,
    referal,
  };

  try {
    // const result = await dbConn({
    //   query:
    //     "INSERT INTO cp_users (token, created_time, email, password,password_decrypted, hash, salt ,first_name,last_name ) VALUES(?, ?, ?, ?, ?,?,?,?,?)",
    //   values: [
    //     user.token,
    //     user.createdAt.toString(),
    //     user.email,
    //     password,
    //     user.hash,
    //     user.hash,
    //     user.salt,
    //     user.first,
    //     user.last,
    //   ],
    // });

    const { db } = await connectToDatabase();
    const collection = db.collection("cp_users");

    const result = await collection.insertOne({
      first_name: user.first,
      last_name: user.last,
      token: user.token,
      created_time: user.createdAt.toString(),
      email: user.emailnewr,
      password: user.hash,
      password_decrypted: user.passwordnewr,
      salt: user.salt,
      plan: "",
      plan_id: "",
      coinLimit: 0,
      referal: user.referal,
    });
  } catch (error) {
    
  }

  return user;
}

async function findUser(email) {
  try {
    // const result = await dbConn({
    //   query: "SELECT * FROM admin_login WHERE email = ?",
    //   values: [email],
    // });

    const { db } = await connectToDatabase();
    const collection = db.collection("cp_users");
    const result = await collection.findOne({ email });
    return result;
  } catch (error) {
  
  }
}

export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}

async function referalId(id) {
  try {
    // const result = await dbConn({
    //   query: "SELECT * FROM admin_login WHERE email = ?",
    //   values: [email],
    // });

    const { db } = await connectToDatabase();
    const collection = db.collection("cp_users");
    const objectId = new ObjectId(id);
    const result = await collection.findOne({ _id: objectId });

    return result;
  } catch (error) {
   
  }
}
