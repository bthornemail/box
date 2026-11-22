export default function coordinate(data = Buffer.allocUnsafe(65536).fill("ZIGGUART_OF_ZIGUAROTH")) {
    const space = Buffer.allocUnsafe(65536).fill(data);
    const domain = space.subarray(0, 512);
    const dimension = space.subarray(0, 128); //4330
    const ruler = space.subarray(0, 64);//1096 / 18 =60.88888... | /44=24.909090... | /8=137 | /4=274
    const orbit = space.subarray(0, 60);//970
    const cycle = space.subarray(0, 48);//640
    const proof = space.subarray(0, 40);//420
    const parity = space.subarray(0, 36);//342
    const rule = space.subarray(0, 32);//272

    const role0 = space.subarray(0, 30);//240
    const role1 = space.subarray(0, 28);//210
    const role2 = space.subarray(0, 26);//182
    const role3 = space.subarray(0, 24);//156
    const role4 = space.subarray(0, 22);//132
    const role5 = space.subarray(0, 20);//110
    const role6 = space.subarray(0, 18);//90
    // 0d72n
    const role = space.subarray(0, 16); //72
    const declaration = space.subarray(0, 14); //56
    const definition = space.subarray(0, 12); //42

    // 0d30n
    const exponent = space.subarray(0, 10); //30
    const exception = space.subarray(0, 8); //20

    const point = space.subarray(0, 6); //12
    const index = space.subarray(0, 4); //6
    const node = space.subarray(0, 2);
    return [
        domain,
        dimension,
        ruler,
        orbit,
        cycle,
        proof,
        parity,
        rule,
        role0,
        role1,
        role2,
        role3,
        role4,
        role5,
        role6,
        role,
        declaration,
        definition,
        exponent,
        exception,
        point,
        index,
        node
    ];
}
console.log(coordinate());