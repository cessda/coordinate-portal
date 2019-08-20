[Home](../Home.md)


# Advance Full Text Search

![Example advance search using special characters][advance_search]


---

In order to be able to support advanced users, we are leveraging Elasticsearch's
Simple Query Syntax with these special characters:

- `+` signifies **AND** operation
- `|` signifies **OR** operation
- `-` **negates** a single token
- `"` wraps a number of tokens to signify a **phrase** for searching
- `*` at the end of a term signifies a **prefix** query
- `(` and `)` signify **precedence**
- `~N` after a word signifies edit **distance** (fuzziness)
- `~N` after a phrase signifies **slop** amount

## Notes

### Escaping
The above characters are reserved.  Please note in order to search for
any of these special characters, they will need to be escaped with `\`.

### Default operator
The default operate when there are no special characters in a given
search term is **OR**.  Example searching for *Social Science*
will be interpreted as *Social* OR *Science* by the query builder.

### Fields
We are currently searching against the elasticsearch `_all` field which
contains data from all fields being index.  This is has some limits on
what we can do in future with relevancy boost and highlights.
Therefore, in phase 2 this will be replaced with a finer grain control
of fields with guidance from the PaSC User Group.

### Invalid Query
The underlying query builder will at worst discards any invalid parts of
your query and send through only the valid tokens.

### Restrictions
Currently all supported flags for specifying advance search are enabled.
In future depending on feedback we can disable some of these.

The available flags are:

    ALL, NONE, AND, OR, NOT, PREFIX, PHRASE, PRECEDENCE, ESCAPE, WHITESPACE, FUZZY, NEAR, and SLOP.

### Examples
See [advanced search examples](advance_search_examples.md).

[advance_search]: ../images/advance-search.png "Advance Search"
