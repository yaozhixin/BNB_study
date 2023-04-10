import * as fs from "fs";

export const readAddressList = function () {
    if (!fs.existsSync("address.json")) {
        fs.writeFileSync("address.json", JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync("address.json", "utf-8"));
};

export const storeAddressList = function (addressList: object) {
  fs.writeFileSync("address.json", JSON.stringify(addressList, null, "\t"));
};