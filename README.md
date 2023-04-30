# PromptHacks 2023

`GPT4`

An AI powered chatbot that is intended to help you with your Software Interview Preparation and doubts related to coding problems. Codie runs on the GPT-3 model created by OpenAI, and is programmed specifically for this use case.  

# Why use NextLevelCodie?
- Codie comes as a chrome extension, meaning there's no need to navigate between tabs, making it super convinient and accessible
- Codie can read and understand the question you are solving. You don't have to copy and paste anything
- Codie comes with well engineered pre-defined prompts that you can use with a click of a button
- Codie supports most of the commonly used platforms for Interview prep coding challenges.

# Features
Here are some cool things Codie can do:  
- See and understand the problem you are trying, and help you with any doubts you have on that.  
- Explain the question better with examples.  
- Give you a hint on how to get started
- Help you think of a more optimized solution
- List all solution approaches for the question
- Ask a potential interview questions based on the problem
- Conduct a mock interview

That's not all, Codie is a smart AI chatbot, meaning you can chat with it and ask it anything regarding the problem or your interview prep. It can do a lot of stuff ranging from clearing your small doubts, to writing the most optimized programs for the given problem. 

# How to Install the extension

0. Download the build/ folder from [here](https://drive.google.com/drive/folders/1Rgn7SwjAYUYvbV8vGjwRazjggD3C0TEE?usp=share_link) and skip to step 4   

OR    

1. Clone/Download this repo  

2. At the root folder, create a .env file with the following content
```
REACT_APP_GPT_API = <OpenAI_API_KEY>
```
Since keys can't be uploaded on public repos, you will have to create your own API key from [OpenAI](https://platform.openai.com/account/api-keys).

3. Run the following commands
```
npm install
npm run build
```

4. Go to chrome://extensions  
 
5. Enable "Developer mode"

6. In the Developer options, click on "Load unpacked"  

7. Select the build/ folder from the repo

# Supported Platforms
Currently, Codie supports questions from the following platforms
- Leetcode
- AlgoExpert
- Hackerrank
- Geeksforgeeks
- Interviewbit

Additionally, Codie doesn't not work during live tests or contests, and we don't condone or encourage cheating.
 

