## Inline code

Ad amet irure est magna id mollit Lorem in do duis enim. Excepteur velit nisi magna ea pariatur pariatur ullamco fugiat deserunt sint non sint. Duis duis est `code in text` velit velit aute culpa ex quis pariatur pariatur laborum aute pariatur duis tempor sunt ad. Irure magna voluptate dolore consectetur consectetur irure esse. Anim magna `<strong>in culpa qui officia</strong>` dolor eiusmod esse amet aute cupidatat aliqua do id voluptate cupidatat reprehenderit amet labore deserunt.

## Highlighted

Et fugiat ad nisi amet magna labore do cillum fugiat occaecat cillum Lorem proident. In sint dolor ullamco ad do adipisicing amet id excepteur Lorem aliquip sit irure veniam laborum duis cillum. Aliqua occaecat minim cillum deserunt magna sunt laboris do do irure ea nostrud consequat ut voluptate ex.

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
```

Ex amet id ex aliquip id do laborum excepteur exercitation elit sint commodo occaecat nostrud est. Nostrud pariatur esse veniam laborum non sint magna sit laboris minim in id. Aliqua pariatur pariatur excepteur adipisicing irure culpa consequat commodo et ex id ad.
