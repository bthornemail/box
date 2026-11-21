This example was taken from the Alef reference manual.[[1]](https://en.wikipedia.org/wiki/Alef_\(programming_language\)#cite_note-alefref-1) The piece illustrates the use of the [tuple](https://en.wikipedia.org/wiki/Tuple "Tuple") data type.

(int, byte*, byte) 
func() 
{ 
    return (10, "hello", 'c'); 
}

void 
main() 
{
    int a; 
    byte* str; 
    byte c; 
    (a, str, c) = func(); 
}