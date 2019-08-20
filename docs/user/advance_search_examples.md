## Examples of advanced search constructs 

All examples were run against the production instance of the [CESSDA Data Catalogue](https://datacatalogue.cessda.eu) at a point in time when total records = 13772


### Simple search

`house` [741 results]

`garden` [196 results]



### AND search

`house + garden` [47 results]



### OR search

`house | garden` [890 results]



### NEGATION search

`-house` [13031 results]

`-garden` [13576 results]



### PHRASE search

`"garden house"` [0 results]

`"house garden"` [22 results]



### PRECEDENCE within search

`((garden room) OR (garden house) OR house) AND NOT field` [1773 results]

`((garden room) OR (garden house) OR house) AND NOT shed` [1253 results]

`((garden room) OR (garden house) OR social) AND NOT shed `[12105 results]



Note that
`((garden room) OR (garden house) OR garden) AND NOT shed`
is logically equivalent to `room house +garden -shed`

but expect different relevance scores for each set of results.



### PREFIX search

`ho*` [10354 results]

`hou*` [7581 results]

`hous* `[7187 results]



### FUZZINESS search

`house` [not fuzzy, 741 results]

`house ~2` [2715 results]

`house ~10` [3793 results]



### SLOP search

`"house garden" ~2` [2213 results]

`"house garden" ~10` [3282 results]

`"garden house" ~2 `[2191 results]

`"garden house" ~10` [3280 results]
