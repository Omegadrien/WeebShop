# WeebShop

WeebShop is a web app for your smartphone, that displays the eShop.
You can check games information (images, description, videos, etc), add games in your wish list, and download them.

You need to place the ctr-common-1.crt and ctr-common-1.key files in the back-end/keys folder.
Follow these instructions to get those files: https://github.com/SciresM/ccrypt

You also need MongoDB to run (you can edit the configuration in the config/index.js file).

Use `npm install` and `bower install` to automatically install the dependencies.

## How to use the back-end

In the "back-end" folder, run `nodemon app`.

### To get games information

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

https://localhost:3000/api/user/register -> post with json data:
"username" (needed), "password" (needed) and "email" (optional).

https://localhost:3000/api/user/register/checkUsername -> get true or false, depending if the username is already used.
For example, use "https://localhost:3000/api/user/register/checkUsername?username=admin" to check if admin is already used.

### Login a user

https://localhost:3000/api/user/login -> post with json data:
"username" (the username of the user), "password" (the password of the user).

If the name and the password are OK, you will receive a token.

### Access secret with the token

Add in the header "Authorization : JWT {token}".

https://localhost:3000/api/user/secret/ -> let you notice that your token is OK.
https://localhost:3000/api/user/secret/isAdmin -> get true if you're an admin, or false if you're a user.

#### Game list

https://localhost:3000/api/user/secret/gameList -> get the list of games that the user have bookmarked.

https://localhost:3000/api/user/secret/gameList/add -> post the "name" and "id" (contentId) of the game you want to add to the list.

https://localhost:3000/api/user/secret/gameList/remove -> post the "id" of the game you want to remove from the list.

### Admin features

You can only do these things if you're using an admin account (the "isAdmin" bool is set to true in the database).

https://localhost:3000/api/user/secret/admin/getUserList -> get the list of users stored in the database.

https://localhost:3000/api/user/secret/admin/deleteUser -> post the "id" of the user you want to disable the account (set the bool isActivated to false). The account will be blocked during the login.

## How to use the front-end

In the "front-end" folder, run `ionic serve -l`.

## Backup database

You'll find a backed-up database, in the backupDB folder, at the root of the WeebShop project.
To import that database, select "BSON - mongodump folder". The folder to select is "backupDB".
In that DB, there is 3 users accounts and an admin account. Here's the usernames and passwords:

- User 1: username="user", password="user"
- User 2: username="user2", password="user2"
- User 3: username="user3", password="user3"
- Admin: username="admin", password="admin"

You have to enter those usernames and passwords, without the "".

## FAQ and troubleshooting

- It doesn't work : Try to restart the database (MondoDB), the nodeJS app, and the ionic server. Don't forget to place the cert and the key files on the "keys" folder (more information above).
- The images / videos doesn't display: The images and videos are stored in a server called "https://kanzashi-wup.cdn.nintendo.net/" and "https://kanzashi-movie-wup.cdn.nintendo.net". You have to add an exception, to accept connections from that server.

## known issue

- When you click on the download button, sometimes you will have an error 404, because the content was not found. When the download link is generated, it always try to download the content "00000000". In fact, we have to download and parse a file named "tmd", that give us the number and the name of contents to download. To get that tmd file, just replace the content "00000000" by "tmd".

## More info about eShop

If you want to learn more about the eShop, you can take a look at these links:
- http://pastebin.com/qiyvkj0Z
- https://3dbrew.org/wiki/EShop
- https://3dbrew.org/wiki/Title_metadata
- https://github.com/Plailect/PlaiCDN
- https://notabug.org/btucker/freeShop

These contents help me to understand how the nintendo eshop works.

### Thanks

-I would like to thanks: Reisyukaku, 3dsguy, Vgturtle127, SciresM, TheCruel, Yellows8, WulfyStylez, Steveice10, Plailect, Larsenv, Einstein95, Neimod, Smea,
and all the others, for their work (reverse engineering and share their discoveries).

- Image: http://maxpixel.freegreatpicture.com/Retail-Travel-Buy-Bag-Isolated-Merchandise-Market-1623898
