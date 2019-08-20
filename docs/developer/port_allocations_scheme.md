[Home](../Home.md)


# Port Allocations

| Start | End | Component | Available | --- | Language    | Port |--- |Endpoint | Port |--- |Examples | Description |
| ----- | ----| -----     | -----:    | --- | -----       | ---- |--- |-----    | ---- |--- |-----    | -----       |               
| 9810 | 9819 | OSMH      | 9         |     | C/C++       | xxx0 |    |OAI-PMH  | 983x |    |9812     | OSMH (Java implementation)    |
| 9820 | 9829 | Resolver  | 9         |     | Clojure     | xxx1 |    |DDI-C    | 984x |    |9825     | Resolver (Perl implementation) |
| 9830 | 9899 | Handler   | 69        |     | Java        | xxx2 |    |DDI-L    | 985x |    |9836     | OAI-PMH Handler (PHP implementation)  |
| 9900 | 9929 | Consumer  | 30        |     | JavaScript  | xxx3 |    |Kuha2    | 986x |    |9841     | DDI-C Handler (Clojure implementation)  |
|      |      |           |           |     | Node.js     | xxx4 |    |Nesstar	| 987x |    |9856     | DDI-L Handler (PHP implementation)  |
|      |      |           |           |     | Perl        | xxx5 |    |TBC	    | 988x |    |9867     | Kuha2 Handler (Python implementation)  |
|      |      |           |           |     | PHP         | xxx6 |    |TBC	    | 989x |    |9878     | Nesstar Handler (Ruby implementation)   |
|      |      |           |           |     | Python      | xxx7 |    |         |      |    |         |                                           |
|      |      |           |           |     | Ruby        | xxx8 |    |         |      |    |         |                                           |
|      |      |           |           |     | TBC         | xxx9 |    |         |      |    |         |                                           |