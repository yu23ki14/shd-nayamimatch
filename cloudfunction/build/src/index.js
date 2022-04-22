"use strict";
// console.log('Try npm run lint/fix!');
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const helloWorld = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Hello, World a');
};
exports.helloWorld = helloWorld;
//# sourceMappingURL=index.js.map