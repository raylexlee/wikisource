const fs = require('fs');
const escapePattern = /[\]\['&!?,()]/g;
const subst = `<break time="100ms" />`;
const regex = /\n+/s;
const Chapters = fs.readFileSync('./coverparameters.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
Chapters.forEach(Chapter => {
  let chapter, filename, author_title;
  [chapter, filename, author_title] = Chapter.split(',');
  const author = author_title.split(' ')[0];
  const rawdata = fs.readFileSync(`./${filename.replace(/ /g, '_')}.txt`, {encoding:'utf8', flag:'r'}).replace(/^\n+/, "");
  fs.writeFileSync(`./text/${chapter}.txt`, rawdata);
});
