## Cheat sheet for `printf` in `bash`

`printf` doesn't assume newlines, so add `\n` to create one.

### Common Formats

 | Specifier   | Meaning                                     | Example                         |
 | ----------- | ---------                                   | ---------                       |
 | `%s`        | String                                      | `printf "%s\n" "text"`          |
 | `%d`        | Integer                                     | `printf "%d\n" 50`              |
 | `%f`        | Float                                       | `printf "%f\n" 2.71828`         |
 | `%e`        | Float in scientific notation (lower)        | `printf "%e\n" 2.71828`         |
 | `%E`        | Float in scientific notation (upper)        | `printf "%E\n" 2.71828`         |
 | `%g`        | Float (trim) in scientific notation (lower) | `printf "%g\n" 2.71828`         |
 | `%G`        | Float (trim) in scientific notation (upper) | `printf "%G\n" 2.71828`         |
 | `%x`        | Hex (lower)                                 | `printf "%x\n" 255`             |
 | `%X`        | Hex (upper)                                 | `printf "%X\n" 255`             |
 | `%o`        | Octal                                       | `printf "%o\n" 8`               |
 | `%b`        | Interpret backslash escapes                 | `printf "%b" "one\ntwo\three\n` |
 | `%%`        | Interpret backslash escapes                 | `printf "%s%%\n" "1"`           |

### Common Backslash Escapes

 | Escape   | Meaning         |
 | -------- | ---------       |
 | `\n`     | Newline         |
 | `\t`     | Tab             |
 | `\v`     | Vertical tab    |
 | `\\`     | Backslash       |
 | `\"`     | Double quote    |
 | `\r`     | Carriage return |
 | `\f`     | Form feed       |


### Field Width and Alignment

- Use `%Ns\n` syntax to right aling a string `N` times: `printf "%10s\n" "text"`
- Add a minus sign `%-Ns\n` to left aling `N` times: `printf "%-10s\n" "text"`
- Add empty padding with `%d` with `%Nd`: `printf "%5d\n" 50`

 | Specifier   | Meaning                  | Example        |
 | ----------- | ---------                | ---------      |
 | `%10s`      | right align in 10 spaces | `"   apple"`   |
 | `%-10s`     | left align in 10 spaces  | `"apple     "` |

### Number Padding

Add a `0` before the width number:

```
printf "%05d\n" 50
00050
```

### Precision for Strings and Floats

**For strings**, `.N` limits the number of characters printed:

```
printf "%.3s\n" "banana"
ban
```

**For floats***, `.N` sets the number of digits after the decimal point
(notice that rounding is automatic):

```
printf "%.2f\n" 2.71828
2.72
```

Works for **scientific notation**, too:

```
printf "%.3e\n" 2.71828
2.718e+00
```

### Dynamic Width and Precision

Use the asterisk with this syntax: `%*s\n 10 "apple"`:

```
printf "%*s\n" 10 "apple"
     apple
```

**Note:** Width is about **field size**.
Thus, in the above example, the `10` adds five empty fields before the string `apple`,
since the string `apple` has five fields, totalling ten.

### Hex and Octal Specifics

Use the `#` flag to add 0 as the leading digit.

Octal examples:

```
printf "%o\n" 30
36
printf "%#o\n" 30
036
```

Hex lower examples:

```
printf "%x\n" 30
1e
printf "%#x\n" 30
0x1e
```

Hex upper examples:

```
printf "%X\n" 30
1E
printf "%#X\n" 30
0x1E
```

## Cases

Count in hexadecimal:

```
for i in {1..20} ; do
    printf "%X\n" "$i"
done
```
