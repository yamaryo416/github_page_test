require_relative "suica"
require_relative "juice"
require_relative "vending_machine.rb"

suica = Suica.new

# 100円のチャージ
puts suica.balance_charge(100)

# 100円以下のチャージ
# puts suica.balance_charge(80)

vending_machine = VendingMachine.new

# 自動販売機の在庫補充
vending_machine.add_stock("Monster", 10)
# Monsterの在庫の取得
puts vending_machine.get_stock("Monster")
# Suicaの現在チャージ残高
puts suica.balance
# Monsterを購入する
vending_machine.buy("Monster", suica)
# Suicaの現在チャージ残高
puts suica.balance
# 購入できるジュースリスト
puts vending_machine.can_buy_drinks(suica)
# 自動販売機の売り上げ金額
puts vending_machine.get_current_sales