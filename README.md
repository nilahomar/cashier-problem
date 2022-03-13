# The Cashier Problem 

A program that helps a cashier give adequate change to customers. The program will return the amount of notes and coins for the customer's change.

Example: If the price is €3.75 and the paid amount is €50, then the client should receive €46.25 back in change.
## The expected output :

* 2 twenty euro notes
* 1 five euro note
* 1 euro coin
* 1 twenty cent coin

## Logic

- Generates a random Price
- Take users input and validate
- Recursion until customer cash matches the Price or is greater
- Finds the returning denominations from the array using the closest and lesser method
