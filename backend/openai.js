const OpenAI = require("openai");

const openai = new OpenAI();


async function generate_metrics(context) {
    const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
            {
                role: "user",
                content: `fact key should return a fun fact about how disposing the waste in image affected the environemnt in a good way in a single short line, no more than 10 words in a single line. for example, 'Congratulations, recycling one plastic bag saves 2 turtles!' ${context}}`,
            },
        ],
    })

    return response.choices[0].message.content;
}

async function process_image(file, type = "url") {

    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Answer only with a json object in plain text in a single line with keys: label, bin, co2. where label is what the object is, bin is one of 3 values, O, R or L, meaning organic, recycling and landfill respectively . Base your answers on BC, Canada garbage disposal guidelines. co2 should return a number that is an estimation of how much co2 was prevented to be produced if the waste did not go into a landfill. If the object in image cannot be disopsed or any other conflict, just send a X in the bin key." },
                    {
                        type: "image_url",
                        image_url: {
                            "url": type === "url" ? file : `data:image/jpeg;base64,${file}`
                        },
                    },
                ],
            },
        ],
    });

    let fact = "";
    if (JSON.parse(response.choices[0].message.content).bin !== "X") {
        fact = await generate_metrics(response.choices[0].message.content);
    }

    console.log(response.choices[0].message.content);
    console.log(metrics);

    return { ...JSON.parse(response.choices[0].message.content), fact: fact };
}

module.exports = { process_image };
