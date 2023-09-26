# 自動販売機はペプシが購入できるかどうかを取得できる。
# ジュース値段以上のチャージ残高がある条件下で購入操作を行うと以下の動作をする
  # 自動販売機はジュースの在庫を減らす
  # 売り上げ金額を増やす
  # Suicaのチャージ残高を減らす
  # チャージ残高が足りない場合もしくは在庫がない場合、購入操作を行った場合は例外を発生させる
# 自動販売機は現在の売上金額を取得できる

# 拡張機能
# ジュースを3種類管理できるようにする。
  # 初期在庫にモンスター(230円)5本を追加する。
  # 初期在庫にいろはす(120円)5本を追加する。
  # 自動販売機は購入可能なドリンクのリストを取得できる
# 自動販売機に在庫を補充できるようにする
# ステップ3と同様の方法でモンスターといろはすを購入できる

require_relative "suica"
require_relative "juice"


class VendingMachine
  attr_reader :stock, :sales

  # ジュースのインスタンスを作成する
  def initialize
    juice1 = Juice.new("Pepsi", 150)
    juice2 = Juice.new("Monster", 230)
    juice3 = Juice.new("Irohasu", 120)

    @stock = {
      "Pepsi" => {juice: juice1, count: 5},
      "Monster" => {juice: juice2, count: 5},
      "Irohasu" => {juice: juice3, count: 5}
    }
    @sales = 0
  end
  
  # ジュースインスタンスを返す
  def get_juice(name)
    @stock[name] ? @stock[name][:juice] : nil
  end
  
  # ジュースを購入できるか判定する
  def purchasable?(name, suica)
    item = @stock[name]
    return false unless item
    # suicaの残高がジュースの金額以上にあるかつ在庫が0以上
    suica.get_current_balance >= item[:juice].price && item[:count] > 0
  end

  # 購入処理（残高が足らない場合もしくは在庫がない場合はエラー）
  def buy(name, suica)
    if purchasable?(name, suica)
      # suicaの支払い処理をする
      suica.pay(get_juice(name).price)
      # 自動販売機の在庫を減らす
      decrease_stock(name)
      # 売り上げを増やす
      increase_sales(get_juice(name).price)
    else
      raise "残高が足らないか在庫がありません"
    end
  end

  # 在庫を取得する
  def get_stock(name)
    @stock[name] ? @stock[name][:count] : 0
  end


  # 購入可能なドリンクリストを取得する
  def can_buy_drinks(suica)
    @stock.keys.select {|name| purchasable?(name, suica)}
  end

  # 売上金を取得する
  def get_current_sales
    @sales
  end

  # 在庫を補充する
  def add_stock(name, count)
    if @stock[name]
      @stock[name][:count] += count
    else
      raise "そのジュースは補充できません"
    end
  end

  private

  # 在庫を減らす
  def decrease_stock(name)
    if @stock[name] && @stock[name][:count] > 0
      @stock[name][:count] -= 1
    end
  end

  # 売上金を増やす
  def increase_sales(amount)
    @sales += amount
  end

end



suica = Suica.new
vending_machine = VendingMachine.new

# 自動販売機の在庫補充
vending_machine.add_stock("Monster", 10)
# Monsterの在庫の取得
puts vending_machine.get_stock("Monster")
# Suicaの現在チャージ残高
puts suica.get_current_balance
# Monsterを購入する
vending_machine.buy("Monster", suica)
# Suicaの現在チャージ残高
puts suica.get_current_balance
# 購入できるジュースリスト
puts vending_machine.can_buy_drinks(suica)
# 自動販売機の売り上げ金額
puts vending_machine.get_current_sales