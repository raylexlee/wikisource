#!/bin/bash
BOOK=$(pwd | tr -d [A-Za-z]/)
if [[ -d spx ]]; then
  rm spx/*ssml
else  
  mkdir spx
fi
if [[ -d audio ]]; then :; else  
  mkdir audio
fi  
vim author.txt
echo $(node ../wiki2spx.js) > last_chapter.txt
cd audio
cp $HOME/my-ms-translator/officialdom/temp/key .
cp $HOME/my-ms-translator/officialdom/temp/region .
../../all_make_audio 001
rm *wav
rm *log
rm key
rm region