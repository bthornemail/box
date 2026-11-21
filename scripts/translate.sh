#The following example creates a list of all words in file1 one per line in file2, where a word is taken to be a maximal string of letters.
tr -cs "[:alpha:]" "[\n*]" <file1 >file2
# The next example translates all lowercase characters in file1 to uppercase and writes the results to standard output.
tr "[:lower:]" "[:upper:]" <file1
# This example uses an equivalence class to identify accented variants of the base character 'e' in file1, which are stripped of diacritical marks and written to file2.
tr "[=e=]" "[e*]" <file1 >file2
