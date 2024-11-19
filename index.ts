import fs, { existsSync, mkdirSync } from "node:fs";
import path from "path";
import sharp from "sharp";
(async () => {
  if (!existsSync('input')) {
    mkdirSync('input');
  }

  if (!existsSync('output')) {
    mkdirSync('output');
  }
  
  const files = fs.readdirSync("input").map((fileName) => path.join("input", fileName))
  console.log(files)


  const result = await Promise.all(
    files.map(async (filename) => {
      const options = filename.toLowerCase().endsWith(".gif") ? { animated: true } : {}
      return sharp(filename, options)
        .webp()
        .toFile(path.join("output", filename.replace("input/", "").split(".")[0] + ".o.webp"))
    })
  )
  console.log(result)
})()