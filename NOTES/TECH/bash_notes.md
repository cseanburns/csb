# BASH Notes

## Compound commands

Commands in a list with `()` are executed in a subshell:

```
(ls ; cd $HOME)
```

Commands in a list with `{}` are executed in current shell environment.
Keep spaces after and before brackets and end with a semicolon.

```
{ ls ; cd $HOME ; }
```

## Basic variables (aka Parameters)

### Quoting

Variables are expanded in double quotes but not single quotes:

```
echo "I am $HOME"
I am /home/USER
```

But:

```
echo 'I am $HOME'
I am $HOME
```

### Setting

It's okay to leave curly braces `{}` out for minor uses, small scripts, etc., but
using `{}` is more robust, explicit, and it is especially helpful when marking the end of a variable value.
 
```
name="Ray"
echo "Hello, $name!"
echo "Hello, ${name}!"
echo "Hello, ${name}'s kids!"
```

### Appending

Append to a variable:

```
name="Ray"
name+=" of Light"
echo "$name"
Ray of Light
```

Or append numbers as strings:

```
a=4
a+=3
echo "$a"
43
```

### Types

Declare variable to be an integer.

```
declare -i a=4
a+=3
echo "$a"
7
```

Declare variable as an indexed array:

```
declare -a fruit=(apple banana cherry)
```

Declare variable as an associated array:

```
declare -A fruit=(["first"]="banana" ["second"]="apple" ["third"]="cherry")
```

## Parameter Expansion
 
### Substitution

Use `${parameter:-substitute}` if parameter is unset.
This returns 'Harry' instead of a value for 'friend' since 'friend' is unset:

```
name="Norman"
echo "${name} and ${friend:-Harry}!"
Norman and Harry
```
 
But in this example, 'Harry' isn't used because 'Gina' is declared.

```
friend="Gina"
echo "${name} and ${friend:-Harry}!"
Norman and Gina
```

Using the `+` sign returns the alternate, even if the variable is set:

```
friend="Gina"
echo "${name} and ${friend:+Harry}!"
Norman and Harry
```

### Substring expansion

Removes the first two characters:

```
letters="abcdefg"
echo "${letters:2}"
cdefg
```

Removes the first two characters, returns the next three and stops:

```
echo "${str:2:3}"
```

### Matching Prefixes

Names the matching prefix:

```
filename="1a_history_linux.md"
filetype=(md txt csv dat)
echo "${!file*}"
filename filetype
```

### Parameter length

Return the length of a variable:

```
filename="1a_history_linux.md"
echo "${#filename}"
19
```

### Remove Matching Prefix Patterns

Let's set a variable:

```
filename="1a_history_linux.md"
```

The following will remove up to the shortest (first) match of the underscore,
from left to right:

```
echo "${filename#*_}"
history_linux.md
```

The following will remove up to the longest (last) match of the underscore:

```
echo "${filename##*_}"
linux.md
```

Since there's only one period, you can remove all through the period:

```
echo "${filename#*.}"
md
```

### Remove Matching Suffix Patterns

Remove the suffix, i.e., matching right to left.
Using the `%` matches the first pattern and `%%` matches the furthest.
Working right to left, then:

```
echo "${filename%.md}"
1a_history_linux
```

Or, to be file extension agnostic:

```
echo "${filename%.*}"
```

Go to the first match of the underscore (which can be replaced with another pattern) from the right:

```
echo "${filename%_*}"
1a_history
```

And the longest match from the right:

```
echo "${filename%%_*}"
1a
```

Match the `a` to remove all but the `1`:

```
echo ${filename%%a_*}
1
```

### Search and Replace: Pattern Substitution

Replaces first match:

```
my_path="/home/home/bin"
echo "${my_path/home/usr}"
/usr/home/bin
```

Use two `//` to replace all matches:

```
echo "${my_path//home/usr}"
/usr/usr/bin
```

In the past, I'd use `sed` for something to print my shell's paths on separate newlines, but we can add newlines with this method.
See the section on **QUOTING** in the Bash man page for the meaning `$'string'` (ANSI C quoting):

```
echo -e "${PATH//:/$'\n'}"
```

`printf` works and is probably better:

```
printf "${PATH//:/$'\n'}"
```

Or more simply:

```
printf "%s\n" $PATH
```

Another example:

```
name="Chris"
echo "${name/Chris/Ralph}"
Ralph
```

Or:

```
printf "%s\n" "${name/Chris/Ralph}"
Ralph
```

### Case modification

We can change the case in various ways.

#### Lower to Upper

The `^` converts lower to upper:

To change the first character:

```
name="chris"
echo "${name^}"
Chris
```

Upper cases:
 
```
echo "${name^^}"
CHRIS
```

Use pattern matching.
Here we match for the letter `i`:

```
echo "${name^^i}"
chrIs
```

Or ranges:

