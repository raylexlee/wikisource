#!/bin/awk -f
BEGIN {
  FS=",";
}
{
  printf("%s %s\n",$1, $3);
}
