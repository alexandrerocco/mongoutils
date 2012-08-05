/**
* @function: getBytesWithUnit()
* @purpose: Converts bytes to the most simplified unit.
* @param: (number) bytes, the amount of bytes
* @returns: (string)
*/
var getBytesWithUnit = function( bytes ){
    if( isNaN( bytes ) ){ return; }
    var units = [ ' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB' ];
    var amountOf2s = Math.floor( Math.log( +bytes )/Math.log(2) );
    if( amountOf2s < 1 ){
        amountOf2s = 0;
    }
    var i = Math.floor( amountOf2s / 10 );
    bytes = +bytes / Math.pow( 2, 10*i );

    // Rounds to 3 decimals places.
    if( bytes.toString().length > bytes.toFixed(3).toString().length ){
       bytes = bytes.toFixed(3);
    }
    return bytes + units[i];
};

function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

var i, size, docs, notused;
var collections = db.getCollectionNames();
var totalDocs = 0;
var totalSize = 0;
var totalNotUsed = 0;

for(i in collections) {
    var coll = db[collections[i]];
    if (typeof(coll.totalSize) !== "function") {
        continue;
    }

    // Avoiding system collections
    if (coll.getName().indexOf('system.') == -1) {
        docs = coll.count();
        size = coll.totalSize();
        notused = coll.storageSize() - coll.dataSize();

        print('Collection: ' + coll);
        print('Docs: ' + formatNumber(docs));
        print('Size: ' + getBytesWithUnit(size));
        print('Not used: ' + getBytesWithUnit(notused));
        print('');

        totalDocs += docs;
        totalSize += size;
        totalNotUsed += notused;
    }
}
// Summary
print('----------------------------');
print('Total docs: ' + formatNumber(totalDocs));
print('Total unused space: ' + getBytesWithUnit(totalNotUsed));
print('Total size: ' + getBytesWithUnit(totalSize));
percent = Math.round(totalNotUsed * 100 / totalSize);
print(percent + '% not used space.');
print('----------------------------');
