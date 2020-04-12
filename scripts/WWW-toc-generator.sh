#!/bin/bash

# Date: 2020-03-27
# This script generates a list of entries from WWW/index.html (the blog) and
# creates an HTML list of them for entry into ~/index.html
#
# To generate the toc:
# Usage: ./WWW-toc-generator.sh ../WWW/index.html > tmp.html 
   
# Create list item from other HTML tags
grep "h2 id=" $1 | sed -e 's/h2 id/a href/' -e\
's/h2/a/' -e\
's/\"/\"WWW\/index.html\#/' -e\
's/^/\<li\>/' -e\
's/$/\<\/li\>/' > tmp.html

# Get the most recent entry only; comment out if want the entire list
head -n1 tmp.html > tmp1.html

# Cleanup
trash tmp.html

# Automatically add to ../index.html
# example code to work out later
#sed -e "s/Two/Two\nThree/" test1.txt 
