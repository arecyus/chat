var expect = require("expect");
var {generateMessage} = require("./message");

describe("generateMessage",()=>{
    it("Deberia generar un mensaje correcto",()=>{
        var from="Matias";
        var text ="Algun mensaje";
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({
            from,
            text
        });

    });
});