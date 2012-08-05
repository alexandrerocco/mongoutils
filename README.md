# Assorted MongoDb administration utils
This is a work in progress containing some scripts that I use to admin my mongodb instances.

## Collection Sizes
This script itereates thru all your collections in the current db and prints relevant information on the size it uses on disk, among other info.
Usage:
```bash
    mongo --quiet dbname collection-sizes.js
```
**Note:** currently it works on a database scope, so you can output the stdout to a file to generate some reports.

Info that is returned:
* Number of documents
* Indicator of capped collection
* Data size
* Total "wasted" size. Size that is allocated by mongo but currently not used on this collection

Also, you will get a total of size and wasted size for the whole database.
