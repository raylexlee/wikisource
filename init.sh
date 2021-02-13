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
node ../wiki2spx.js
cd audio
cp $HOME/my-ms-translator/officialdom/temp/key .
cp $HOME/my-ms-translator/officialdom/temp/region .
../../all_make_audio 001
rm *wav
rm *log
rm key
rm region
cd ..
$HOME/send2hanley
