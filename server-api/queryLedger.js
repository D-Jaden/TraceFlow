'use strict';

const { getContract } = require('./services/fabricService');

async function main() {
    let gateway;
    try {
        // We will query as the 'admin' user for this test, since we know it exists.
        const { gateway: gw, contract } = await getContract('admin');
        gateway = gw;

        console.log('\n--> Evaluate Transaction: getProductAsset, querying for product1');

        // Get the state from the ledger
        const result = await contract.evaluateTransaction('getProductAsset', 'product1');
        
        console.log('*** Result: committed');
        console.log(`*** Result: ${result.toString()}`);

    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
    } finally {
        if (gateway) {
            gateway.disconnect();
        }
    }
}

main();
