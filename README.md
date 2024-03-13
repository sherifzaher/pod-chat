# Pod Chat App

It's a monorepo codebase using pnpm + turbo + docker

![preview](https://i.imgur.com/DQlHtCB.png)

This is the React project for the open-source Pod Chat Platform.

# Installation

Before you try to run this project locally, you must have Docker. I use MySQL, but you can switch to another database like PostgreSQL very easily.

1. Clone this repository and install all dependencies.
2. Run docker and run this command `pnpm dev:start`
3. There is no landing page, the main routes are:
   - `/register` route to create an account
   - `/login` to login to the app
   - `/conversations` is where all the magic happens

# Features
- ### Auth System
  - Sign-in: there is a validation in BE and FE.
  - Sign-up: there is a validation in BE and FE.
  - validates using cookie-based sessions

- ### Conversations System
  - __One-To-One Conversations__: user can make a private conversations with his friends only, so if you want to communicate with some one. You have to send him a friend request first.
    * User can delete messages.
    * User can update messages ( in realtime messaging updates ).
    * User can send emojis and any mind of attachments.
    * Typing indicator when user is typing 
  - __Group Conversations__: user can make a group conversations and invite all of his friends into this group.
    * Anyone in the group can delete his messages or update it (realtime updates)
    * Typing indicator when user is typing.
    * Admin can add users as much as he wants from his friends only.
    * Admin can move the group ownership to another user.
    * Admin can kick anyone from the group except himself.
    * You can see online and offline users in the group.
  - 
- ### Friend System
  - You can send friend request to new users to be able to communicate with them.
  - When users send a request to you, you will get notified immediately.
  - Friends tab will show you the online and offline friends you have.
  - Requests tab shows you the incoming and outgoing requests.
  - You can cancel any outgoing request if it has not been accepted yet.
  - You can accept and decline any friend request you have.
  - Right click on any friend will open a context menu lets you open a conversation with that friend or delete him from you friends.

- ### Calls System
  - You can call any of your online friends.
  - Video calls & Audio calls are migrated in one place.
  - User can mute his mic or turn off video.
  - Anyone of the call participants can end the call.

- ### Profile Settings
  - User can change his profile photo and banner.
  - You can also a custom status like WhatsApp.

# Tech Stack
- ### Frontend
  - React.js
  - TypeScript
  - Styled-Components
  - sass
  - socket.io

- ### Backend
  - Nest.js
  - TypeORM
  - MysqlDB
  - TypeScript
  - Docker

# How to contribute ?
1.  Clone the repo using the next command.
```bash
git clone https://github.com/sherifzaher/pod-chat.git
```
2. Run the project with the installation steps as mentioned before.
3. Make your changes.
4. Make a new branch then commit and push the changes to that branch an push it.
5. Ask for a PR review.
6. Wait fot the reply :).