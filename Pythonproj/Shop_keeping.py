class Item:
    pay_rate = 0.8 # The pay rate after 20% discount
    def __init__(self, name: str, price: int, quantity: int):
        # Run validation to the recieved arguments
        assert price >= 0, f"Price {price} is less than or equal to zero"
        assert quantity >= 0,  f"Quantity {quantity} is less than or equal to zero"

        #Assign to self object
        self.name = name
        self.price = price
        self.quantity = quantity
        
    
    
    def Calculate_total_price(self):
        return self.price * self.quantity
    
    def apply_discount(self):
        self.price = self.price * self.pay_rate

item1 = Item("Phone", 100, 1)
item1.apply_discount()


print(item1.Calculate_total_price())