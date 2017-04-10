# WeebShop

WeebShop  (Work In Progress) is a web app that displays the eShop.
You can check games information (images, description, videos, etc), and download them from your smartphone.

You need to place the ctr-common-1.crt and ctr-common-1.key files in the back-end/keys folder.
Follow these instructions to get those files: https://github.com/SciresM/ccrypt

You also need MongoDB to run (you can edit the configuration in the config/index.js file).

Use `npm install` to install automatically the node_modules files.

## How to use the back-end

https://localhost:3000/api/news -> News. Directories of the home of the shop.

https://localhost:3000/api/newsMessage -> News message. It's just the text that scrolls on the home of the shop.

https://localhost:3000/api/publishersList -> Get the list of publishers.

https://localhost:3000/api/directory/{directoryId} -> Directory content.

https://localhost:3000/api/game/{contentId} -> Information about a game.

https://localhost:3000/api/game/price/{contentId} -> returns the price of the game (needs the key files)

https://localhost:3000/api/download/{contentId} -> returns the URL to download the game. (needs the key files)

https://localhost:3000/api/games -> return a list of games.

You can add some parameters:
- offset : to skip a number of games
- word : for a keyword search
- sort : enter "new", "popular" or "score"
- priceMin : minimum price of the game
- priceMax : maximum price of the game
- genre : (for example, 3 = action, 8 = RPG)
- publisher : (Nintendo is "190")
- platform : (Nintendo 3DS retail/download games is "103")

So, for example, you can use that URL if you look for a Mario game that costs between 5 and 50, and you can buy on the eShop:
https://localhost:3000/api/games?word=mario&minPrice=5&maxPrice=50&platform=103

### Register a user

https://localhost:3000/api/user/register -> post with x-www-form-urlencoded data:
"username" (needed), "password" (needed) and "email" (optional).

https://localhost:3000/api/user/register/checkUsername -> get true or false, depending if the username is already used.
For example, use the url: "https://localhost:3000/api/user/register/checkUsername?name=admin" to check if admin is already used.

### Login a user

https://localhost:3000/api/user/login -> post with x-www-form-urlencoded data:
"name" (the username of the user), "password" (the password of the user).

If the name and the password are OK, you will receive a token.

### Access secret with the token

Add in the header "Authorization : JWT {token}".

https://localhost:3000/api/user/secret/ -> let you notice that your token is OK.

#### Game list

https://localhost:3000/api/user/secret/gameList -> Returns the list of games that the user have bookmarked.

https://localhost:3000/api/user/secret/gameList/add -> post the "name" and "id" (contentId) of the game you want to add to the list.

https://localhost:3000/api/user/secret/gameList/remove -> post the "id" of the game you want to remove from the list.

### Admin features

You can only do these things if you're using an admin account (the "isAdmin" bool is set to true in the database).

https://localhost:3000/api/user/secret/admin/getUserList -> get the list of users stored in the database.

https://localhost:3000/api/user/secret/admin/deleteUser -> post the "id" of the user you want to disable the account (set the bool isActivated to false). The account will be blocked during the login.
