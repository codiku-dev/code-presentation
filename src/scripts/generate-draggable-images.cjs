const fs = require("fs");
const path = require("path");

/* Used to generate the list of images
 into src/features/draggable-image-list/draggableImages.json 
based on what is present in the public/image-panel folder 
*/
const imageDir = path.join("public/image-panel");
const outputFilePath = path.join(
  "src/features/draggable-image-list/draggableImages.json"
);

const images = fs.readdirSync(imageDir).map((file) => ({
  filePath: `/image-panel/${file}`,
}));

fs.writeFileSync(outputFilePath, JSON.stringify(images, null, 2));
console.log("Draggable images JSON generated.");
