#!/bin/bash

# Date: 2020-03-27
# This script generates a list of entries from WWW/index.html and
# creates an HTML list of them for entry into ~/index.html
   
grep "h2 id=" $1 | sed -e 's/h2 id/a href/' -e\
's/h2/a/' -e\
's/\"/\"WWW\/index.html\#/' -e\
's/^/\<li\>/' -e\
's/$/\<\/li\>/'
