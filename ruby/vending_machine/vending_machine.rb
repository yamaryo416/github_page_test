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
  # def initialize
  #   juice1 = Juice.new("Pepsi", 150)
  #   juice2 = Juice.new("Monster", 230)
  #   juice3 = Juice.new("Irohasu", 120)

  #   @stock = {
  #     "Pepsi" => {juice: juice1, count: 5},
  #     "Monster" => {juice: juice2, count: 5},
  #     "Irohasu" => {juice: juice3, count: 5}
  #   }
  #   @sales = 0
  # end

  def initialize
    @stocks = [
      { juice: Juice.new("Pepsi", 150), count: 5 },
      { juice: Juice.new("Monster", 230), count: 5 },
      { juice: Juice.new("Irohasu", 120), count: 5 }
    ]
    @sales = 0
  end

  # ジュースインスタンスを返す
  def get_juice(name)
    juice = @stocks.find {|item| item[:juice].name == name}
    juice ? juice[:juice] : nil
  end
  
  # ジュースを購入できるか判定する
  def purchasable?(name, suica)
    item = @stocks.find {|item| item[:juice].name == name}
    return false unless item
    # suicaの残高がジュースの金額以上にあるかつ在庫が0以上
    suica.balance >= item[:juice].price && item[:count] > 0
  end

  # 購入処理（残高が足らない場合もしくは在庫がない場合はエラー）
  def buy(name, suica)
    if purchasable?(name, suica)
      item = @stocks.find{|item| item[:juice].name == name}
      # suicaの支払い処理をする
      suica.pay(item[:juice].price)
      # 自動販売機の在庫を減らす
      item[:count] -= 1
      # 売り上げを増やす
      increase_sales(item[:juice].price)
    else
      raise "残高が足らないか在庫がありません"
    end
  end

  # 在庫を取得する
  def get_stock(name)
    item = @stocks.find {|item| item[:juice].name == name}
    item ? item[:count] : 0
  end


  # 購入可能なドリンクリストを取得する
  def can_buy_drinks(suica)
    @stocks.select {|item| purchasable?(item[:juice].name, suica)}.map{|item| item[:juice].name}
  end

  # 売上金を取得する
  def get_current_sales
    @sales
  end

  # 在庫を補充する
  def add_stock(name, count)
    item = @stocks.find{|item| item[:juice].name == name}
    if item
      item[:count] += count
    else
      raise "そのジュースは補充できません"
    end
  end

  private

  # 売上金を増やす
  def increase_sales(amount)
    @sales += amount
  end

end



