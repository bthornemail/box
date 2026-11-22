import { readFile } from 'node:fs';

readFile('bases.yml', (err, data) => {
    if (err) throw err;
    console.log(new TextDecoder().decode(data));
    let re = new RegExp(/\d+[A-Za-z0-9]/);
    const read = re.test(data);
    const digest = re.exec(data);
    console.log({ read, digest });
});
