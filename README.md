<p align="center">
	<img src="./assets/uno_icon.png" height="150" width="150" alt="icon example" />
</p>	

<h3 align="center">
  An UNO Game made in Javascript 🎴
</h3>

<p align="center">
	<a href="https://lerna.js.org/">
		<img alt="lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="maintained with lerna"/>
	</a>
	<a href="https://github.com/microsoft/TypeScript">
		<img alt="typescript" src="https://camo.githubusercontent.com/41c68e9f29c6caccc084e5a147e0abd5f392d9bc/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565">
	</a>
	<a href="https://github.com/guilhermebkel/uno-game">
		<img alt="mit license" src="https://img.shields.io/github/license/guilhermebkel/uno-game?color=0051ff" />
	</a>
</p>
<p align="center">
	<a href="https://github.com/guilhermebkel/uno-game">
		<img alt="unoenty build" src="https://github.com/guilhermebkel/uno-game/workflows/Unoenty%20CI/badge.svg" />
	</a>
	<a href="https://github.com/guilhermebkel/uno-game">
		<img alt="unapy build" src="https://github.com/guilhermebkel/uno-game/workflows/Unapy%20CI/badge.svg" />
	</a>
</p>

<p align="center">
	<a href="https://uno.guilherr.me">Click here to play this game</a>
</p>

## 📌 Overview

A simple UNO Game made in Javascript, supposed to be blazing easier and faster than Gartic to start playing. 

## 🔧 Technologies

- Typescript
- React.js
- Socket.io
- Lerna
- Express
- Material UI
- Husky
- Lint Staged
- Git Commit Message Linter
- ESLint
- React DnD
- MsgPackParser

## 👣 Project Scope

- [X] Implementing a basic Table Page which I can use to move and buy cards.
- [X] Implementing a server integration with Table Page to make it to work.
- [ ] Refactoring the Table Page to give it a better looking.
- [X] Creating a Dashboard Page which I can use to see open rooms, create new ones and get into the ones I want to.
- [X] Implementing a server integration with Dashboard Page to make it to work.
- [X] Refactoring the Dashboard Page to give it a better looking.
- [X] Creating a Room Page which I can use to get into a room and see its details.
- [X] Implementing a server integration with Room Page to make it to work.
- [X] Refactoring the Room Page to give it a better looking.
- [X] Implementing a monorepository manager.
- [X] Updating README with contributors info.
- [ ] Changing the card assets (in order to avoid copyright issues).
- [ ] Implementing sounds.
- [X] Adding a simple account service (with no database).
- [ ] Adding an account service.
- [X] Making husky to work.
- [X] Adding skeleton loading for pages.
- [X] Making CI with Github Actions.
- [X] Adding Card effects.
- [X] Making it able to stack **Buy:2 Cards** till someone does not has any of them and so, the last player buys all the stack together.
- [X] Making the front-end able to support 6 players in total.
- [X] Being able to change the game color with help of **Buy:4 Card**.
- [X] Adding an auto play system when user is afk during the game.
- [X] Adding a chat to Table.
- [X] Adding a countdown for every player round.
- [X] Making player able to put more than one card on stack.
- [ ] Notify when a player gets in or out of a room

## 🚀 Getting started

1. Clone this repository
2. Run the following commands
```sh
npm install # Install all shared dependencies
npm run install:unapy # Install dependencies for api
npm run install:unoenty # Install dependencies for client
npm run bootstrap # Link all packages dependencies together
```
2. Copy the **.env.example** inside **packages/unoenty** and **packages/unapy** turning it into a **.env** file.

3. Run the command bellow inside **packages/unoenty** and **packages/unapy** to start api and client.
```sh
npm run dev
```

Right here everything should be working fine. So, **api** will be available at **http://localhost:5000** and **client** will be available at **http://localhost:4000**.

## 👏 Contributing

1. Clone this repository to your machine.
2. Create a new branch locally following the **Git Karma** pattern. Ex: feat/my-awesome-feature.
3. Then, after coding your contribution, make a merge request for your branch.

## 💫 Contributors

Thanks to all the people who contributed on this project!

<table>
  <tr>
    <td align="center">
			<a
				href="https://github.com/ArcaneDiver" 
				title="ArcaneDiver"
			>
				<img src="https://avatars.githubusercontent.com/ArcaneDiver" width="100px;" alt=""/>
				<br />
				<sub>
					<b>Michele Della Mea</b>
				</sub>
			</a>
		</td>
  </tr>
</table>
