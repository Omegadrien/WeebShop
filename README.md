# WeebShop

WeebShop  (Work In Progress) is a web app that displays the eShop.
You can check games information (images, description, videos, etc), and download them from your smartphone.

You need to place the ctr-common-1.crt and ctr-common-1.key files in the back-end/keys folder.
Follow these instructions to get those files: https://github.com/SciresM/ccrypt

## How to use the back-end

http://localhost:3000/api/news -> News. Directories of the home of the shop.

http://localhost:3000/api/newsMessage -> News message. It's just the text that scrolls on the home of the shop.

http://localhost:3000/api/directory/{directoryId} -> Directory content.

http://localhost:3000/api/game/{contentId} -> Information about a game.

http://localhost:3000/api/game/price/{contentId} -> returns the price of the game (needs the key files)

http://localhost:3000/api/download/{contentId} -> returns the URL to download the game. (needs the key files)

http://localhost:3000/api/games -> return a list of games.

You can add some parameters:
- offset : to skip a number of games
- word : for a keyword search
- sort : enter "new", "popular" or "score"
- priceMin : minimum price of the game
- priceMax : maximum price of the game
- genre : (for example, 3 = action, 8 = RPG)
- publisher : (Nintendo is "190")
- platform : (Nintendo 3DS cart and download games is "103")

So, for example, you can use that URL if you look for a Mario game that costs between 5 and 50€, and you can buy physically:
http://localhost:3000/api/games?word=mario&minPrice=5&maxPrice=50&platform=103