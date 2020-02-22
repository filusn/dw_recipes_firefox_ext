# Firefox extension for DataWorkshop Kraków project

For now I am learning a little JS and how to write Firefox extensions. The repository would be updated step by step.

Instruction for me:
1. User clicks "Add" button in the popup:
* Content script listens for message and receives "add" command
* Content scripts picks current url and send it in message to background script
* Background script listens for a message and receives url
* Background script adds url to list
* Popup access url list variable in b-s and shows it to user (probably recipe name or something rather than url)
2. User clicks "Remove" -> same steps but with removing
3. User clicks "Reset" -> same steps but remove whole list
4. User clicks "Create" -> To think about:
* Save to PDF
* Send mail
* Print
