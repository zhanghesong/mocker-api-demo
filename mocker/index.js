onst fs = require('fs')
const path = require('path')

const read = (dir, filter = () => true) =>
    fs.readdirSync(dir)
        .reduce(
            (files, file) =>
                fs.statSync(path.join(dir, file)).isDirectory()
                    ? files.concat(read(path.join(dir, file)))
                    : files.concat(path.join(dir, file)),
            [],
        )
        .filter(filter)


const mocks = {};
read(
    __dirname,
    file => path.extname(file) === '.js' && path.basename(file) !== 'index.js',
).reduce(
    (mock, file) => {
        const apiData = require(file);
        Object.keys(apiData).map((keyName) => {
            mocks[keyName] = apiData[keyName];
        });
        mock.push(file)
        return mock
    },
    [],
)

module.exports = mocks;
