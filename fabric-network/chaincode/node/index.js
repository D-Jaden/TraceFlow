/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const traceabilityContract = require('./lib/traceabilityContract');

module.exports.TraceabilityContract = traceabilityContract;
module.exports.contracts = [traceabilityContract];