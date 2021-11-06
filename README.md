# tomterpreter
A code interpreter for TOML.

# Usage
main.toml:
```toml
language = "C++"
code = '''
#include <iostream>
using namespace std;
int main() {
    int a;
    cin >> a;
    a += 7;
    cout << a*10 << endl;
    return 0;
}
'''
input = "10"
```

Run:
```
npx tomterpreter main.toml
```
Result:
170

# Languages
- basic (Basic, BASIC)
- javascript (JavaScript, Javascript)
-  bash (Bash)
-  python (Python)
-  asciiscript (AsciiScript, Asciiscript)
-  c++ (C++, cpp)
