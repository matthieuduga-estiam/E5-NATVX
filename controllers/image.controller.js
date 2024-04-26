import fs from "fs";

export const findOne = async (req, res) => {
  var imageContent = fs.readFileSync(`./assets/uploads/${req.params.id}.png`);

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": imageContent.length,
  });
  res.end(imageContent);
  return
};
