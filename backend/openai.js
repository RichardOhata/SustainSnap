const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

async function generate_metrics(context) {
    try {
        const contextStr = `label: ${context.label}, bin: ${context.bin}, co2: ${context.co2}, pts: ${context.pts}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {
                    role: "user",
                    content: `fact key should return a fun fact about how disposing the waste in image affected the environment in a good way in a single short line, no more than 10 words. For example, 'Congratulations, recycling one plastic bag saves 2 turtles!' Context: ${contextStr}`,
                },
            ],
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error generating metrics:", error);
        return "";
    }
}

async function process_image(file) {
    console.log("Processing image");

    let response;
    try {
        response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Answer only in csv format without spaces in plain text in a single line with keys (no need to use the actual key names, just maintain the order): label, bin, co2, pts where label is what the object is, bin is one of 3 values, O, R or L, meaning organic, recycling and landfill respectively. Base your answers on BC, Canada garbage disposal guidelines. co2 should return a number that is an estimation of how much co2 was prevented to be produced if the waste did not go into a landfill. pts should be a certain amount of points on a scale of 100 to 1000 gained by disposing the object correctly, scaling depending on how good the environmental impact is. If the object in image cannot be disposed or any other conflict, just send an X in the bin key and 0 for points. If there are multiple items in image, focus on one."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: file
                            },
                        },
                    ],
                },
            ],
        });

        console.log(response.choices[0].message.content);

    } catch (error) {
        console.error("Error processing image:", error);
        return null;
    }

    const split = response.choices[0].message.content.split(",");
    const parsed = {
        label: split[0],
        bin: split[1],
        co2: split[2],
        pts: split[3],
    };

    let fact = "";
    if (parsed.bin !== "X") {
        fact = await generate_metrics(parsed);
    }

    console.log("Finished processing");

    return { ...parsed, fact };
}

module.exports = { process_image };
