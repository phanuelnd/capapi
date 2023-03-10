import { verify } from "jsonwebtoken";
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log({token})
    const decode = verify(token, "mykey");

    req.user = decode;
    next();
  } catch (error) {
    console.log(error)
    res.json({
      message: "You have no access for the blogs unless you are an admin!",
    });
  }
};
export default authenticate;
