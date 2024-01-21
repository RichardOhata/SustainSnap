
const OpenAI = require("openai");

const openai = new OpenAI();

async function test_ai() {

    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Answer only with either O, R, L. O if the object in the image is organic, R if it is recyclable, L if it goes in the landfill bin" },
                    {
                        type: "image_url",
                        image_url: {
                            "url": "data:image/jpeg;base64,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"
                        },
                    },
                ],
            },
        ],
    });
    console.log(response.choices[0]);
    return response.choices[0];
}
