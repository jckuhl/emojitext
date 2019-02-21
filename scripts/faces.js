const faces = (() => {
    const faces='😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😔😟😕🙁😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡👽🤖🎃';
    const faceArray = [];
    for(let index = 0; index < faces.length; index += 2) {
        let face = faces[index] + faces[index+1]
        faceArray.push({ face, index: index / 2 })
    }
    return faceArray
})();

export default faces;