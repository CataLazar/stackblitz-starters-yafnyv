import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import styled from 'styled-components';

const UIButton = styled.button`
  border: 2px solid black;
  padding: 5px;
  border-radius: 10px;
  font-family: 'Times New Roman', Times, serif;
  background: linear-gradient(to right, rgb(86, 166, 188), rgb(36, 62, 207));
  cursor: pointer;
  margin: 10px;
  box-shadow: 3px 3px 5px;
  
`;

const Input = styled.textarea`
  border: 2px solid rgb(86, 166, 188);
  border-radius: 5px;
`;

const AdTitle = styled.p`
  font-weight: bold;
  font-size: 30;
`;

const SizeSelector = styled.select`
  margin-left: 5px;
  border-radius: 10px;
  border: 2px solid black;
  background: linear-gradient(to right, rgb(86, 166, 188), rgb(36, 62, 207));
  box-shadow: 3px 3px 5px;
`;

const AdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Ad = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  align-items: center;
  box-shadow: 3px 3px 5px;
`;

const AdImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: 100%;
  max-height: 100%;
  margin-top: 10px;
`;

const AdButton = styled.button`
  position: relative;
  bottom: 30px;
`;

function APICaller() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [promptCTA, setPromptCTA] = useState('');
  const [generatedCTA, setGeneratedCTA] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState('500x500');
  const [generatedImage, setGeneratedImage] = useState('');

  //
  // This is the first part the user will be presented with. The user must enter a prompt to
  // generate the title of the ad. Based off of the title, the user can generate a call to action (CTA)
  // and an image to go along with it. The user can also retry any of the stages by pressing the button again.
  //

  // Also, I know the site is a bit messy. I haven't worked with any sort of web development before.
  // My history is entirely backend so making things pretty isn't my strongsuit at the moment, although it's
  // something I'm eager to learn.

  const generateText = async () => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  "You generate banner ad titles based on the user's prompt. You must only reply with the complete title, nothing else. The titles should sound modern and enticing.",
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Generated Text:', data.choices[0].message.content);

      setGeneratedText(data.choices[0].message.content);
      setPromptCTA(data.choices[0].message.content); // Set the other two prompts to the generated text
      setImagePrompt(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  //
  // Generate the call to action 
  //

  const generateCTA = async () => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  "You generate fitting text to put on an advertisement's button that would take the user to the advertiser's page. You must only reply with the text that should be put on the button. Do not exceed three words. Make it sound happy and excited.",
              },
              {
                role: 'user',
                content: promptCTA,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Generated Text:', data.choices[0].message.content);

      setGeneratedCTA(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  //
  // Generate the image
  //

  const generateImage = async () => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            prompt: imagePrompt,
            model: 'dall-e-3',
            size: "1024x1024",
            style: 'natural',
          }),
        }
      );

      const data = await response.json();
      console.log('API response:', data);
      console.log('Data Array:', data.data);
      console.log('First Object in Array:', data.data[0]);
      console.log('Image URL:', data.data[0].url);

      setGeneratedImage(data.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const resolution = imageSize;

  const [widthStr, heightStr] = resolution.split('x');   // 1920x1080 --> [1920, 1080]

  const imageWidth = parseInt(widthStr, 10);
  const imageHeight = parseInt(heightStr, 10);

  return (
    <div>
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt here..."
      />
      <br />
      <UIButton onClick={generateText}>
        Generate Text
      </UIButton>

      {generatedText && (     // Only display the text prompt first...
        <div>
          <p>Here's your AI generated title:</p>
          <AdTitle>{generatedText}</AdTitle>
          <hr />
          <UIButton onClick={generateCTA}>
            Generate CTA
          </UIButton>
          <ColorPicker text={generatedCTA} />
          {generatedCTA && (                    // ...then display the CTA prompt...
            <div>
              <br />
              <hr />
              <br />
              <label>
              Image Size:
              <SizeSelector
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
              >
                <option value="500x500">500x500</option>
                <option value="1080x1920">1080x1920</option>
                <option value="1500x500">1500x500</option>
              </SizeSelector>
              </label>
              <br />
              <UIButton onClick={generateImage}>
               Generate Image
              </UIButton>
              <br />
              <img src={generatedImage} alt="" />
              {generatedImage && (                      //...then the image prompt.
                <div>
                  <AdContainer>
                    <Ad>
                      <AdTitle>{generatedText}</AdTitle>
                      <AdImage  src={generatedImage} alt="" width={imageWidth} height={imageHeight}/>
                      <AdButton>{generatedCTA}</AdButton>
                    </Ad>
                  </AdContainer>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default APICaller;
