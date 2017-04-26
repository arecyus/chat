var expect = require("expect");
var {generateMessage} = require("./message");
var {generateLocationMessage} = require("./message");

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

describe("generateLocationMessage", () =>{
   it("Deberia generar una correcta posicion",()=>{
       var from="Matias";
       var latitude="-34.5966112";
       var longitude="-58.5467876";
       var url = "https://www.google.com/maps?q=-34.5966112,-58.5467876";
       var location = generateLocationMessage(from,latitude,longitude);
       expect(location.createdAt).toBeA("number");
       expect(location).toInclude({from,url});


   })
});