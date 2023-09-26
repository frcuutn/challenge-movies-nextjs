# Tech Challengue - NextJS

## Tech stack
- [NextJS](https://nextjs.org) server-side rendering
- [Styled components](https://styled-components.com) for styling
- [GraphQL](https://graphql.org) for data fetching
- [Apollo Client](https://www.apollographql.com/docs/react) for GraphQL client

## Demo
The demo website is deployed at https://challenge-movies-nextjs.vercel.app/

Some screenshots are shown below

Unauthenticated user
![Home page](https://i.imgur.com/DweLHSi.png)

Authenticated user
![Home page](https://i.imgur.com/2iP7e2z.png)

Carrousel movies 
![Home page](https://i.imgur.com/mC6mUjL.png)


## How to Use

Execute the following commands to install the dependencies.

```bash
npm i
```

Then open `.env.local` and set the environment variables to match the ones in your [The Movie Database (TMDb)](https://www.themoviedb.org/settings/api) settings page.

Next, run Next.js in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

GraphQL is available at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql).

Here a Postman collection that you can use to test the GraphQL API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2931196-1f48233c-482c-4d55-99f9-008ad1b7fb77?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D2931196-1f48233c-482c-4d55-99f9-008ad1b7fb77%26entityType%3Dcollection%26workspaceId%3De28c85e1-b7df-4988-bc3b-39ec62a0dac8#?env%5BDev%5D=W3sia2V5IjoiT0FVVEhfQ0xJRU5UX1NFQ1JFVCIsInZhbHVlIjoiZHB0YnA2ZmNhcjZpYTdsMGE2NGhvdm1nYmN0c2VhZGVuMzVkbDhxMmhsZjd0YmdhZGIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Ik9BVVRIX0NMSUVOVF9JRCIsInZhbHVlIjoiN2VvMWNyNmgwMGE1ZXRzdmxyaDFlb2I4Nm8iLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InRva2VudXJsIiwidmFsdWUiOiJodHRwczovL2Rldi1pbnRlZ3JhY2lvbmVzLmF1dGgudXMtZWFzdC0xLmFtYXpvbmNvZ25pdG8uY29tL29hdXRoMi90b2tlbiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYXV0aG9yaXphdGlvbiIsInZhbHVlIjoiZXlKcmFXUWlPaUl4YW5aR1VsTnZNRU15VWtkUk5sVjRNVk5MVWpObE9VTkZVbmxjTDNGcFVYQmhUa2hCTkd0dk0yMU1WVDBpTENKaGJHY2lPaUpTVXpJMU5pSjkuZXlKemRXSWlPaUkzWlc4eFkzSTJhREF3WVRWbGRITjJiSEpvTVdWdllqZzJieUlzSW5SdmEyVnVYM1Z6WlNJNkltRmpZMlZ6Y3lJc0luTmpiM0JsSWpvaWRISmhibk5oWTNScGIyNXpYQzl3YjNOMElIUnlZVzV6WVdOMGFXOXVjMXd2WjJWMElpd2lZWFYwYUY5MGFXMWxJam94TmpFMk5UZzNOREU0TENKcGMzTWlPaUpvZEhSd2N6cGNMMXd2WTI5bmJtbDBieTFwWkhBdWRYTXRaV0Z6ZEMweExtRnRZWHB2Ym1GM2N5NWpiMjFjTDNWekxXVmhjM1F0TVY5TVdrb3pibHBoWTB3aUxDSmxlSEFpT2pFMk1UWTFPRGMzTVRnc0ltbGhkQ0k2TVRZeE5qVTROelF4T0N3aWRtVnljMmx2YmlJNk1pd2lhblJwSWpvaU4yUTNNamd3WlRFdFlqWTJNeTAwTXpRekxUaG1Oell0WkRBNU1XVXdNVGM1TVRNeklpd2lZMnhwWlc1MFgybGtJam9pTjJWdk1XTnlObWd3TUdFMVpYUnpkbXh5YURGbGIySTRObThpZlEuRllQTUUwTUJMOWxuYUo3Qnp0cFlNbWtma2NjQndCSEpnOGZVVTVYczMyOEZhaGN5c2RsWkRkZ0lobVVzcEpVdHVud3kySWg0MHZYc1ZJVVExMTM0WVBkdlVzbFByQWppT2syU0ZSUFFKSS13dkFvdHg1UVJIeHRVQXlrX3pObHpyQ3hER3hSOHJvLVJRX19hT3JMQWFnX29RMlJHM1FWak9UbnRPTmprVkhqVnRJRFVXaGdqZExPR09Ob2FUamh2RmVPbWZXOE9wTEZ4NWVlRW9VbUJjX3BqblphbS1ZWEIxb2FsYnR6ZHBLQkl2NjlJVDc5TmUtZTdkYS12RHdLVlBOaXJBeDdZMFJJOFZ3Q3FSZjhXMjREZlpaSERiX0FUZ1R3LTFoSFI4cGpjWFNhQ28xcnY3c0Y4M3FBXzlNZU9pN0VxZ0ZXUWsxX0xYUlg1bGJqTExnIiwiZW5hYmxlZCI6dHJ1ZX1d)

## Deploy to vercel 

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/frcuutn/challenge-movies-nextjs)
