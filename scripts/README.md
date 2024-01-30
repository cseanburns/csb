# README

The `post` script does the following work:

- initializes variables
- converts markdown file to html
- adds metadata html elements to new html file
- inserts new html file into WWW/index.html file
- generates a new table of contents entry in WWW/index.html
- uses the new HTML post to generate a new RSS entry
- inserts the new RSS entry into WWW/index.xml
- ~~copies the updated pages to the remote server for publishing~~
- cleans up

The `post` script is a bit silly.
I intentionally,
for the fun of it,
wanted to write a script that used
a bunch of `ed(1)` commands.
I like `ed(1)`.

## archived-scripts folder

The `post` script originated
with a bunch of separate scripts
that are no longer needed.
These separate scripts have been moved
to the archived-scripts folder.
Below is a description of the workflow
I used with these prior scripts.

---

This directory contains several scripts
that I use to process the site and
copy it to the remote server
once I've written a new post.

Eventually I'll compose a
wrapper script that
includes all of them.
But these scripts are still
fairly fresh or freshly revised, and
I should work out any bugs
before I take it to that level.
Until then,
run the scripts in the order below:

```
make-post post-name.md
make-article post-name.html
insert-article post-name.html
WWW-toc-generator
make-rss
insert-xml
sendpost
```

Both ``makepost`` and ``sendpost`` are
currently stored in my **.bash_functions** file:

```
# Convert markdown to HTML without smart formatting
makepost () {
  sourcefile="$1"
  pandoc -f gfm -t html "$sourcefile" > \
```

And:

```
# Send the updated site to the remote server
sendpost () {
  basedir="/home/USER/workspace/personal_website"
  main_directory="REMOTE_SERVER:~/public_html/"
  sub_directory="REMOTE_SERVER:~/public_html/WWW/"
  scp "$basedir/index.html" "$main_directory"
  scp "$basedir/WWW/index.html" "$sub_directory"
  scp "$basedir/WWW/index.xml" "$sub_directory"
}
