class VendingMachine
  # 自動販売機は在庫を取得できる
  # 自動販売機は購入可能なドリンクのリストを取得できる
  attr_reader :drinks
  # 売り上げ金額管理
  # 自動販売機は現在の売上金額を取得できる
  attr_reader :sales_amount

  def initialize
    # 初期状態で、ペプシ150円を5本格納している
    @drinks = (1..5).to_a.map{ Drink.new(name: "ペプシ", price: 150) }

    # 初期在庫にモンスター230円を5本を追加する
    monster_drinks = (1..5).to_a.map { Drink.new(name: "モンスター", price: 230) }
    # 初期在庫にいろはす120円を5本を追加する
    irohasu_drink = (1..5).to_a.map { Drink.new(name: "いろはす", price: 120) }
    @drinks.concat(monster_drinks)
    @drinks.concat(irohasu_drinks)
    # 売上金額管理
    @sales_amount = 0
  end

  # 自動販売機はペプシが購入できるかどうかを取得する
  # boolean(真偽値）を返す場合はメソッド名の後に?をつける
  def buy?(dink_name)
    !!find_drink(drink_name)
  end

  def buy!(drink_name:, suica:)
    # チャージ残高が足りない場合もしくは在庫がない場合、購入操作を行なった場合は例外を発生させる
    drink = find_drink(drink_name)
    if !drink
      raise "在庫がありません"
    end

    # Suicaのチャージ額を減らす
    suica.pay!(drink.price)

    # 自動販売機はジュースの在庫を減らす
    @drinks = @drinks - [drink]

    # 売上金額を増やす
    @sales_amount += drink.price
  end

  # 自動販売機に在庫を補充できるようにする
  def charge(drink)
    @drinks.push(drink)
  end

  private

  def find_drink(drink_name)
    @drinks.find{ |d| d.name == drink_name }
  end
end
