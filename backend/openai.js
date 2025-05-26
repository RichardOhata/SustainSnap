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
                            text: `Respond with exactly 4 comma-separated values in this order: label,bin,co2,pts. 
                                    Do not include key names, explanations, extra lines, or any formatting — only a single line of plain text, like: "banana,O,1.2,500". 
                                    - 'label' is the object name.
                                    - 'bin' is one of: O (organic), R (recycling), or L (landfill).
                                    - 'co2' is a number estimating how much CO2 (kg) was prevented by not sending it to landfill.
                                    - 'pts' is an integer from 100 to 1000, reflecting the environmental benefit.
                                    If the item cannot be confidently identified or disposed of, respond with: "unknown,X,0,0".
                                    Only return the CSV line. No comments or descriptions.`
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

    const split = response.choices[0].message.content.split(",").map(s => s.trim().replace(/^"+|"+$/g, ''));
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
