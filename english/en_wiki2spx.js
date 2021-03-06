/* Modified from wiki2spx.sj by Raylex Lee on 10 February 2021
   Purpose : Prepare the small chunk size of ssml parts of each chapter of the fiction
   Usage : node wiki2spx.js
   Save : 001_?.ssml 002_?.ssml ... 060_?.ssml in sub-directory spx (e.g. fiction has 60 chap
   Ouput the last chapter 3 digit number to standard output 
*/
const fs = require('fs');
//const voiceName = [ 'en-GB-RyanNeural', 'en-GB-MiaNeural', 'en-GB-LibbyNeural' ];
const voiceName = [ 'en-GB-MiaNeural', 'en-GB-RyanNeural', 'en-GB-LibbyNeural' ];
const voiceText = (voice, text) => `<voice name="${voice}">
        ${text}
    </voice>`;
const ssml = (title, body) => `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-HK">
    ${title}
    ${body}
</speak>
`;
const subst = `<break time="100ms" />`;
const regex = /\n+/s;
const Chapters = fs.readFileSync('./coverparameters.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
Chapters.forEach(Chapter => {
  let chapter, filename, book, title, booktitle;
  [chapter, booktitle] = Chapter.split(' ');
  [book, title] = booktitle.split('/');
  filename = booktitle.replace(/\//g,'_');
  const rawdata = fs.readFileSync(`./${filename}.txt`, {encoding:'utf8', flag:'r'});
  const paras = rawdata.replace(/&/mg, 'and').split(regex);
  const titleVoice = voiceText(voiceName[2], `${title.replace(/_/g, ' ')}`);
  let j = 0;
  let accPara = '';
  let cnt = 0;
  while (paras.length) {
    if ((cnt + 1*(paras[0].length) + subst.length) > 7500) {
      j++;
      const bodyVoice =  voiceText(voiceName[1], accPara);
      const title = (j === 1) ? titleVoice : '';
      fs.writeFileSync(`./spx/${chapter}_${j.toString().padStart(3, '0')}.ssml`, ssml(title, bodyVoice));
      cnt = 0;
      accPara = '';
    }
    const topPara = paras.shift();
    accPara = `${accPara}${subst}${topPara}`;
    cnt += 1*(topPara.length) + subst.length;
  }
  if (accPara) {
      j++;
      const bodyVoice =  voiceText(voiceName[1], accPara);
      const title = (j === 1) ? titleVoice : '';
      fs.writeFileSync(`./spx/${chapter}_${j.toString().padStart(3, '0')}.ssml`, ssml(title, bodyVoice));
  }
});
const LastChapter = Chapters.pop();  
console.log(LastChapter.split(' ')[0])