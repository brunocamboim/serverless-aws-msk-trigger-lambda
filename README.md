# Introduction 
This is a simple project to build a lambda trigger. It will be subscribe in a topic inside kafka and when a message is sent, it will be triggered with the information about the message.
I'm using the following services:
  - MSK
  - Lambda

# Getting Started
First of all, clone the repository.

1.	Installation process
  - Open the terminal and enter your repository
  - Run the command: npm install
  - Within VS Code, run the debugger to test local

# Build and Test
  - To build your application and deploy to AWS, you need to set some envs. See the docs: <a href="https://www.serverless.com/framework/docs/"> https://www.serverless.com/framework/docs/ </a>
  - After that, run npm run deploy

# See more
<a href="https://aws.amazon.com/pt/blogs/compute/using-amazon-msk-as-an-event-source-for-aws-lambda/">https://aws.amazon.com/pt/blogs/compute/using-amazon-msk-as-an-event-source-for-aws-lambda/</a>