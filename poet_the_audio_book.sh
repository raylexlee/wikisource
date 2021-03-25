#!/bin/bash
BOOK=${1?"missing book name"}
if [[ -d $BOOK ]]; then
cd $BOOK
else
echo the folder $BOOK does not exist!
exit 1
fi
if [[ -d spx ]]; then
  rm spx/*ssml
else  
  mkdir spx
fi
if [[ -d audio ]]; then :; else  
  mkdir audio
fi  
node ../poet2spx.js
cd audio
cp $HOME/my-ms-translator/officialdom/temp/key .
cp $HOME/my-ms-translator/officialdom/temp/region .
../../poet_all_make_audio 001
rm *wav
rm *log
rm key
rm region
cd ..
$HOME/send2hanley
