import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write me a detailed table of contents for a blog post with the title below.

Title:
`

async function generateAction (prompt, style, feel){
  console.log(`API: ${basePromptPrefix}${prompt}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${prompt}`,
    temperature: 0.8,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  const style = "Paul Graham";
  const feel = "a story"

  const secondPrompt = 
  `
  Take the table of contents and title of the blog post below and generate a blog post written in ${style} style. Make it feel like ${feel}. Don't just list the points. Go deep into each one, Explain why.

  Title: ${prompt}

  Table of Contents: ${basePromptOutput.text}

  Blog Post:
  `
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.05,
    max_tokens: 1250,
  });

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({output: secondPromptOutput});
};

export default generateAction;