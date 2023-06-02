// authentication helpers to encrypt helpers

import crypto from "crypto";

const SECRET = "olsikule-REST-API";

// create randomiser
export const random = () => crypto.randomBytes(128).toString("base64");
// authentication 
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex");
}