# ・預かり金（デポジット）として500円がデフォルトでチャージされているものとする
# ・Suicaには100円以上の任意の金額をチャージできる
# ・100円未満をチャージしようとした場合は例外を発生させる
# ・Suicaは現在のチャージ残高を取得できる

# Suicaクラスを作成する
class Suica
  attr_reader :balance

  # Suicaの残高は500円デフォルト
  def initialize
    @balance = 500
  end

  # Suicaに任意の額をチャージする（100円未満はエラー）
  def balance_charge(amount)
    if amount < 100
      raise "100円未満の金額はチャージ出来ません"
    end
    @balance += amount
  end

  # Suicaの残高を取得する
  # attr_readerを使用しているので必要ない
  # def get_current_balance
  #   @balance
  # end

  # Suicaのチャージ残高から支払いをする(Suicaの残高が足りない場合はエラー)
  def pay(amount)
    if amount > @balance
      raise "残高が足りません"
    end

    @balance -= amount
  end

end



