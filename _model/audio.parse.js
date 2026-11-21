const fs = require('fs');

function parseAudioBasic(filePath) {
    const buffer = fs.readFileSync(filePath);
    
    // Verify magic number
    const magic = buffer.toString('ascii', 0, 4);
    if (magic !== '.snd') {
        throw new Error('Not a valid Sun/Next audio (.au) file structure');
    }
    
    // Parse Big-Endian header values
    const dataOffset = buffer.readUInt32BE(4);
    const dataSize = buffer.readUInt32BE(8);
    const encoding = buffer.readUInt32BE(12);
    const sampleRate = buffer.readUInt32BE(16);
    const channels = buffer.readUInt32BE(20);
    
    console.log(`--- Header Info for ${filePath} ---`);
    console.log(`Data Starts At Byte: ${dataOffset}`);
    console.log(`Data Payload Size:   ${dataSize === 0xFFFFFFFF ? 'Unknown' : dataSize + ' bytes'}`);
    console.log(`Encoding Type Code:  ${encoding} (${encoding === 1 ? '8-bit mu-law' : 'Other'})`);
    console.log(`Sample Rate:         ${sampleRate} Hz`);
    console.log(`Channels:            ${channels}`);
    
    // Extract raw audio data slice
    const rawAudioBytes = buffer.slice(dataOffset);
    console.log(`Successfully extracted ${rawAudioBytes.length} raw encoded bytes.`);
}

// Example usage:
// parseAudioBasic('sine_440hz.au');