```
echo "${name^^[a-n]}"
CHrIs
```

#### Upper to Lower

The `,` converts upper to lower case:

```
name="CHRIS"
```

Conver the first character:

```
echo "${name,}"
cHRIS
```

Convert all characters:

```
echo "${name,,}"
chris
```

Use pattern matching:

```
echo "${name,,I}"
CHRiS
```

### Parameter Transformation

We more options with this syntax: `${parameter@operation}`.

Converts lower to uppercase:

```
name="Chris"
echo "${name@U}"
CHRIS
```

Converts first character to upper and remaining characters to lower:

```
name="chris"
echo "${name@u}"
Chris
```

Example on an array:

```
animals=(bats kangaroos cheetahs zebras snakes)
echo "${animals[@]@u}" 
Bats Kangaroos Cheetahs Zebras Snakes
```

Transformations include upper to lowercase:

```
name="CHRIS"
echo "${name@L}"
chris
```

Returns single quoted string:

```
name="CHRIS"
echo "${name@Q}"
'CHRIS'
```

Returns parameter and value for associative array

```
animals=(bats kangaroos cheetahs zebras snakes)
echo "${animals[@]@A}" 
declare -a animals=([0]="bats" [1]="kangaroos" [2]="cheetahs" [3]="zebras" [4]="snakes")
```

For example:

```
while IFS=, read -r food type; do
	echo "${food@u} ${type@U}"
done < foods.txt
```

where `foods.txt` is:

```
apple,is fruit
broccoli,is vegetable
banana,is fruit
kale,is vegetable
```

The `while` loop returns:

```
Apple IS FRUIT
Broccoli IS VEGETABLE
Banana IS FRUIT
Kale IS VEGETABLE
```

## Arrays

### Indexed Arrays

`declare` is optional but use it to make it obvious that we're declaring an array:

```
declare -a fruits=(apple banana cherry)
```

Returns the entire array:

```
echo "${fruits[@]}"
apple banana cherry
```

Index starts at `0`, so this returns the second item in the list:

```
echo "${fruits[1]}"
banana
```

Starting from the right, which indexes at `-1`:

```
echo "${fruits[-1]}"
cherry
```

Add the `#` to get the number of items in (or length of) the array:

```
echo "${#fruits[@]}"
3
```

Slice the array:

```
echo "${fruits[@]:1:3}"
banana cherry
```

Append to the array.
Note that if item exists at index 3, then this replaces the item:

```
fruits[3]="orange"
```

Agnostic way to append to the array:

```
fruits+=(orange)
```

Print all keys or indices in array

```
echo "${!fruits[@]}"
```

Loop through an array

```
for i in "${fruits[@]}" ; do
    echo "${i}"
done
```
 
Loop through an array's indices, print each line

```
for i in "${!fruits[@]}" ; do
    echo "$i"
done
```

### Associative Arrays

```
declare -A fruits=(["first"]="Banana" ["second"]="Apple" ["third"]="Cherry")
```

Print all values but not keys

```
echo "${fruits[@]}"
```

Print all keys or indices in array.
Unfortunately, Bash doesn't preserve the order:

```
echo "${!fruits[@]}"
second first third
```

Add to assoc array

```
fruits+=(["fourth"]="orange") 
```

## Brace Expansion

Generate arbitrary strings.
Use the following syntax:

```
{x..y[..incr]}
```

Thus, this expands to `1 2 3 4 5`:

```
echo {1..5}
1 2 3 4 5
```

Or using the alphabet:

```
echo {a..f}
a b c d e f
```

To use increments (or steps):

```
echo {1..10..2}
1 3 5 7 9
```

Again, can use increments with the alphabet:

```
echo {a..m..2}
a c e g i k m
```

Or in reverse:

```
echo {m..a..2}
m k i g e c a
```

We can also use brace list expansion:

```
echo {ralph,gina}@example.com
ralph@example.com gina@example.com
```

Or creating directories:

```
mkdir -p bin/{src,images}
```


