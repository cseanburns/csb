#!/bin/bash

## Generates a RSS entry for an index.xml file
## Still not great and is a very ugly piece of work, but does most of the job right now
## Date: 10/11/2020
## Sean Burns
## Usage: ./makerss.sh

# Get date like: Sun, 11 Oct 2020 00:00:00 GMT
date -u | sed 's/ /, /' | sed 's/.M UTC/GMT/' > tmp.xml

# Wrap element around date
sed -e '1 s/^/<lastBuildDate>/'\
  -e '1 s/$/<\/lastBuildDate>/' tmp.xml >> tmp1.xml

trash tmp.xml

# Add two additional elements
echo "<item><title>" >> tmp1.xml

# Get text for h2 element, used for title element
grep "h2 id=" ../WWW/index.html | head -n1 | xmlstarlet sel -t -v '/h2' >> tmp1.xml

# Add closing title element
echo "</title>" >> tmp1.xml

# Join lines 2 and 3
/usr/bin/ed -s tmp1.xml <<< $'2,3j\nw'

# Add base URL
echo "https://cseanburns.net/WWW/index.html#" >> tmp1.xml

# Get attribute text, used for link and guid elements
grep "h2 id=" ../WWW/index.html | head -n1 | xmlstarlet sel -T -t -v '/h2/@id' >> tmp1.xml

# Join lines 3 and 4
/usr/bin/ed -s tmp1.xml <<< $'3,4j\nw'

# Wrap link element around link
sed  -e '3 s/^/<link>/'\
  -e '3 s/$/<\/link>/' tmp1.xml >> tmp2.xml

trash tmp1.xml

# Get date like: Sun, 11 Oct 2020 00:00:00 GMT
date -u | sed 's/ /, /' | sed 's/.M UTC/GMT/' >> tmp2.xml

# Wrap element around date
sed -e '4 s/^/<pubDate>/'\
  -e '4 s/$/<\/pubDate>/' tmp2.xml >> tmp3.xml

trash tmp2.xml

# Copy line 3 to last line
printf '3t$\n,p\n' | /usr/bin/ed -s tmp3.xml >> tmp4.xml

trash tmp3.xml

# Replace link with guid in the new copy
sed -e '5s/link/guid/g' tmp4.xml >> tmp5.xml

trash tmp4.xml

# Add ending element
echo "</item>" >> tmp5.xml
