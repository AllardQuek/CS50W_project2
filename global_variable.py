global prev     # use global keyword if you want to change a global variable, not just have access to it
prev = None     # need to initialise prev to some value

def check_value():
    print("NOW:", prev)

def change_value():
    global prev # reference the global variable before making changes
    prev = 'pie'

print("BEFORE CHANGES:", prev)
change_value()
check_value()