Values in `{..}` are expanded before `$var` is evaluated, so the following doesn't work:
(we'd expect the output: `1 2 3 4 5`).
    
```
n=5
echo {1..$n}
1..5
```

## Command Substitution

The output of a command replaces the command name.
I use this often, but basically it's like so:

```
touch "$(date +%A).md"
ls
Wednesday.md
```

## Process Substitution

Command substitution creates text as output, but
process substitution creates a file as output.
So if we want to treat the output as a file,
then use process substitution.
Thus, it seems to me that process substitution's best use case
is to avoid the use of temporary files.
E.g., instead of:

```
sort a.txt > a.sorted
sort b.txt > b.sorted
diff a.sorted b.sorted
```

We can do:

```
diff <(sort a.txt) <(sort b.txt)
```

Here's a simple case using `grep` alternation.
If today is 'Wed' or 'Thu', then the output returns that:

```
grep -E "Wed|Thu" <(date)
Wed
```

## Redirection

### Here Documents

This takes the syntax of:

```
command <<EOF
...
...
...
EOF
```

I use this in shell script with `ed` because it's cool to add `ed` commands:

```
ed testfile <<EOF
a
This is a test file.
It's nothing but a file that I created with a HERE DOC.
.
wq
EOF
```

Then we can edit it and run commands:

```
ed testfile <<EOF
a
I'm adding more lines to this file.
.
g/adding/s/more/new/
wq
EOF
```

In scripts (specifically in indented loops, functions, etc), add the dash, which strips leading tabs, etc, and
helps to keep the function clean looking:

```
function() {
    command
    command <<-EOF
    ...
    ...
    ...
    EOF
}
```

### Here Strings

Here strings come in the form:

```
command <<< "some input"
```

And is a better alternative than:

```
echo ... | command
```

Avoiding `echo` means avoiding a subshell:

```
grep hello <<< "hello world"
```

as compared to:

```
echo "hello world" | grep hello
```

Some use cases.

A command that takes stdin:

```
wc -c <<< "$(date)"
```

Hash a string:

```
sha256sum <<< "some_string_of_characters"
```

Check that a regex matches some value:

```
grep -E '[0-9]{4}' <<< "$(date)"
```

Avoid subshells.
This is good:

```
count=0
while read -r line; do
    ((count++))
done <<< "one line"
```

But this would create a subshell:

```
count=0
echo "one line" | while read -r line; do
    ((count++))
done

echo "$count"
```

## {Pre,Post}-{increment,decrement}

Post-increment `id++` and post-decrement `id--` will return the original value and then auto increment in **arithemtic expansion**.

```
a=4
echo $((a++))
4
echo $((a++))
5
```

Pre-increment `++id` and pre-decrement `--id` auto increments immediately.

```
a=4
echo $((++a))
5
echo $((++a))
6
```

However, both act the same way in a, e.g., a `for` loop.
I.e., these are equivalent.

Post-increment:

```
for ((i=0;i<10;i++)) ; do echo $i ; done
0
1
2
3
4
5
6
7
8
9
```

Pre-increment:

```
for ((i=0;i<10;++i)) ; do echo $i ; done
0
1
2
3
4
5
6
7
8
9
```

However, in a `while` loop when incrementing in a condition.

Post-increment:

```
i=0
while (( i++ <3 )); do echo "i is now $i" ; done
i is now 1
i is now 2
i is now 3
```

Pre-increment:

```
i=0
while (( ++i <3 )); do echo "i is now $i" ; done
i is now 1
i is now 2
```

## Loops

- use `break` to stop a loop
- use `return` to stop a function
- use `exit` to stop a script

### Count columns

Here's an examle where I wanted to do something in Bash, like count numbers in separate columns in a file,
that I'd normally do in something like `awk`:

```
#!/usr/bin/env bash

while IFS=, read -r one two three; do
    (( sum_one += one ))
    (( sum_two += two ))
    (( sum_three += three))
done < "$1"

echo "$sum_one $sum_two $sum_three"
```

Where `"$1"` might be:

```
1,2,3
4,5,6
7,8,9
```

The above would be the `awk` equivalent:

```
#!/usr/bin/awk -f

BEGIN { FS="," }

{
	sum_one += $1
	sum_two += $2
	sum_three += $3
}

END {
	print sum_one, sum_two, sum_three
}
```

### Office Hours

Each semester I put a sign on my door that lists my office hours for that semester.
I usually do this in code.
Here are a couple of examples:

```
#!/usr/bin/env bash

declare -a office_days=(Wed Thu)

today=$(date +%a)

for d in "${office_days[@]}"; do
    if [[ "$today" = "$d" ]]; then
        echo "office hours today"
        exit 0
    fi
done

echo "office hours not today"
```

Here's a wordier version:

```
#!/usr/bin/env bash

declare -a office_days=(Mon Tue Wed Thu Fri)

if [[ "${office_days[0]}" = "$(date +%a)" || "${office_days[1]}" = "$(date +%a)" ]] ; then
	echo "office hours today"
else
	echo "office hours not today"
fi 
```

### Using `read` like I would `awk`

Based on the @YSAP YT channel:

```
#!/usr/bin/env bash

while IFS=, read -r name age job; do
  echo "$name works as a $job and is $age years old."
done < data.csv
```

Or:

```
#!/usr/bin/env bash

data=(name age job)

name="${data[0]}"
age="${data[1]}"
job="${data[2]}"

while IFS=, read -r "${data[@]}" ; do
  echo "${name}, the ${job}, is ${age} years old."
done < data.csv
```

Where `data.csv` is:

```
angie,23,cat burgler
barry,30,graphics designer
carolyn,44,tycoon
dennis,50,professor
```
